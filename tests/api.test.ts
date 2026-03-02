import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { API, TMDBError, parseOptions } from "../src/utils/api";

describe("utils/api", () => {
	let originalFetch: typeof globalThis.fetch | undefined;

	beforeEach(() => {
		originalFetch = globalThis.fetch;
	});

	afterEach(() => {
		if (originalFetch) {
			globalThis.fetch = originalFetch;
		}
	});

	it("parseOptions skips null/undefined and expands arrays", () => {
		const qs = parseOptions({
			a: 1,
			b: undefined,
			c: null,
			with_genres: ["12", "16"],
		});

		expect(qs).toBe("a=1&with_genres=12&with_genres=16");
	});

	it("does not add a trailing '?' when there are no query params", async () => {
		const calls: string[] = [];

		globalThis.fetch = (async (url: string) => {
			calls.push(url);
			return new Response(JSON.stringify({ ok: true }), { status: 200 });
		}) as unknown as typeof fetch;

		const api = new API({ apiKey: undefined, accessToken: undefined });
		await api.get<{ ok: boolean }>("/movie/550");

		expect(calls.length).toBe(1);
		expect(calls[0].endsWith("/movie/550")).toBe(true);
		expect(calls[0].includes("?")).toBe(false);
	});

	it("adds api_key when apiKey is provided", async () => {
		const calls: string[] = [];

		globalThis.fetch = (async (url: string) => {
			calls.push(url);
			return new Response(JSON.stringify({ ok: true }), { status: 200 });
		}) as unknown as typeof fetch;

		const api = new API({ apiKey: "abc" });

		await api.get<{ ok: boolean }, { language?: string }>(
			"/movie/550",
			{
				query: { language: "en" },
			},
		);

		expect(calls[0]).toContain("/movie/550?");
		expect(calls[0]).toContain("language=en");
		expect(calls[0]).toContain("api_key=abc");
	});

	it("expands array query values into repeated keys", async () => {
		const calls: string[] = [];

		globalThis.fetch = (async (url: string) => {
			calls.push(url);
			return new Response(JSON.stringify({ ok: true }), { status: 200 });
		}) as unknown as typeof fetch;

		const api = new API({ apiKey: "abc" });

		await api.get<{ ok: boolean }, { include_image_language?: string[] }>(
			"/movie/550/images",
			{
				query: { include_image_language: ["en", "fr"] },
			},
		);

		expect(calls.length).toBe(1);
		expect(calls[0]).toContain("include_image_language=en");
		expect(calls[0]).toContain("include_image_language=fr");
	});

	it("adds Authorization header when accessToken is provided", async () => {
		let authHeader: string | undefined;

		globalThis.fetch = (async (_url: string, init?: RequestInit) => {
			const headers = new Headers(init?.headers);
			authHeader = headers.get("authorization") ?? undefined;

			return new Response(JSON.stringify({ ok: true }), { status: 200 });
		}) as unknown as typeof fetch;

		const api = new API("token-123");
		await api.get("/movie/550");

		expect(authHeader).toBe("Bearer token-123");
	});

	it("throws TMDBError on non-OK response (JSON payload)", async () => {
		globalThis.fetch = (async (url: string) => {
			expect(url).toContain("/movie/550");

			return new Response(
				JSON.stringify({
					success: false,
					status_code: 7,
					status_message: "Invalid API key",
				}),
				{ status: 401, statusText: "Unauthorized" },
			);
		}) as unknown as typeof fetch;

		const api = new API({ apiKey: "bad" });

		await expect(api.get("/movie/550")).rejects.toBeInstanceOf(TMDBError);

		try {
			await api.get("/movie/550");
			throw new Error("Expected to throw");
		} catch (e) {
			const err = e as TMDBError;
			expect(err.status).toBe(401);
			expect(err.url).toContain("/movie/550");
			expect(err.message).toBe("Invalid API key");
		}
	});

	it("throws TMDBError on non-OK response (non-JSON payload)", async () => {
		globalThis.fetch = (async () => {
			return new Response("Not JSON", {
				status: 500,
				statusText: "Internal Server Error",
			});
		}) as unknown as typeof fetch;

		const api = new API({ apiKey: "abc" });

		try {
			await api.get("/movie/550");
			throw new Error("Expected to throw");
		} catch (e) {
			expect(e).toBeInstanceOf(TMDBError);
			const err = e as TMDBError;
			expect(err.status).toBe(500);
			expect(err.url).toContain("/movie/550");
		}
	});

	it("retries on 429 and then succeeds", async () => {
		let attempt = 0;

		globalThis.fetch = (async () => {
			attempt++;

			if (attempt === 1) {
				return new Response(
					JSON.stringify({
						success: false,
						status_code: 25,
						status_message: "Rate limit exceeded",
					}),
					{
						status: 429,
						headers: { "retry-after": "0" },
					},
				);
			}

			return new Response(JSON.stringify({ ok: true }), { status: 200 });
		}) as unknown as typeof fetch;

		const api = new API({ apiKey: "abc" });

		const data = await api.get<{ ok: boolean }>("/movie/550", {
			retries: 1,
			retryDelayMs: 1,
		});

		expect(data.ok).toBe(true);
		expect(attempt).toBe(2);
	});
});

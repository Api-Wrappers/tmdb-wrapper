import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { ApiError, RateLimitError } from "@api-wrappers/api-core";
import { TMDBApiClient } from "../src/client";

const json = (body: unknown, init?: ResponseInit) =>
	new Response(JSON.stringify(body), {
		...init,
		headers: {
			"content-type": "application/json",
			...init?.headers,
		},
	});

describe("TMDBApiClient", () => {
	let originalFetch: typeof globalThis.fetch;

	beforeEach(() => {
		originalFetch = globalThis.fetch;
	});

	afterEach(() => {
		globalThis.fetch = originalFetch;
	});

	it("adds api_key when apiKey is provided", async () => {
		const calls: string[] = [];

		globalThis.fetch = (async (url: string) => {
			calls.push(url);
			return json({ ok: true }, { status: 200 });
		}) as unknown as typeof fetch;

		const api = new TMDBApiClient({ apiKey: "abc" });

		await api.get<{ ok: boolean }>("/movie/550", {
			query: { language: "en" },
		});

		const url = new URL(calls[0]);
		expect(url.pathname).toBe("/3/movie/550");
		expect(url.searchParams.get("language")).toBe("en");
		expect(url.searchParams.get("api_key")).toBe("abc");
	});

	it("expands array query values into repeated keys", async () => {
		const calls: string[] = [];

		globalThis.fetch = (async (url: string) => {
			calls.push(url);
			return json({ ok: true }, { status: 200 });
		}) as unknown as typeof fetch;

		const api = new TMDBApiClient({ apiKey: "abc" });

		await api.get<{ ok: boolean }>("/movie/550/images", {
			query: { include_image_language: ["en", "fr"] },
		});

		const url = new URL(calls[0]);
		expect(url.searchParams.getAll("include_image_language")).toEqual([
			"en",
			"fr",
		]);
	});

	it("adds Authorization header when accessToken is provided", async () => {
		let authHeader: string | null = null;

		globalThis.fetch = (async (_url: string, init?: RequestInit) => {
			const headers = new Headers(init?.headers);
			authHeader = headers.get("authorization");

			return json({ ok: true }, { status: 200 });
		}) as unknown as typeof fetch;

		const api = new TMDBApiClient("token-123");
		await api.get("/movie/550");

		expect(authHeader).toBe("Bearer token-123");
	});

	it("throws ApiError on non-OK response", async () => {
		globalThis.fetch = (async () => {
			return json(
				{
					success: false,
					status_code: 7,
					status_message: "Invalid API key",
				},
				{ status: 401, statusText: "Unauthorized" },
			);
		}) as unknown as typeof fetch;

		const api = new TMDBApiClient({ apiKey: "bad" });

		await expect(api.get("/movie/550")).rejects.toBeInstanceOf(ApiError);

		try {
			await api.get("/movie/550");
			throw new Error("Expected to throw");
		} catch (e) {
			const err = e as ApiError;
			expect(err.status).toBe(401);
			expect(err.responseBody).toEqual({
				success: false,
				status_code: 7,
				status_message: "Invalid API key",
			});
		}
	});

	it("throws RateLimitError after the final 429 attempt", async () => {
		globalThis.fetch = (async () => {
			return json(
				{
					success: false,
					status_code: 25,
					status_message: "Rate limit exceeded",
				},
				{
					status: 429,
					headers: { "retry-after": "0" },
				},
			);
		}) as unknown as typeof fetch;

		const api = new TMDBApiClient({
			apiKey: "abc",
			client: { retry: { maxAttempts: 1 } },
		});

		await expect(api.get("/movie/550")).rejects.toBeInstanceOf(
			RateLimitError,
		);
	});

	it("retries on 429 and then succeeds", async () => {
		let attempt = 0;

		globalThis.fetch = (async () => {
			attempt++;

			if (attempt === 1) {
				return json(
					{
						success: false,
						status_code: 25,
						status_message: "Rate limit exceeded",
					},
					{
						status: 429,
						headers: { "retry-after": "0" },
					},
				);
			}

			return json({ ok: true }, { status: 200 });
		}) as unknown as typeof fetch;

		const api = new TMDBApiClient({ apiKey: "abc" });

		const data = await api.get<{ ok: boolean }>("/movie/550");

		expect(data.ok).toBe(true);
		expect(attempt).toBe(2);
	});

	it("throws before fetching when no TMDB authentication is provided", async () => {
		let called = false;
		globalThis.fetch = (async () => {
			called = true;
			return json({ ok: true }, { status: 200 });
		}) as unknown as typeof fetch;

		const api = new TMDBApiClient({});

		await expect(api.get("/movie/550")).rejects.toBeInstanceOf(ApiError);
		expect(called).toBe(false);
	});
});

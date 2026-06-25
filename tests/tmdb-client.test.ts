import { beforeEach, describe, expect, it } from "bun:test";
import { TMDB } from "../src/index";
import { TMDB_ACCESS_TOKEN, TMDB_API_KEY } from "./mocks/constants";

describe("TMDB Client Instantiation (src)", () => {
	describe("Client Creation", () => {
		it("creates TMDB client with access token string", () => {
			const tmdb = new TMDB(TMDB_ACCESS_TOKEN);

			expect(tmdb).toBeInstanceOf(TMDB);
			expect(tmdb.movies).toBeDefined();
			expect(tmdb.tvShows).toBeDefined();
			expect(tmdb.search).toBeDefined();
			expect(tmdb.configuration).toBeDefined();
			expect(tmdb.account).toBeDefined();
		});

		it("creates TMDB client with access token in config object", () => {
			const tmdb = new TMDB({ accessToken: TMDB_ACCESS_TOKEN });

			expect(tmdb).toBeInstanceOf(TMDB);
			expect(tmdb.movies).toBeDefined();
			expect(tmdb.tvShows).toBeDefined();
			expect(tmdb.search).toBeDefined();
			expect(tmdb.configuration).toBeDefined();
			expect(tmdb.account).toBeDefined();
		});

		it("creates TMDB client with API key in config object", () => {
			const tmdb = new TMDB({ apiKey: TMDB_API_KEY });

			expect(tmdb).toBeInstanceOf(TMDB);
			expect(tmdb.movies).toBeDefined();
			expect(tmdb.tvShows).toBeDefined();
			expect(tmdb.search).toBeDefined();
			expect(tmdb.configuration).toBeDefined();
			expect(tmdb.account).toBeDefined();
		});

		it("creates TMDB client with both API key and access token", () => {
			const tmdb = new TMDB({
				apiKey: TMDB_API_KEY,
				accessToken: TMDB_ACCESS_TOKEN,
			});

			expect(tmdb).toBeInstanceOf(TMDB);
			expect(tmdb.movies).toBeDefined();
			expect(tmdb.tvShows).toBeDefined();
			expect(tmdb.search).toBeDefined();
			expect(tmdb.configuration).toBeDefined();
			expect(tmdb.account).toBeDefined();
		});
	});

	describe("Client Properties", () => {
		let tmdb: TMDB;

		beforeEach(() => {
			tmdb = new TMDB({ apiKey: TMDB_API_KEY });
		});

		it("has all endpoint properties defined", () => {
			const expectedEndpoints: Array<keyof TMDB> = [
				"account",
				"authentication",
				"certification",
				"changes",
				"collections",
				"companies",
				"configuration",
				"credits",
				"discover",
				"find",
				"genre",
				"guestSessions",
				"keywords",
				"lists",
				"movies",
				"networks",
				"people",
				"review",
				"search",
				"trending",
				"tvEpisodeGroups",
				"tvEpisodes",
				"tvSeasons",
				"tvShows",
				"watchProviders",
			];

			for (const endpoint of expectedEndpoints) {
				expect(tmdb).toHaveProperty(endpoint);
				expect(tmdb[endpoint]).toBeDefined();
			}
		});

		it("endpoints are objects (not null/undefined)", () => {
			expect(typeof tmdb.movies).toBe("object");
			expect(typeof tmdb.tvShows).toBe("object");
			expect(typeof tmdb.search).toBe("object");
			expect(typeof tmdb.configuration).toBe("object");
			expect(typeof tmdb.account).toBe("object");
			expect(typeof tmdb.genre).toBe("object");
			expect(typeof tmdb.trending).toBe("object");
		});

		it("shares one transport client across endpoint groups", () => {
			const moviesApi = (tmdb.movies as unknown as { api: unknown }).api;

			expect((tmdb.tvShows as unknown as { api: unknown }).api).toBe(moviesApi);
			expect((tmdb.search as unknown as { api: unknown }).api).toBe(moviesApi);
			expect((tmdb.genre as unknown as { api: unknown }).api).toBe(moviesApi);
			expect((tmdb.account as unknown as { api: unknown }).api).toBe(moviesApi);
		});
	});

	describe("Request Config", () => {
		it("passes request config through while preserving endpoint query options", async () => {
			const calls: Array<{ url: string; init?: RequestInit }> = [];
			const tmdb = new TMDB({
				apiKey: TMDB_API_KEY,
				client: {
					fetch: (async (url: string, init?: RequestInit) => {
						calls.push({ url, init });

						return new Response(JSON.stringify({ results: [] }), {
							status: 200,
							headers: { "content-type": "application/json" },
						});
					}) as typeof fetch,
					retry: { maxAttempts: 1 },
				},
			});

			await tmdb.tvShows.popular(
				{ language: "en-US", page: 2 },
				{ headers: { "x-request-id": "request-config-test" } },
			);

			expect(calls).toHaveLength(1);

			const url = new URL(calls[0].url);
			const headers = new Headers(calls[0].init?.headers);

			expect(url.pathname).toBe("/3/tv/popular");
			expect(url.searchParams.get("language")).toBe("en-US");
			expect(url.searchParams.get("page")).toBe("2");
			expect(url.searchParams.get("api_key")).toBe(TMDB_API_KEY);
			expect(headers.get("x-request-id")).toBe("request-config-test");
		});
	});

	describe("Edge Cases", () => {
		it("handles empty string token", () => {
			expect(() => new TMDB("")).not.toThrow();
		});

		it("handles empty config object", () => {
			expect(() => new TMDB({})).not.toThrow();
		});

		it("handles undefined values in config", () => {
			expect(
				() =>
					new TMDB({
						apiKey: undefined,
						accessToken: undefined,
					}),
			).not.toThrow();
		});
	});
});

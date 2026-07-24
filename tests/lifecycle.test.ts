import { describe, expect, it } from "bun:test";
import {
	TMDB,
	TMDBApiClient,
	createClientBundle,
	createHttpClient,
} from "../src";

describe("TMDB lifecycle", () => {
	it("exposes the shared HTTP client used by every endpoint", () => {
		const tmdb = new TMDB({ apiKey: "api-key" });

		expect(tmdb.http).toBeInstanceOf(TMDBApiClient);
		expect((tmdb.movies as unknown as { api: unknown }).api).toBe(tmdb.http);
		expect((tmdb.tvShows as unknown as { api: unknown }).api).toBe(tmdb.http);
		expect((tmdb.search as unknown as { api: unknown }).api).toBe(tmdb.http);
	});

	it("reuses an injected TMDB HTTP client", () => {
		const http = new TMDBApiClient({ apiKey: "api-key" });
		const tmdb = new TMDB(http);
		const bundle = createClientBundle(http);

		expect(createHttpClient(http)).toBe(http);
		expect(tmdb.http).toBe(http);
		expect(bundle.http).toBe(http);
		expect((bundle.movies as unknown as { api: unknown }).api).toBe(http);
	});

	it("delegates disposal to the shared HTTP client", async () => {
		const http = new TMDBApiClient({ apiKey: "api-key" });
		let disposed = false;

		Object.defineProperty(http, "dispose", {
			value: async () => {
				disposed = true;
			},
		});

		const tmdb = new TMDB(http);
		await tmdb.dispose();

		expect(disposed).toBe(true);
	});
});

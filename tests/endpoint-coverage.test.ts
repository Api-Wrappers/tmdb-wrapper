import { describe, expect, it } from "bun:test";
import { TMDB } from "../src";

const json = (body: unknown, init?: ResponseInit) =>
	new Response(JSON.stringify(body), {
		...init,
		headers: {
			"content-type": "application/json",
			...init?.headers,
		},
	});

interface CapturedRequest {
	url: string;
	init?: RequestInit;
}

interface ExpectedRequest {
	method: string;
	path: string;
	query?: Record<string, string>;
	body?: unknown;
}

const parseBody = (body: BodyInit | null | undefined): unknown => {
	if (body === undefined || body === null) return undefined;
	if (typeof body !== "string") return body;

	return JSON.parse(body);
};

describe("TMDB v3 endpoint coverage", () => {
	it("maps newly covered TMDB v3 operations to the official paths", async () => {
		const calls: CapturedRequest[] = [];
		const tmdb = new TMDB({
			apiKey: "api-key",
			client: {
				fetch: (async (url: string, init?: RequestInit) => {
					calls.push({ url, init });
					return json({ ok: true }, { status: 200 });
				}) as typeof fetch,
				retry: { maxAttempts: 1 },
			},
		});

		const cases: Array<{
			name: string;
			call: () => Promise<unknown>;
			expected: ExpectedRequest;
		}> = [
			{
				name: "authentication validate key",
				call: () => tmdb.authentication.validateKey(),
				expected: { method: "GET", path: "/3/authentication" },
			},
			{
				name: "authentication create guest session",
				call: () => tmdb.authentication.createGuestSession(),
				expected: {
					method: "GET",
					path: "/3/authentication/guest_session/new",
				},
			},
			{
				name: "authentication create request token",
				call: () => tmdb.authentication.createRequestToken(),
				expected: { method: "GET", path: "/3/authentication/token/new" },
			},
			{
				name: "authentication create session",
				call: () => tmdb.authentication.createSession("request-token"),
				expected: {
					method: "POST",
					path: "/3/authentication/session/new",
					body: { request_token: "request-token" },
				},
			},
			{
				name: "authentication create session from v4 token",
				call: () => tmdb.authentication.createSessionFromV4Token("v4-token"),
				expected: {
					method: "POST",
					path: "/3/authentication/session/convert/4",
					body: { access_token: "v4-token" },
				},
			},
			{
				name: "authentication create session with login",
				call: () =>
					tmdb.authentication.createSessionWithLogin({
						username: "user",
						password: "pass",
						request_token: "request-token",
					}),
				expected: {
					method: "POST",
					path: "/3/authentication/token/validate_with_login",
					body: {
						username: "user",
						password: "pass",
						request_token: "request-token",
					},
				},
			},
			{
				name: "authentication delete session",
				call: () => tmdb.authentication.deleteSession("session-id"),
				expected: {
					method: "DELETE",
					path: "/3/authentication/session",
					body: { session_id: "session-id" },
				},
			},
			{
				name: "account add favorite",
				call: () =>
					tmdb.account.addFavorite(
						1,
						{ media_type: "movie", media_id: 550, favorite: true },
						{ session_id: "session-id" },
					),
				expected: {
					method: "POST",
					path: "/3/account/1/favorite",
					query: { session_id: "session-id" },
					body: { media_type: "movie", media_id: 550, favorite: true },
				},
			},
			{
				name: "account add to watchlist",
				call: () =>
					tmdb.account.addToWatchlist(
						1,
						{ media_type: "tv", media_id: 1396, watchlist: true },
						{ session_id: "session-id" },
					),
				expected: {
					method: "POST",
					path: "/3/account/1/watchlist",
					query: { session_id: "session-id" },
					body: { media_type: "tv", media_id: 1396, watchlist: true },
				},
			},
			{
				name: "account favorite movies",
				call: () =>
					tmdb.account.favoriteMovies(1, {
						language: "en-US",
						page: 2,
						session_id: "session-id",
						sort_by: "created_at.desc",
					}),
				expected: {
					method: "GET",
					path: "/3/account/1/favorite/movies",
					query: {
						language: "en-US",
						page: "2",
						session_id: "session-id",
						sort_by: "created_at.desc",
					},
				},
			},
			{
				name: "account favorite tv",
				call: () => tmdb.account.favoriteTv(1),
				expected: { method: "GET", path: "/3/account/1/favorite/tv" },
			},
			{
				name: "account lists",
				call: () => tmdb.account.lists(1, { page: 3 }),
				expected: {
					method: "GET",
					path: "/3/account/1/lists",
					query: { page: "3" },
				},
			},
			{
				name: "account rated movies",
				call: () => tmdb.account.ratedMovies(1),
				expected: { method: "GET", path: "/3/account/1/rated/movies" },
			},
			{
				name: "account rated tv",
				call: () => tmdb.account.ratedTv(1),
				expected: { method: "GET", path: "/3/account/1/rated/tv" },
			},
			{
				name: "account rated tv episodes",
				call: () => tmdb.account.ratedTvEpisodes(1),
				expected: {
					method: "GET",
					path: "/3/account/1/rated/tv/episodes",
				},
			},
			{
				name: "account watchlist movies",
				call: () => tmdb.account.watchlistMovies(1),
				expected: { method: "GET", path: "/3/account/1/watchlist/movies" },
			},
			{
				name: "account watchlist tv",
				call: () => tmdb.account.watchlistTv(1),
				expected: { method: "GET", path: "/3/account/1/watchlist/tv" },
			},
			{
				name: "configuration countries",
				call: () => tmdb.configuration.countries({ language: "fr-FR" }),
				expected: {
					method: "GET",
					path: "/3/configuration/countries",
					query: { language: "fr-FR" },
				},
			},
			{
				name: "configuration jobs",
				call: () => tmdb.configuration.jobs(),
				expected: { method: "GET", path: "/3/configuration/jobs" },
			},
			{
				name: "configuration languages",
				call: () => tmdb.configuration.languages(),
				expected: { method: "GET", path: "/3/configuration/languages" },
			},
			{
				name: "configuration primary translations",
				call: () => tmdb.configuration.primaryTranslations(),
				expected: {
					method: "GET",
					path: "/3/configuration/primary_translations",
				},
			},
			{
				name: "configuration timezones",
				call: () => tmdb.configuration.timezones(),
				expected: { method: "GET", path: "/3/configuration/timezones" },
			},
			{
				name: "guest session rated movies",
				call: () =>
					tmdb.guestSessions.ratedMovies("guest-id", {
						sort_by: "created_at.asc",
					}),
				expected: {
					method: "GET",
					path: "/3/guest_session/guest-id/rated/movies",
					query: { sort_by: "created_at.asc" },
				},
			},
			{
				name: "guest session rated tv",
				call: () => tmdb.guestSessions.ratedTv("guest-id"),
				expected: {
					method: "GET",
					path: "/3/guest_session/guest-id/rated/tv",
				},
			},
			{
				name: "guest session rated tv episodes",
				call: () => tmdb.guestSessions.ratedTvEpisodes("guest-id"),
				expected: {
					method: "GET",
					path: "/3/guest_session/guest-id/rated/tv/episodes",
				},
			},
			{
				name: "list details",
				call: () => tmdb.lists.details(10, { language: "en-US", page: 1 }),
				expected: {
					method: "GET",
					path: "/3/list/10",
					query: { language: "en-US", page: "1" },
				},
			},
			{
				name: "list item status",
				call: () => tmdb.lists.itemStatus(10, { movie_id: 550 }),
				expected: {
					method: "GET",
					path: "/3/list/10/item_status",
					query: { movie_id: "550" },
				},
			},
			{
				name: "list create",
				call: () =>
					tmdb.lists.create(
						{ name: "List", description: "Desc", language: "en" },
						"session-id",
					),
				expected: {
					method: "POST",
					path: "/3/list",
					query: { session_id: "session-id" },
					body: { name: "List", description: "Desc", language: "en" },
				},
			},
			{
				name: "list add movie",
				call: () => tmdb.lists.addMovie(10, 550, "session-id"),
				expected: {
					method: "POST",
					path: "/3/list/10/add_item",
					query: { session_id: "session-id" },
					body: { media_id: 550 },
				},
			},
			{
				name: "list remove movie",
				call: () => tmdb.lists.removeMovie(10, 550, "session-id"),
				expected: {
					method: "POST",
					path: "/3/list/10/remove_item",
					query: { session_id: "session-id" },
					body: { media_id: 550 },
				},
			},
			{
				name: "list clear",
				call: () =>
					tmdb.lists.clear(10, { session_id: "session-id", confirm: true }),
				expected: {
					method: "POST",
					path: "/3/list/10/clear",
					query: { session_id: "session-id", confirm: "true" },
				},
			},
			{
				name: "list delete",
				call: () => tmdb.lists.delete(10, "session-id"),
				expected: {
					method: "DELETE",
					path: "/3/list/10",
					query: { session_id: "session-id" },
				},
			},
			{
				name: "movie account states",
				call: () => tmdb.movies.accountStates(550, { session_id: "session-id" }),
				expected: {
					method: "GET",
					path: "/3/movie/550/account_states",
					query: { session_id: "session-id" },
				},
			},
			{
				name: "movie add rating",
				call: () =>
					tmdb.movies.addRating(550, 8.5, { guest_session_id: "guest-id" }),
				expected: {
					method: "POST",
					path: "/3/movie/550/rating",
					query: { guest_session_id: "guest-id" },
					body: { value: 8.5 },
				},
			},
			{
				name: "movie delete rating",
				call: () => tmdb.movies.deleteRating(550, { session_id: "session-id" }),
				expected: {
					method: "DELETE",
					path: "/3/movie/550/rating",
					query: { session_id: "session-id" },
				},
			},
			{
				name: "tv account states",
				call: () => tmdb.tvShows.accountStates(1396, { session_id: "session-id" }),
				expected: {
					method: "GET",
					path: "/3/tv/1396/account_states",
					query: { session_id: "session-id" },
				},
			},
			{
				name: "tv lists",
				call: () => tmdb.tvShows.lists(1396, { page: 2 }),
				expected: {
					method: "GET",
					path: "/3/tv/1396/lists",
					query: { page: "2" },
				},
			},
			{
				name: "tv add rating",
				call: () => tmdb.tvShows.addRating(1396, { value: 9 }),
				expected: {
					method: "POST",
					path: "/3/tv/1396/rating",
					body: { value: 9 },
				},
			},
			{
				name: "tv delete rating",
				call: () => tmdb.tvShows.deleteRating(1396),
				expected: { method: "DELETE", path: "/3/tv/1396/rating" },
			},
			{
				name: "tv season account states",
				call: () =>
					tmdb.tvSeasons.accountStates(
						{ tvShowID: 1396, seasonNumber: 1 },
						{ session_id: "session-id" },
					),
				expected: {
					method: "GET",
					path: "/3/tv/1396/season/1/account_states",
					query: { session_id: "session-id" },
				},
			},
			{
				name: "tv season watch providers",
				call: () =>
					tmdb.tvSeasons.watchProviders(
						{ tvShowID: 1396, seasonNumber: 1 },
						{ language: "en-US" },
					),
				expected: {
					method: "GET",
					path: "/3/tv/1396/season/1/watch/providers",
					query: { language: "en-US" },
				},
			},
			{
				name: "tv episode account states",
				call: () =>
					tmdb.tvEpisodes.accountStates(
						{ tvShowID: 1396, seasonNumber: 1, episodeNumber: 1 },
						{ session_id: "session-id" },
					),
				expected: {
					method: "GET",
					path: "/3/tv/1396/season/1/episode/1/account_states",
					query: { session_id: "session-id" },
				},
			},
			{
				name: "tv episode add rating",
				call: () =>
					tmdb.tvEpisodes.addRating(
						{ tvShowID: 1396, seasonNumber: 1, episodeNumber: 1 },
						8,
					),
				expected: {
					method: "POST",
					path: "/3/tv/1396/season/1/episode/1/rating",
					body: { value: 8 },
				},
			},
			{
				name: "tv episode delete rating",
				call: () =>
					tmdb.tvEpisodes.deleteRating({
						tvShowID: 1396,
						seasonNumber: 1,
						episodeNumber: 1,
					}),
				expected: {
					method: "DELETE",
					path: "/3/tv/1396/season/1/episode/1/rating",
				},
			},
			{
				name: "tv episode group details",
				call: () => tmdb.tvEpisodeGroups.details("group-id"),
				expected: {
					method: "GET",
					path: "/3/tv/episode_group/group-id",
				},
			},
		];

		for (const item of cases) {
			calls.length = 0;

			await item.call();

			expect(calls, item.name).toHaveLength(1);
			const request = calls[0];
			const url = new URL(request.url);

			expect(url.pathname, item.name).toBe(item.expected.path);
			expect(request.init?.method ?? "GET", item.name).toBe(
				item.expected.method,
			);
			expect(url.searchParams.get("api_key"), item.name).toBe("api-key");

			for (const [key, value] of Object.entries(item.expected.query ?? {})) {
				expect(url.searchParams.get(key), item.name).toBe(value);
			}

			expect(parseBody(request.init?.body), item.name).toEqual(
				item.expected.body,
			);
		}
	});
});

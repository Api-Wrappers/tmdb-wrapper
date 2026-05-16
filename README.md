<h1 align="center">@api-wrappers/tmdb-wrapper</h1>

<p align="center">
  A typed TMDB API v3 client for Node, Bun, and modern TypeScript projects.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@api-wrappers/tmdb-wrapper"><img alt="npm version" src="https://img.shields.io/npm/v/@api-wrappers/tmdb-wrapper"></a>
  <a href="https://github.com/Api-Wrappers/tmdb-wrapper/blob/main/LICENSE"><img alt="license" src="https://img.shields.io/npm/l/@api-wrappers/tmdb-wrapper"></a>
  <a href="https://github.com/Api-Wrappers/tmdb-wrapper/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/Api-Wrappers/tmdb-wrapper/actions/workflows/ci.yml/badge.svg"></a>
  <a href="https://github.com/Api-Wrappers/tmdb-wrapper/stargazers"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/api-wrappers/tmdb-wrapper"></a>
</p>

## What Is This?

`@api-wrappers/tmdb-wrapper` is a TypeScript wrapper for The Movie Database (TMDB) API v3. It gives you one `TMDB` client with typed endpoint groups for movies, TV, search, discover, trending, people, account data, watch providers, images, configuration, and other implemented TMDB areas.

Use it when you want TMDB data without hand-writing fetch URLs, query strings, auth headers, response types, retry behavior, and image URL helpers in every app.

## Why Use It Instead Of Raw Fetch?

- **Typed TMDB client:** endpoint methods return typed data and accept typed option objects.
- **Endpoint groups:** call `tmdb.movies.details(...)`, `tmdb.search.movies(...)`, `tmdb.trending.trending(...)`, and similar grouped APIs instead of assembling paths by hand.
- **Image helpers:** build poster, backdrop, and TMDB image URLs with `getFullImagePath`, `formImage`, `TMDB_IMAGE_BASE_URL`, and `ImageSizes`.
- **Retries and timeouts:** requests run through `@api-wrappers/api-core`, including default retry behavior plus global or per-request timeout overrides.
- **Clean pagination shape:** paginated endpoints keep TMDB's `{ page, results, total_pages, total_results }` response pattern and accept typed `page` options where TMDB supports them.
- **Bun and Node support:** the package ships ESM/CJS builds, TypeScript declarations, and a Node `>=16` engine target, with Bun used for local development and tests.

## Who Is It For?

This wrapper is for TypeScript developers building movie watchlists, TV trackers, recommendation tools, media dashboards, bots, admin tools, or server-side integrations that need predictable TMDB access with less repeated request code.

## Install

```bash
npm install @api-wrappers/tmdb-wrapper
pnpm add @api-wrappers/tmdb-wrapper
yarn add @api-wrappers/tmdb-wrapper
bun add @api-wrappers/tmdb-wrapper
```

## Quick Start

Create a TMDB account, open [TMDB API Settings](https://www.themoviedb.org/settings/api), and copy your API read access token.

```typescript
import { TMDB } from "@api-wrappers/tmdb-wrapper";

const tmdb = new TMDB(process.env.TMDB_ACCESS_TOKEN!);

const popular = await tmdb.movies.popular({ page: 1, language: "en-US" });

for (const movie of popular.results.slice(0, 5)) {
	console.log(`${movie.title} (${movie.release_date?.slice(0, 4)})`);
}
```

The constructor also accepts an API key or a full client config:

```typescript
const withToken = new TMDB("YOUR_READ_ACCESS_TOKEN");
const withApiKey = new TMDB({ apiKey: "YOUR_API_KEY" });
const configured = new TMDB({
	accessToken: process.env.TMDB_ACCESS_TOKEN,
	client: {
		timeoutMs: 10_000,
		retry: { maxAttempts: 3, delayMs: 300 },
	},
});
```

## Quick Comparison

| Option | What you write | Tradeoff |
| --- | --- | --- |
| Raw `fetch` | URLs, auth headers, query serialization, response types, retry/timeout handling, and image URL construction | Maximum control, but repeated boilerplate and more places for TMDB-specific mistakes |
| Generated clients | Code generated from an API description | Broad automation, but often less ergonomic for app code and harder to tune by hand |
| `@api-wrappers/tmdb-wrapper` | Typed endpoint calls grouped around TMDB concepts | Smaller hand-maintained surface focused on practical TypeScript usage, with transport behavior handled by `api-core` |

## Practical Examples

### Search Movies

```typescript
const search = await tmdb.search.movies({
	query: "Inception",
	include_adult: false,
	language: "en-US",
	page: 1,
});

const firstMatch = search.results[0];
console.log(firstMatch?.title);
```

### Get Movie Details

Many detail methods support TMDB's `append_to_response` feature. Pass the appended keys as the second argument.

```typescript
const movie = await tmdb.movies.details(550, [
	"credits",
	"videos",
	"watch/providers",
]);

console.log(movie.title);
console.log(movie.credits.cast.slice(0, 5));
console.log(movie.videos.results.find((video) => video.type === "Trailer"));
```

### Get Trending

```typescript
const trendingMovies = await tmdb.trending.trending("movie", "week", {
	language: "en-US",
	page: 1,
});

for (const movie of trendingMovies.results.slice(0, 10)) {
	console.log(movie.title);
}
```

### Build Poster And Backdrop URLs

```typescript
import {
	ImageSizes,
	TMDB_IMAGE_BASE_URL,
	getFullImagePath,
} from "@api-wrappers/tmdb-wrapper";

const movie = await tmdb.movies.details(550);

const posterUrl = movie.poster_path
	? getFullImagePath(TMDB_IMAGE_BASE_URL, ImageSizes.W500, movie.poster_path)
	: undefined;

const backdropUrl = movie.backdrop_path
	? getFullImagePath(
			TMDB_IMAGE_BASE_URL,
			ImageSizes.ORIGINAL,
			movie.backdrop_path,
		)
	: undefined;
```

For image objects returned by image endpoints, use `formImage`:

```typescript
import { ImageSizes, formImage } from "@api-wrappers/tmdb-wrapper";

const images = await tmdb.movies.images(550);
const firstPoster = images.posters[0];
const imageUrl = firstPoster
	? formImage(firstPoster, ImageSizes.W500)
	: undefined;
```

### Get Watch Providers

```typescript
const providers = await tmdb.movies.watchProviders(550);
const usProviders = providers.results.US;

console.log(usProviders?.link);
console.log(usProviders?.flatrate?.map((provider) => provider.provider_name));
```

### Handle API Errors

```typescript
import { ApiError, RateLimitError } from "@api-wrappers/api-core";

try {
	await tmdb.movies.details(999999999);
} catch (error) {
	if (error instanceof RateLimitError) {
		console.error("TMDB rate limit hit. Try again later.");
	} else if (error instanceof ApiError) {
		console.error(`TMDB request failed (${error.status}): ${error.message}`);
		console.error(error.responseBody);
	}
}
```

### Cancel Or Time Out One Request

Most endpoint methods accept a `RequestConfig` as the last argument.

```typescript
const controller = new AbortController();

const results = await tmdb.search.movies(
	{ query: "Alien" },
	{ signal: controller.signal, timeoutMs: 5_000 },
);
```

## Real-World Use Cases

- **Movie watchlist apps:** search titles, fetch details, show posters, and manage account watchlists.
- **TV tracking apps:** pull show, season, episode, credits, images, and airing data.
- **Recommendation apps:** combine search, discover filters, trending data, and related titles.
- **Media dashboards:** display popular, top-rated, upcoming, trending, provider, and configuration data.

## Endpoint Map

| Client property | Use it for |
| --- | --- |
| `tmdb.movies` | Movie details, credits, images, videos, reviews, ratings, lists, popular, top rated, upcoming |
| `tmdb.tvShows` | TV show details, seasons, episodes, aggregate credits, ratings, popular, airing today |
| `tmdb.tvSeasons` / `tmdb.tvEpisodes` | Season and episode details, credits, images, videos, account states |
| `tmdb.people` | Person details, credits, images, tagged images, popular people |
| `tmdb.search` | Movie, TV, person, company, collection, keyword, and multi-search |
| `tmdb.discover` | Filtered movie and TV discovery by genre, year, rating, provider, region, and more |
| `tmdb.trending` | Trending movies, TV shows, people, or all media by day or week |
| `tmdb.watchProviders` | Watch provider lists and available regions |
| `tmdb.account` | Account details, favorites, watchlists, rated media |
| `tmdb.authentication` | Key validation, guest sessions, request tokens, v3 sessions |
| `tmdb.lists` | Classic TMDB list details and list management |
| `tmdb.collections` | Movie collection details, images, translations |
| `tmdb.companies` / `tmdb.networks` | Company and network details, images, alternative names |
| `tmdb.genre` / `tmdb.keywords` | Genre lists and keyword details |
| `tmdb.configuration` | TMDB countries, jobs, languages, timezones, image config |
| `tmdb.certification` / `tmdb.changes` | Certification data and recently changed media IDs |
| `tmdb.find` / `tmdb.credits` / `tmdb.review` | External-ID lookup, credit lookup, review lookup |
| `tmdb.guestSessions` / `tmdb.tvEpisodeGroups` | Guest-session ratings and TV episode group details |

## Documentation

- [Docs home](./docs/index.md)
- [Changelog](./CHANGELOG.md)
- [Copy-paste examples](./docs/examples.md)
- [Authentication](./docs/authentication.md)
- [Request config](./docs/request-config.md)
- [Error handling](./docs/error-handling.md)
- [Image utilities](./docs/image-utilities.md)
- [Contribution ideas](./docs/contributing-ideas.md)
- [Examples guide](./examples/README.md)
- Endpoint reference starts at [Movies](./docs/endpoints/movies.md), [Search](./docs/endpoints/search.md), [Discover](./docs/endpoints/discover.md), and [TV Shows](./docs/endpoints/tv-shows.md).

## Run Examples Locally

The examples import from `src` so they always exercise the current checkout.

```bash
export TMDB_ACCESS_TOKEN="YOUR_READ_ACCESS_TOKEN"

bun examples/basic-usage.ts
bun examples/image-helpers.ts
bun examples/search-and-discover.ts
```

## Development

```bash
bun install
bun run check
bun run typecheck
bun run test
bun run build
bun run verify
```

See [CONTRIBUTING.md](./CONTRIBUTING.md), [ROADMAP.md](./ROADMAP.md), and [beginner-friendly contribution ideas](./docs/contributing-ideas.md) if you want to help improve the wrapper.

## Release Process

Maintainers add a changeset for user-facing changes with `bun run changeset`. When changesets land on `main`, the release workflow validates the package and opens a version PR. Merging that PR publishes to npm with provenance using `NPM_TOKEN` and creates GitHub release notes.

## License

MIT. See [LICENSE](./LICENSE).

<h1 align="center">@api-wrappers/tmdb-wrapper</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@api-wrappers/tmdb-wrapper"><img alt="npm version" src="https://img.shields.io/npm/v/@api-wrappers/tmdb-wrapper"></a>
  <a href="https://github.com/Api-Wrappers/tmdb-wrapper/blob/main/LICENSE"><img alt="license" src="https://img.shields.io/npm/l/@api-wrappers/tmdb-wrapper"></a>
  <a href="https://github.com/Api-Wrappers/tmdb-wrapper/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/Api-Wrappers/tmdb-wrapper/actions/workflows/ci.yml/badge.svg"></a>
</p>

<p align="center">
  A typed TMDB API v3 client for Node, Bun, and modern TypeScript projects.
</p>

`@api-wrappers/tmdb-wrapper` gives you one `TMDB` client with endpoint groups for movies, TV, people, search, discover, account sessions, images, watch providers, and the rest of the TMDB v3 API surface. Requests are typed, authenticated consistently, and backed by `@api-wrappers/api-core` for retries, timeouts, and structured errors.

If this package saves you time, [star the repo](https://github.com/Api-Wrappers/tmdb-wrapper) to help other TMDB developers find it.

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

## Common Recipes

### Search for a movie

```typescript
const results = await tmdb.search.movies({
	query: "Inception",
	include_adult: false,
	language: "en-US",
});

const first = results.results[0];
```

### Fetch details with related data

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

### Discover titles by filters

```typescript
const actionMovies = await tmdb.discover.movie({
	with_genres: "28",
	"vote_count.gte": 500,
	sort_by: "popularity.desc",
	watch_region: "US",
});
```

### Build image URLs

```typescript
import {
	ImageSizes,
	TMDB_IMAGE_BASE_URL,
	formImage,
	getFullImagePath,
} from "@api-wrappers/tmdb-wrapper";

const manualUrl = getFullImagePath(
	TMDB_IMAGE_BASE_URL,
	ImageSizes.W500,
	"/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
);

const images = await tmdb.movies.images(550);
const posterUrl = images.posters[0]
	? formImage(images.posters[0], ImageSizes.W500)
	: undefined;
```

### Handle API errors

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

### Cancel or time out one request

Most endpoint methods accept a `RequestConfig` as the last argument.

```typescript
const controller = new AbortController();

const results = await tmdb.search.movies(
	{ query: "Alien" },
	{ signal: controller.signal, timeoutMs: 5_000 },
);
```

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
- [Authentication](./docs/authentication.md)
- [Request config](./docs/request-config.md)
- [Error handling](./docs/error-handling.md)
- [Image utilities](./docs/image-utilities.md)
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
bun test
bun run build
bun run check
```

## License

MIT. See [LICENSE](./LICENSE).

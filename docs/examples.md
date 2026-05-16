# Copy-Paste Examples

These examples use the published package import. Replace `TMDB_ACCESS_TOKEN` with your TMDB API read access token.

```typescript
import { TMDB } from "@api-wrappers/tmdb-wrapper";

const tmdb = new TMDB(process.env.TMDB_ACCESS_TOKEN!);
```

## Search Movies

```typescript
const search = await tmdb.search.movies({
	query: "The Matrix",
	include_adult: false,
	language: "en-US",
	page: 1,
});

for (const movie of search.results) {
	console.log(`${movie.title} - ${movie.release_date}`);
}
```

## Get Movie Details

```typescript
const movie = await tmdb.movies.details(603, ["credits", "videos"], "en-US");

console.log(movie.title);
console.log(movie.runtime);
console.log(movie.credits.cast.slice(0, 5).map((person) => person.name));
```

## Get Trending Movies

```typescript
const trending = await tmdb.trending.trending("movie", "day", {
	language: "en-US",
	page: 1,
});

const titles = trending.results.map((movie) => movie.title);
console.log(titles);
```

## Build Poster And Backdrop URLs

```typescript
import {
	ImageSizes,
	TMDB_IMAGE_BASE_URL,
	getFullImagePath,
} from "@api-wrappers/tmdb-wrapper";

const movie = await tmdb.movies.details(603);

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

console.log({ posterUrl, backdropUrl });
```

## Convert Image Endpoint Results

```typescript
import { ImageSizes, formImage } from "@api-wrappers/tmdb-wrapper";

const images = await tmdb.movies.images(603);
const posters = images.posters
	.slice(0, 5)
	.map((poster) => formImage(poster, ImageSizes.W500))
	.filter((url): url is string => Boolean(url));

console.log(posters);
```

## Get Watch Providers

```typescript
const providers = await tmdb.movies.watchProviders(603);
const us = providers.results.US;

console.log(us?.link);
console.log(us?.flatrate?.map((provider) => provider.provider_name));
console.log(us?.rent?.map((provider) => provider.provider_name));
console.log(us?.buy?.map((provider) => provider.provider_name));
```

## Search TV Shows

```typescript
const shows = await tmdb.search.tv({
	query: "Breaking Bad",
	include_adult: false,
	language: "en-US",
	page: 1,
});

console.log(shows.results[0]?.name);
```

## Discover Movies By Provider

```typescript
const discover = await tmdb.discover.movie({
	sort_by: "popularity.desc",
	watch_region: "US",
	with_watch_providers: "8",
	page: 1,
});

console.log(discover.results.map((movie) => movie.title));
```

## Work With Paginated Results

```typescript
const pageOne = await tmdb.search.movies({ query: "Alien", page: 1 });

if (pageOne.page < pageOne.total_pages) {
	const pageTwo = await tmdb.search.movies({
		query: "Alien",
		page: pageOne.page + 1,
	});

	console.log(pageTwo.results);
}
```

## Use A Per-Request Timeout

```typescript
const results = await tmdb.search.movies(
	{ query: "Heat", page: 1 },
	{ timeoutMs: 5_000 },
);

console.log(results.total_results);
```

## Use API Key Auth

```typescript
const tmdbWithApiKey = new TMDB({
	apiKey: process.env.TMDB_API_KEY,
	client: {
		timeoutMs: 10_000,
		retry: { maxAttempts: 2 },
	},
});

const popular = await tmdbWithApiKey.movies.popular({ page: 1 });
console.log(popular.results[0]?.title);
```

# Client Lifecycle

`TMDB` creates one shared `TMDBApiClient` and injects it into every endpoint group. The shared client is exposed as `tmdb.http` for advanced api-core access.

```typescript
import { TMDB } from "@api-wrappers/tmdb-wrapper";

const tmdb = new TMDB(process.env.TMDB_ACCESS_TOKEN!);

console.log(tmdb.http);

const movie = await tmdb.movies.details(550);
console.log(movie.title);

await tmdb.dispose();
```

Call `dispose()` when the client is no longer needed so api-core plugins and transport resources can clean themselves up.

## Create the HTTP client separately

Use `createHttpClient` when you want to configure or retain the transport before creating the endpoint facade.

```typescript
import {
	TMDB,
	createHttpClient,
} from "@api-wrappers/tmdb-wrapper";

const http = createHttpClient({
	accessToken: process.env.TMDB_ACCESS_TOKEN,
	client: {
		timeoutMs: 10_000,
		retry: { maxAttempts: 3, delayMs: 300 },
	},
});

const tmdb = new TMDB(http);

await tmdb.movies.popular({ page: 1 });
await tmdb.dispose();
```

Passing an existing `TMDBApiClient` to `TMDB` reuses that exact instance instead of creating another transport.

## Create an endpoint bundle

`createClientBundle` returns the shared HTTP client and all endpoint groups without constructing the `TMDB` class.

```typescript
import { createClientBundle } from "@api-wrappers/tmdb-wrapper";

const client = createClientBundle(process.env.TMDB_ACCESS_TOKEN!);

const trending = await client.trending.trending("movie", "week");
console.log(trending.results);

await client.http.dispose();
```

This is useful for dependency injection, framework integrations, and applications that prefer factory-created objects.

# Examples

These examples import from `../src/index.ts` so they run against your current checkout. Use them when changing endpoint code or when learning the wrapper from real calls.

## Setup

Create a TMDB account, open [TMDB API Settings](https://www.themoviedb.org/settings/api), and copy the API read access token.

```bash
export TMDB_ACCESS_TOKEN="YOUR_READ_ACCESS_TOKEN"
```

## Run

```bash
bun examples/basic-usage.ts
bun examples/image-helpers.ts
bun examples/search-and-discover.ts
```

## Files

| Example | What it shows |
| --- | --- |
| [basic-usage.ts](./basic-usage.ts) | Create a client, fetch popular movies, append credits/videos, and search movies |
| [image-helpers.ts](./image-helpers.ts) | Build image URLs with `getFullImagePath` and `formImage` |
| [search-and-discover.ts](./search-and-discover.ts) | Search by query, get trending movies, and discover titles with filters |

## Auth Patterns

Read access token:

```typescript
const tmdb = new TMDB(process.env.TMDB_ACCESS_TOKEN!);
```

API key:

```typescript
const tmdb = new TMDB({ apiKey: process.env.TMDB_API_KEY });
```

Custom request behavior:

```typescript
const tmdb = new TMDB({
	accessToken: process.env.TMDB_ACCESS_TOKEN,
	client: {
		timeoutMs: 10_000,
		retry: { maxAttempts: 3, delayMs: 300 },
	},
});
```

Per-request behavior:

```typescript
const controller = new AbortController();

const results = await tmdb.search.movies(
	{ query: "Alien" },
	{ signal: controller.signal, timeoutMs: 5_000 },
);
```

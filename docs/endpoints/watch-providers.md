# Watch Providers — `tmdb.watchProviders`

Access via `tmdb.watchProviders` (instance of `WatchProvidersEndpoint`).

Returns streaming availability data powered by JustWatch.

## Methods

### `movie`

```typescript
tmdb.watchProviders.movie(): Promise<WatchProviderListResponse>
```

Returns all watch providers available for movies.

---

### `tv`

```typescript
tmdb.watchProviders.tv(): Promise<WatchProviderListResponse>
```

Returns all watch providers available for TV shows.

---

### `regions`

```typescript
tmdb.watchProviders.regions(): Promise<WatchRegionsResponse>
```

Returns all available regions.

## Types

```typescript
interface WatchRegion {
  iso_3166_1: string;     // e.g. "US"
  english_name: string;   // e.g. "United States of America"
  native_name: string;
}

interface WatchRegionsResponse {
  results: WatchRegion[];
}

interface WatchProviderEntry {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

interface WatchProviderListResponse {
  results: WatchProviderEntry[];
}
```

## Watch Providers on a Movie/Show

To get streaming availability for a specific movie or TV show, use `watchProviders` on the relevant endpoint:

```typescript
// For a movie
const providers = await tmdb.movies.watchProviders(550);

// For a TV show
const providers = await tmdb.tvShows.watchProviders(1396);

// providers.results is keyed by region (e.g. "US"):
const us = providers.results['US'];
us?.flatrate; // Flatrate[] — subscription streaming
us?.rent;     // Rent[]
us?.buy;      // Buy[]
us?.free;     // available for free
us?.ads;      // ad-supported
```

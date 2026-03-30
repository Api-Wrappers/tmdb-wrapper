# Discover — `tmdb.discover`

Access via `tmdb.discover` (instance of `DiscoverEndpoint`).

Discovery lets you filter and sort movies or TV shows by many criteria without a search query.

## Methods

### `movie`

```typescript
tmdb.discover.movie(
  options?: MovieQueryOptions,
  request?: RequestConfig,
): Promise<MovieDiscoverResult>
```

**Common `MovieQueryOptions` fields:**

| Field | Type | Description |
|---|---|---|
| `sort_by` | `MovieSortOption` | Sort order |
| `page` | `number` | Page number |
| `language` | `string` | Language code |
| `region` | `string` | Region code |
| `include_adult` | `boolean` | Include adult titles |
| `include_video` | `boolean` | Include video releases |
| `primary_release_year` | `number` | Exact year |
| `primary_release_date.gte` | `string` | Release date from |
| `primary_release_date.lte` | `string` | Release date to |
| `with_genres` | `string` | Comma-separated genre IDs |
| `without_genres` | `string` | Exclude genre IDs |
| `with_companies` | `string` | Company IDs |
| `with_keywords` | `string` | Keyword IDs |
| `vote_average.gte` | `number` | Minimum vote average |
| `vote_average.lte` | `number` | Maximum vote average |
| `vote_count.gte` | `number` | Minimum vote count |
| `with_runtime.gte` | `number` | Minimum runtime (minutes) |
| `with_runtime.lte` | `number` | Maximum runtime (minutes) |
| `with_watch_providers` | `string` | Watch provider IDs |
| `watch_region` | `string` | Region for watch providers |
| `with_watch_monetization_types` | `WatchMonetizationType` | `"flatrate"` \| `"free"` \| `"ads"` \| `"rent"` \| `"buy"` |

**`MovieSortOption` values:** `"original_title.asc"`, `"original_title.desc"`, `"popularity.asc"`, `"popularity.desc"`, `"revenue.asc"`, `"revenue.desc"`, `"primary_release_date.asc"`, `"primary_release_date.desc"`, `"title.asc"`, `"title.desc"`, `"vote_average.asc"`, `"vote_average.desc"`, `"vote_count.asc"`, `"vote_count.desc"`

**Examples:**

```typescript
// Action movies sorted by popularity
const action = await tmdb.discover.movie({
  with_genres: '28',
  sort_by: 'popularity.desc',
});

// Highly rated movies from 2023
const topRated2023 = await tmdb.discover.movie({
  primary_release_year: 2023,
  vote_average: { gte: 7.5 },
  sort_by: 'vote_average.desc',
});

// Movies available on Netflix
const netflix = await tmdb.discover.movie({
  with_watch_providers: '8',
  watch_region: 'US',
  with_watch_monetization_types: 'flatrate',
});
```

---

### `tvShow`

```typescript
tmdb.discover.tvShow(
  options?: TvShowQueryOptions,
  request?: RequestConfig,
): Promise<TvShowDiscoverResult>
```

**Common `TvShowQueryOptions` fields:**

| Field | Type | Description |
|---|---|---|
| `sort_by` | `TvSortOption` | Sort order |
| `page` | `number` | Page number |
| `language` | `string` | Language code |
| `include_adult` | `boolean` | Include adult titles |
| `first_air_date_year` | `number` | Exact year |
| `first_air_date.gte` | `string` | First air date from |
| `first_air_date.lte` | `string` | First air date to |
| `with_genres` | `string` | Genre IDs |
| `with_networks` | `string` | Network IDs |
| `with_companies` | `string` | Company IDs |
| `with_keywords` | `string` | Keyword IDs |
| `vote_average.gte` | `number` | Minimum vote average |
| `with_watch_providers` | `string` | Watch provider IDs |
| `watch_region` | `string` | Region for watch providers |

**`TvSortOption` values:** `"first_air_date.asc"`, `"first_air_date.desc"`, `"name.asc"`, `"name.desc"`, `"original_name.asc"`, `"original_name.desc"`, `"popularity.asc"`, `"popularity.desc"`, `"vote_average.asc"`, `"vote_average.desc"`, `"vote_count.asc"`, `"vote_count.desc"`

```typescript
// Shows on Netflix sorted by vote average
const netflixShows = await tmdb.discover.tvShow({
  with_networks: '213',
  sort_by: 'vote_average.desc',
});
```

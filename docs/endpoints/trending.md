# Trending — `tmdb.trending`

Access via `tmdb.trending` (instance of `TrendingEndpoint`).

## Method

### `trending`

```typescript
tmdb.trending.trending(
  mediaType: TrendingMediaType,
  timeWindow: TimeWindow,
  options?: { language?: string; page?: number },
  request?: RequestConfig,
): Promise<TrendingResults<T>>
```

**`TrendingMediaType`:** `"all"` | `"movie"` | `"tv"` | `"person"`

**`TimeWindow`:** `"day"` | `"week"`

The return type is conditional on `mediaType`:
- `"movie"` → results are `MovieWithMediaType[]`
- `"tv"` → results are `TVWithMediaType[]`
- `"person"` → results are `PersonWithMediaType[]`
- `"all"` → results are `(MovieWithMediaType | TVWithMediaType | PersonWithMediaType)[]`

## Examples

```typescript
// Trending movies today
const movies = await tmdb.trending.trending('movie', 'day');

// Trending TV shows this week
const shows = await tmdb.trending.trending('tv', 'week');

// Trending people today
const people = await tmdb.trending.trending('person', 'day');

// Everything trending this week
const all = await tmdb.trending.trending('all', 'week');
for (const item of all.results) {
  if (item.media_type === 'movie')  { /* MovieWithMediaType */ }
  if (item.media_type === 'tv')     { /* TVWithMediaType */ }
  if (item.media_type === 'person') { /* PersonWithMediaType */ }
}
```

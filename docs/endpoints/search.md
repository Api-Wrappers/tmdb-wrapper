# Search — `tmdb.search`

Access via `tmdb.search` (instance of `SearchEndpoint`).

All search methods require at least `{ query: string }` in their options.

Results are paginated: `{ page, results, total_pages, total_results }`.

## Methods

### `movies`

```typescript
tmdb.search.movies(
  options: {
    query: string;
    include_adult?: boolean;
    language?: string;
    primary_release_year?: number;
    page?: number;
    region?: string;
    year?: number;
  },
  request?: RequestConfig,
): Promise<Search<Movie>>
```

```typescript
const results = await tmdb.search.movies({ query: 'Inception' });
results.results; // Movie[]
```

---

### `tv`

```typescript
tmdb.search.tv(
  options: {
    query: string;
    include_adult?: boolean;
    language?: string;
    first_air_date_year?: number;
    page?: number;
  },
  request?: RequestConfig,
): Promise<Search<TV>>
```

```typescript
const results = await tmdb.search.tv({ query: 'Breaking Bad' });
```

---

### `people`

```typescript
tmdb.search.people(
  options: {
    query: string;
    include_adult?: boolean;
    language?: string;
    page?: number;
  },
  request?: RequestConfig,
): Promise<Search<Person>>
```

---

### `multi`

Search across movies, TV shows, and people in a single request.

```typescript
tmdb.search.multi(
  options: {
    query: string;
    include_adult?: boolean;
    language?: string;
    page?: number;
  },
  request?: RequestConfig,
): Promise<Search<MultiSearchResult>>
```

`MultiSearchResult` is `MovieWithMediaType | TVWithMediaType | PersonWithMediaType`. Each result includes a `media_type` discriminant (`"movie"`, `"tv"`, or `"person"`).

```typescript
const results = await tmdb.search.multi({ query: 'Marvel' });
for (const item of results.results) {
  if (item.media_type === 'movie') { /* item is MovieWithMediaType */ }
  if (item.media_type === 'tv')    { /* item is TVWithMediaType */ }
  if (item.media_type === 'person') { /* item is PersonWithMediaType */ }
}
```

---

### `companies`

```typescript
tmdb.search.companies(
  options: { query: string; page?: number },
  request?: RequestConfig,
): Promise<Search<Company>>
```

---

### `collections`

```typescript
tmdb.search.collections(
  options: {
    query: string;
    include_adult?: boolean;
    language?: string;
    page?: number;
    region?: string;
  },
  request?: RequestConfig,
): Promise<Search<Collection>>
```

---

### `keywords`

```typescript
tmdb.search.keywords(
  options: { query: string; page?: number },
  request?: RequestConfig,
): Promise<Search<{ id: string; name: string }>>
```

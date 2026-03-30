# Changes — `tmdb.changes`

Access via `tmdb.changes` (instance of `ChangeEndpoint`).

Returns lists of movie, TV show, or person IDs that have been recently added or changed in TMDB.

## Methods

### `movies`

```typescript
tmdb.changes.movies(
  options?: {
    page?: number;
    start_date?: string; // YYYY-MM-DD
    end_date?: string;   // YYYY-MM-DD
  },
): Promise<MediaChanges>
```

---

### `tv`

```typescript
tmdb.changes.tv(
  options?: {
    page?: number;
    start_date?: string;
    end_date?: string;
  },
): Promise<MediaChanges>
```

---

### `person`

```typescript
tmdb.changes.person(
  options?: {
    page?: number;
    start_date?: string;
    end_date?: string;
  },
): Promise<MediaChanges>
```

## Types

```typescript
interface MediaChange {
  id: number;
  adult?: boolean;
}

interface MediaChanges {
  results: MediaChange[];
  page: number;
  total_pages: number;
  total_results: number;
}
```

## Note

To get the specific changes *within* a movie, TV show, or person record, use the `changes` method on the relevant endpoint (e.g. `tmdb.movies.changes(id)`).

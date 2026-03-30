# Keywords — `tmdb.keywords`

Access via `tmdb.keywords` (instance of `KeywordsEndpoint`).

## Methods

### `details`

```typescript
tmdb.keywords.details(keywordId: number): Promise<Keyword>
```

```typescript
const keyword = await tmdb.keywords.details(818); // based on novel
keyword.id;
keyword.name;
```

---

### `belongingMovies`

```typescript
tmdb.keywords.belongingMovies(
  keywordId: number,
  options?: {
    include_adult?: boolean;
    language?: string;
    page?: number;
  },
): Promise<BelongingMovies>
```

Returns paginated movies that have this keyword.

```typescript
const movies = await tmdb.keywords.belongingMovies(818);
movies.results; // Movie[]
```

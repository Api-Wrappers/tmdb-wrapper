# Genre — `tmdb.genre`

Access via `tmdb.genre` (instance of `GenreEndpoint`).

Note: the property is `tmdb.genre` (singular), not `tmdb.genres`.

## Methods

### `movies`

```typescript
tmdb.genre.movies(options?: { language?: string }): Promise<Genres>
```

```typescript
const genres = await tmdb.genre.movies();
genres.genres; // Array<{ id: number; name: string }>
```

---

### `tv`

```typescript
tmdb.genre.tv(options?: { language?: string }): Promise<Genres>
```

## Common Genre IDs (Movies)

| ID | Name |
|---|---|
| 28 | Action |
| 12 | Adventure |
| 16 | Animation |
| 35 | Comedy |
| 80 | Crime |
| 99 | Documentary |
| 18 | Drama |
| 10751 | Family |
| 14 | Fantasy |
| 36 | History |
| 27 | Horror |
| 10402 | Music |
| 9648 | Mystery |
| 10749 | Romance |
| 878 | Science Fiction |
| 10770 | TV Movie |
| 53 | Thriller |
| 10752 | War |
| 37 | Western |

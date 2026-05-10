# Lists — `tmdb.lists`

Access via `tmdb.lists` (instance of `ListsEndpoint`).

## Methods

```typescript
tmdb.lists.details(1, { language: "en-US", page: 1 });
tmdb.lists.itemStatus(1, { movie_id: 550 });

tmdb.lists.create(
  { name: "Watch soon", description: "Movies to watch", language: "en" },
  "SESSION_ID",
);

tmdb.lists.addMovie(1, 550, "SESSION_ID");
tmdb.lists.removeMovie(1, 550, "SESSION_ID");
tmdb.lists.clear(1, { session_id: "SESSION_ID", confirm: true });
tmdb.lists.delete(1, "SESSION_ID");
```

# Guest Sessions — `tmdb.guestSessions`

Access via `tmdb.guestSessions` (instance of `GuestSessionsEndpoint`).

## Methods

```typescript
tmdb.guestSessions.ratedMovies("GUEST_SESSION_ID", {
  language: "en-US",
  page: 1,
  sort_by: "created_at.desc",
});

tmdb.guestSessions.ratedTv("GUEST_SESSION_ID");
tmdb.guestSessions.ratedTvEpisodes("GUEST_SESSION_ID");
```

# Credits — `tmdb.credits`

Access via `tmdb.credits` (instance of `CreditsEndpoint`).

Look up a credit record directly by its TMDB credit ID.

## Method

### `getById`

```typescript
tmdb.credits.getById(id: string): Promise<CreditResponse>
```

```typescript
const credit = await tmdb.credits.getById('52542282760ee313280017f9');
```

Credit IDs appear in cast and crew objects returned by other endpoints (e.g. `tmdb.movies.credits()`).

## Note

For cast and crew on a specific movie, TV show, season, or episode, use the `credits` method on the relevant endpoint instead:

```typescript
tmdb.movies.credits(movieId)
tmdb.tvShows.credits(showId)
tmdb.tvSeasons.credits({ tvShowID, seasonNumber })
tmdb.tvEpisodes.credits({ tvShowID, seasonNumber, episodeNumber })
```

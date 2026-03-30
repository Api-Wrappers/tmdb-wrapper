# Find — `tmdb.find`

Access via `tmdb.find` (instance of `FindEndpoint`).

Look up TMDB items by an external ID (IMDb, TVDB, Facebook, etc).

## Method

### `byId`

```typescript
tmdb.find.byId(
  externalId: string,
  options: {
    external_source: ExternalSource;
    language?: string;
  },
): Promise<FindResult>
```

**`ExternalSource` values:**

| Value | Description |
|---|---|
| `"imdb_id"` | IMDb ID (e.g. `"tt0137523"`) |
| `"tvdb_id"` | TheTVDB ID |
| `"freebase_mid"` | Freebase MID |
| `"freebase_id"` | Freebase ID |
| `"tvrage_id"` | TVRage ID |
| `"facebook_id"` | Facebook ID |
| `"twitter_id"` | Twitter ID |
| `"instagram_id"` | Instagram ID |

## Example

```typescript
// Find Fight Club by its IMDb ID
const result = await tmdb.find.byId('tt0137523', {
  external_source: 'imdb_id',
});

result.movie_results;     // Movie[]
result.tv_results;        // TV[]
result.person_results;    // Person[]
result.tv_episode_results;
result.tv_season_results;
```

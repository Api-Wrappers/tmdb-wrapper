# TV Episodes — `tmdb.tvEpisodes`

Access via `tmdb.tvEpisodes` (instance of `TvEpisodesEndpoint`).

## `EpisodeSelection`

Most methods take an `EpisodeSelection` object:

```typescript
interface EpisodeSelection {
  tvShowID: number;
  seasonNumber: number;
  episodeNumber: number;
}
```

**Exception:** `changes()` takes a numeric `episodeID` (the episode's own TMDB ID).

## Methods

### `details`

```typescript
tmdb.tvEpisodes.details(
  episodeSelection: EpisodeSelection,
  appendToResponse?: AppendToResponseTvEpisodeKey[],
  options?: { language?: string },
  request?: RequestConfig,
): Promise<Omit<Episode, 'show_id'>>
```

```typescript
const episode = await tmdb.tvEpisodes.details({
  tvShowID: 1396,
  seasonNumber: 1,
  episodeNumber: 1,
});
episode.name; episode.air_date; episode.runtime;
```

**`AppendToResponseTvEpisodeKey` values:** `"credits"`, `"external_ids"`, `"images"`, `"translations"`, `"videos"`

---

### `changes`

```typescript
tmdb.tvEpisodes.changes(
  episodeID: number, // The episode's own TMDB ID (not its number)
  options?: { page?: number; start_date?: string; end_date?: string },
  request?: RequestConfig,
): Promise<Changes<TvEpisodeChangeValue>>
```

---

### `credits`

```typescript
tmdb.tvEpisodes.credits(
  episodeSelection: EpisodeSelection,
  options?: { language?: string },
  request?: RequestConfig,
): Promise<TvEpisodeCredit>
```

`TvEpisodeCredit` extends `Credits` and adds `guest_stars`.

---

### `externalIds`

```typescript
tmdb.tvEpisodes.externalIds(
  episodeSelection: EpisodeSelection,
  request?: RequestConfig,
): Promise<ExternalIds>
```

---

### `images`

```typescript
tmdb.tvEpisodes.images(
  episodeSelection: EpisodeSelection,
  options?: { language?: string; include_image_language?: string[] },
  request?: RequestConfig,
): Promise<Images>
```

---

### `translations`

```typescript
tmdb.tvEpisodes.translations(
  episodeSelection: EpisodeSelection,
  request?: RequestConfig,
): Promise<TvEpisodeTranslations>
```

---

### `videos`

```typescript
tmdb.tvEpisodes.videos(
  episodeSelection: EpisodeSelection,
  options?: { language?: string; include_video_language?: string[] },
  request?: RequestConfig,
): Promise<Videos>
```

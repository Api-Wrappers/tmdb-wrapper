# TV Seasons — `tmdb.tvSeasons`

Access via `tmdb.tvSeasons` (instance of `TvSeasonsEndpoint`).

## `SeasonSelection`

Most methods take a `SeasonSelection` object to identify the season:

```typescript
interface SeasonSelection {
  tvShowID: number;
  seasonNumber: number;
}
```

**Exception:** `changes()` takes a numeric `seasonId` instead (the season's own TMDB ID, not its number).

## Methods

### `details`

```typescript
tmdb.tvSeasons.details(
  seasonSelection: SeasonSelection,
  appendToResponse?: AppendToResponseTvSeasonKey[],
  options?: { language?: string },
  request?: RequestConfig,
): Promise<SeasonDetails>
```

```typescript
const season = await tmdb.tvSeasons.details({ tvShowID: 1396, seasonNumber: 1 });
season.episodes; // Episode[]
season.air_date;
season.name;
```

**`AppendToResponseTvSeasonKey` values:** `"aggregate_credits"`, `"credits"`, `"external_ids"`, `"images"`, `"translations"`, `"videos"`

---

### `aggregateCredits`

```typescript
tmdb.tvSeasons.aggregateCredits(
  seasonSelection: SeasonSelection,
  options?: { language?: string },
  request?: RequestConfig,
): Promise<AggregateCredits>
```

---

### `changes`

```typescript
tmdb.tvSeasons.changes(
  seasonId: number,  // The season's own TMDB ID (not the season number)
  options?: { page?: number; start_date?: string; end_date?: string },
  request?: RequestConfig,
): Promise<Changes<TvSeasonChangeValue>>
```

---

### `credits`

```typescript
tmdb.tvSeasons.credits(
  seasonSelection: SeasonSelection,
  options?: { language?: string },
  request?: RequestConfig,
): Promise<Credits>
```

---

### `externalIds`

```typescript
tmdb.tvSeasons.externalIds(
  seasonSelection: SeasonSelection,
  options?: { language?: string },
  request?: RequestConfig,
): Promise<ExternalIds>
```

---

### `images`

```typescript
tmdb.tvSeasons.images(
  seasonSelection: SeasonSelection,
  options?: { language?: string; include_image_language?: string[] },
  request?: RequestConfig,
): Promise<Images>
```

---

### `videos`

```typescript
tmdb.tvSeasons.videos(
  seasonSelection: SeasonSelection,
  options?: { language?: string; include_video_language?: string[] },
  request?: RequestConfig,
): Promise<Videos>
```

---

### `translations`

```typescript
tmdb.tvSeasons.translations(
  seasonSelection: SeasonSelection,
  options?: { language?: string },
  request?: RequestConfig,
): Promise<Translations>
```

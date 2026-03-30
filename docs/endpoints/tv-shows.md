# TV Shows — `tmdb.tvShows`

Access via `tmdb.tvShows` (instance of `TvShowsEndpoint`).

## Methods

### `details`

```typescript
tmdb.tvShows.details(
  id: number,
  appendToResponse?: AppendToResponseTvKey[],
  language?: string,
): Promise<TvShowDetails>
```

```typescript
const show = await tmdb.tvShows.details(1396); // Breaking Bad
show.name; show.number_of_seasons; show.status;

// With appended data
const show = await tmdb.tvShows.details(1396, ['credits', 'videos']);
show.credits.cast;
```

**`AppendToResponseTvKey` values:** `"aggregate_credits"`, `"alternative_titles"`, `"changes"`, `"content_ratings"`, `"credits"`, `"episode_groups"`, `"external_ids"`, `"images"`, `"keywords"`, `"recommendations"`, `"reviews"`, `"screened_theatrically"`, `"similar"`, `"translations"`, `"videos"`, `"watch/providers"`

---

### `alternativeTitles`

```typescript
tmdb.tvShows.alternativeTitles(id: number): Promise<AlternativeTitles>
```

---

### `aggregateCredits`

```typescript
tmdb.tvShows.aggregateCredits(
  id: number,
  options?: { language?: string },
): Promise<AggregateCredits>
```

Returns cast and crew aggregated across all seasons.

---

### `changes`

```typescript
tmdb.tvShows.changes(
  id: number,
  options?: { page?: number; start_date?: string; end_date?: string },
): Promise<Changes<TvShowChangeValue>>
```

---

### `contentRatings`

```typescript
tmdb.tvShows.contentRatings(id: number): Promise<ContentRatings>
```

---

### `credits`

```typescript
tmdb.tvShows.credits(
  id: number,
  options?: { language?: string },
): Promise<Credits>
```

---

### `season`

```typescript
tmdb.tvShows.season(tvId: number, seasonNumber: number): Promise<SeasonDetails>
```

Shortcut to fetch a season's details without going through `tmdb.tvSeasons`.

```typescript
const season1 = await tmdb.tvShows.season(1396, 1);
season1.episodes; // Episode[]
```

---

### `episodeGroups`

```typescript
tmdb.tvShows.episodeGroups(id: number): Promise<EpisodeGroups>
```

---

### `externalIds`

```typescript
tmdb.tvShows.externalIds(id: number): Promise<ExternalIds>
```

---

### `images`

```typescript
tmdb.tvShows.images(
  id: number,
  options?: { language?: string; include_image_language?: string[] },
): Promise<Images>
```

---

### `keywords`

```typescript
tmdb.tvShows.keywords(id: number): Promise<Keywords>
```

---

### `recommendations`

```typescript
tmdb.tvShows.recommendations(
  id: number,
  options?: { language?: string; page?: number },
): Promise<Recommendations>
```

---

### `reviews`

```typescript
tmdb.tvShows.reviews(
  id: number,
  options?: { language?: string; page?: number },
): Promise<Reviews>
```

---

### `screenedTheatrically`

```typescript
tmdb.tvShows.screenedTheatrically(id: number): Promise<ScreenedTheatrically>
```

---

### `similar`

```typescript
tmdb.tvShows.similar(
  id: number,
  options?: { language?: string; page?: number },
): Promise<Similartv>
```

---

### `translations`

```typescript
tmdb.tvShows.translations(id: number): Promise<Translations>
```

---

### `videos`

```typescript
tmdb.tvShows.videos(
  id: number,
  options?: { language?: string; include_video_language?: string[] },
): Promise<Videos>
```

---

### `watchProviders`

```typescript
tmdb.tvShows.watchProviders(id: number): Promise<WatchProviders>
```

Streaming availability powered by JustWatch.

---

### `latest`

```typescript
tmdb.tvShows.latest(): Promise<Latesttv>
```

---

### `onTheAir`

```typescript
tmdb.tvShows.onTheAir(
  options?: { page?: number; language?: string; timezone?: string },
): Promise<OnTheAir>
```

---

### `airingToday`

```typescript
tmdb.tvShows.airingToday(
  options?: { page?: number; language?: string; timezone?: string },
): Promise<tvAiringToday>
```

---

### `popular`

```typescript
tmdb.tvShows.popular(
  options?: { page?: number; language?: string },
): Promise<Populartv>
```

---

### `topRated`

```typescript
tmdb.tvShows.topRated(
  options?: { page?: number; language?: string },
): Promise<TopRatedtv>
```

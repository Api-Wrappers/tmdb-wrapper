# TV Shows — `tmdb.tvShows`

Access via `tmdb.tvShows` (instance of `TvShowsEndpoint`).

## Methods

### `details`

```typescript
tmdb.tvShows.details(
  id: number,
  appendToResponse?: AppendToResponseTvKey[],
  language?: string,
  request?: RequestConfig,
): Promise<TvShowDetails>
```

```typescript
const show = await tmdb.tvShows.details(1396); // Breaking Bad
show.name; show.number_of_seasons; show.status;

// With appended data
const show = await tmdb.tvShows.details(1396, ['credits', 'videos']);
show.credits.cast;
```

**`AppendToResponseTvKey` values:** `"account_states"`, `"aggregate_credits"`, `"alternative_titles"`, `"changes"`, `"content_ratings"`, `"credits"`, `"episode_groups"`, `"external_ids"`, `"images"`, `"keywords"`, `"lists"`, `"recommendations"`, `"reviews"`, `"screened_theatrically"`, `"similar"`, `"translations"`, `"videos"`, `"watch/providers"`

---

### `alternativeTitles`

```typescript
tmdb.tvShows.alternativeTitles(
  id: number,
  request?: RequestConfig,
): Promise<AlternativeTitles>
```

---

### `aggregateCredits`

```typescript
tmdb.tvShows.aggregateCredits(
  id: number,
  options?: { language?: string },
  request?: RequestConfig,
): Promise<AggregateCredits>
```

Returns cast and crew aggregated across all seasons.

---

### `changes`

```typescript
tmdb.tvShows.changes(
  id: number,
  options?: { page?: number; start_date?: string; end_date?: string },
  request?: RequestConfig,
): Promise<Changes<TvShowChangeValue>>
```

---

### `contentRatings`

```typescript
tmdb.tvShows.contentRatings(
  id: number,
  request?: RequestConfig,
): Promise<ContentRatings>
```

---

### `credits`

```typescript
tmdb.tvShows.credits(
  id: number,
  options?: { language?: string },
  request?: RequestConfig,
): Promise<Credits>
```

---

### `season`

```typescript
tmdb.tvShows.season(
  tvId: number,
  seasonNumber: number,
  request?: RequestConfig,
): Promise<SeasonDetails>
```

Shortcut to fetch a season's details without going through `tmdb.tvSeasons`.

```typescript
const season1 = await tmdb.tvShows.season(1396, 1);
season1.episodes; // Episode[]
```

---

### `episodeGroups`

```typescript
tmdb.tvShows.episodeGroups(
  id: number,
  request?: RequestConfig,
): Promise<EpisodeGroups>
```

---

### `externalIds`

```typescript
tmdb.tvShows.externalIds(id: number, request?: RequestConfig): Promise<ExternalIds>
```

---

### `images`

```typescript
tmdb.tvShows.images(
  id: number,
  options?: { language?: string; include_image_language?: string[] },
  request?: RequestConfig,
): Promise<Images>
```

---

### `keywords`

```typescript
tmdb.tvShows.keywords(id: number, request?: RequestConfig): Promise<Keywords>
```

---

### `recommendations`

```typescript
tmdb.tvShows.recommendations(
  id: number,
  options?: { language?: string; page?: number },
  request?: RequestConfig,
): Promise<Recommendations>
```

---

### `reviews`

```typescript
tmdb.tvShows.reviews(
  id: number,
  options?: { language?: string; page?: number },
  request?: RequestConfig,
): Promise<Reviews>
```

---

### `screenedTheatrically`

```typescript
tmdb.tvShows.screenedTheatrically(
  id: number,
  request?: RequestConfig,
): Promise<ScreenedTheatrically>
```

---

### `similar`

```typescript
tmdb.tvShows.similar(
  id: number,
  options?: { language?: string; page?: number },
  request?: RequestConfig,
): Promise<Similartv>
```

---

### `translations`

```typescript
tmdb.tvShows.translations(
  id: number,
  request?: RequestConfig,
): Promise<Translations>
```

---

### `videos`

```typescript
tmdb.tvShows.videos(
  id: number,
  options?: { language?: string; include_video_language?: string[] },
  request?: RequestConfig,
): Promise<Videos>
```

---

### `watchProviders`

```typescript
tmdb.tvShows.watchProviders(
  id: number,
  request?: RequestConfig,
): Promise<WatchProviders>
```

Streaming availability powered by JustWatch.

---

### `accountStates`

```typescript
tmdb.tvShows.accountStates(
  id: number,
  options?: { session_id?: string; guest_session_id?: string },
  request?: RequestConfig,
): Promise<MediaAccountStates>
```

---

### `lists`

```typescript
tmdb.tvShows.lists(
  id: number,
  options?: { language?: string; page?: number },
  request?: RequestConfig,
): Promise<MovieLists>
```

---

### `addRating`

```typescript
tmdb.tvShows.addRating(
  id: number,
  rating: number | { value: number },
  options?: { session_id?: string; guest_session_id?: string },
  request?: RequestConfig,
): Promise<StatusResponse>
```

---

### `deleteRating`

```typescript
tmdb.tvShows.deleteRating(
  id: number,
  options?: { session_id?: string; guest_session_id?: string },
  request?: RequestConfig,
): Promise<StatusResponse>
```

---

### `latest`

```typescript
tmdb.tvShows.latest(request?: RequestConfig): Promise<Latesttv>
```

---

### `onTheAir`

```typescript
tmdb.tvShows.onTheAir(
  options?: { page?: number; language?: string; timezone?: string },
  request?: RequestConfig,
): Promise<OnTheAir>
```

---

### `airingToday`

```typescript
tmdb.tvShows.airingToday(
  options?: { page?: number; language?: string; timezone?: string },
  request?: RequestConfig,
): Promise<tvAiringToday>
```

---

### `popular`

```typescript
tmdb.tvShows.popular(
  options?: { page?: number; language?: string },
  request?: RequestConfig,
): Promise<Populartv>
```

---

### `topRated`

```typescript
tmdb.tvShows.topRated(
  options?: { page?: number; language?: string },
  request?: RequestConfig,
): Promise<TopRatedtv>
```

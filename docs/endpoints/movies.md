# Movies — `tmdb.movies`

Access via `tmdb.movies` (instance of `MoviesEndpoint`).

## Methods

### `details`

```typescript
tmdb.movies.details(
  id: number,
  appendToResponse?: AppendToResponseMovieKey[],
  language?: string,
  request?: RequestConfig,
): Promise<MovieDetails>
```

Fetch full details for a movie.

```typescript
const movie = await tmdb.movies.details(550);
// movie.title, movie.overview, movie.release_date, ...

// With appended data
const movie = await tmdb.movies.details(550, ['credits', 'videos']);
// movie.credits.cast, movie.videos.results, ...
```

**`AppendToResponseMovieKey` values:** `"credits"`, `"videos"`, `"images"`, `"keywords"`, `"recommendations"`, `"reviews"`, `"similar"`, `"translations"`, `"watch/providers"`, `"release_dates"`, `"alternative_titles"`, `"changes"`, `"lists"`, `"external_ids"`

---

### `alternativeTitles`

```typescript
tmdb.movies.alternativeTitles(
  id: number,
  request?: RequestConfig,
): Promise<AlternativeTitles>
```

---

### `changes`

```typescript
tmdb.movies.changes(
  id: number,
  options?: { page?: number; start_date?: string; end_date?: string },
  request?: RequestConfig,
): Promise<Changes<MovieChangeValue>>
```

---

### `credits`

```typescript
tmdb.movies.credits(
  id: number,
  options?: { language?: string },
  request?: RequestConfig,
): Promise<Credits>
```

```typescript
const credits = await tmdb.movies.credits(550);
credits.cast; // Cast[]
credits.crew; // Crew[]
```

---

### `externalIds`

```typescript
tmdb.movies.externalIds(
  id: number,
  request?: RequestConfig,
): Promise<ExternalIds>
```

---

### `images`

```typescript
tmdb.movies.images(
  id: number,
  options?: { language?: string; include_image_language?: string[] },
  request?: RequestConfig,
): Promise<Images>
```

```typescript
const images = await tmdb.movies.images(550);
images.posters;   // Image[]
images.backdrops; // Image[]
images.logos;     // Image[]
```

---

### `keywords`

```typescript
tmdb.movies.keywords(
  id: number,
  request?: RequestConfig,
): Promise<Keywords>
```

---

### `lists`

```typescript
tmdb.movies.lists(
  id: number,
  options?: { language?: string; page?: number },
  request?: RequestConfig,
): Promise<MovieLists>
```

---

### `recommendations`

```typescript
tmdb.movies.recommendations(
  id: number,
  options?: { language?: string; page?: number },
  request?: RequestConfig,
): Promise<Recommendations>
```

---

### `releaseDates`

```typescript
tmdb.movies.releaseDates(
  id: number,
  request?: RequestConfig,
): Promise<ReleaseDates>
```

---

### `reviews`

```typescript
tmdb.movies.reviews(
  id: number,
  options?: { language?: string; page?: number },
  request?: RequestConfig,
): Promise<Reviews>
```

---

### `similar`

```typescript
tmdb.movies.similar(
  id: number,
  options?: { language?: string; page?: number },
  request?: RequestConfig,
): Promise<SimilarMovies>
```

---

### `translations`

```typescript
tmdb.movies.translations(
  id: number,
  request?: RequestConfig,
): Promise<Translations>
```

---

### `videos`

```typescript
tmdb.movies.videos(
  id: number,
  options?: { language?: string },
  request?: RequestConfig,
): Promise<Videos>
```

```typescript
const videos = await tmdb.movies.videos(550);
for (const v of videos.results) {
  // v.key (YouTube key), v.type ("Trailer" | "Teaser" | ...)
}
```

---

### `watchProviders`

```typescript
tmdb.movies.watchProviders(
  id: number,
  request?: RequestConfig,
): Promise<WatchProviders>
```

Streaming availability data powered by JustWatch.

---

### `latest`

```typescript
tmdb.movies.latest(request?: RequestConfig): Promise<LatestMovie>
```

---

### `nowPlaying`

```typescript
tmdb.movies.nowPlaying(
  options?: { page?: number; language?: string; region?: string },
  request?: RequestConfig,
): Promise<MoviesPlayingNow>
```

---

### `popular`

```typescript
tmdb.movies.popular(
  options?: { language?: string; page?: number },
  request?: RequestConfig,
): Promise<PopularMovies>
```

```typescript
const popular = await tmdb.movies.popular();
popular.results; // Movie[]
popular.page;
popular.total_pages;
popular.total_results;
```

---

### `topRated`

```typescript
tmdb.movies.topRated(
  options?: { page?: number; language?: string; region?: string },
  request?: RequestConfig,
): Promise<TopRatedMovies>
```

---

### `upcoming`

```typescript
tmdb.movies.upcoming(
  options?: { page?: number; language?: string; region?: string },
  request?: RequestConfig,
): Promise<UpcomingMovies>
```

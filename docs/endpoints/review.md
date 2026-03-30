# Review — `tmdb.review`

Access via `tmdb.review` (instance of `ReviewEndpoint`).

Note: the property is `tmdb.review` (singular), not `tmdb.reviews`.

## Method

### `details`

```typescript
tmdb.review.details(id: string): Promise<ReviewDetails>
```

Fetch a review by its TMDB review ID.

```typescript
const review = await tmdb.review.details('5488c29bc3a3686f4a00004a');
review.author;
review.content;
review.created_at;
review.media_id;
review.media_title;
review.media_type; // "movie" | "tv"
```

## Note

To list reviews for a specific movie or TV show, use the `reviews` method on the relevant endpoint:

```typescript
tmdb.movies.reviews(movieId)
tmdb.tvShows.reviews(showId)
```

# Account — `tmdb.account`

Access via `tmdb.account` (instance of `AccountEndpoint`).

## Methods

### `details`

```typescript
tmdb.account.details(
  accountId: number,
  options?: { session_id?: string },
  request?: RequestConfig,
): Promise<AccountDetails>
```

```typescript
const account = await tmdb.account.details(12345);
account.id;
account.name;
account.username;
account.iso_3166_1; // country code
account.iso_639_1;  // language code
account.include_adult;
```

## Types

```typescript
interface AccountDetails {
  avatar: {
    gravatar: { hash: string };
    tmdb: { avatar_path: string | null };
  };
  id: number;
  include_adult: boolean;
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  username: string;
}
```

---

### Lists and Ratings

```typescript
tmdb.account.favoriteMovies(accountId, options?, request?);
tmdb.account.favoriteTv(accountId, options?, request?);
tmdb.account.lists(accountId, options?, request?);
tmdb.account.ratedMovies(accountId, options?, request?);
tmdb.account.ratedTv(accountId, options?, request?);
tmdb.account.ratedTvEpisodes(accountId, options?, request?);
tmdb.account.watchlistMovies(accountId, options?, request?);
tmdb.account.watchlistTv(accountId, options?, request?);
```

`options` can include `language`, `page`, `session_id`, and `sort_by` where supported by TMDB.

---

### Mutations

```typescript
tmdb.account.addFavorite(
  accountId,
  { media_type: "movie", media_id: 550, favorite: true },
  { session_id: "SESSION_ID" },
);

tmdb.account.addToWatchlist(
  accountId,
  { media_type: "tv", media_id: 1396, watchlist: true },
  { session_id: "SESSION_ID" },
);
```

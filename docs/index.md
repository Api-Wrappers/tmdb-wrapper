# @api-wrappers/tmdb-wrapper Docs

This package exposes one `TMDB` client. Each property on the client maps to a TMDB API v3 area, and each method returns typed data from the corresponding TMDB endpoint.

```typescript
import { TMDB } from "@api-wrappers/tmdb-wrapper";

const tmdb = new TMDB(process.env.TMDB_ACCESS_TOKEN!);

const movie = await tmdb.movies.details(550, ["credits", "videos"]);
const search = await tmdb.search.movies({ query: "Fight Club" });
const trending = await tmdb.trending.trending("movie", "day");
```

## Start Here

| Need | Read |
| --- | --- |
| Create a client with a token or API key | [Authentication](./authentication.md) |
| Copy-paste common workflows | [Examples](./examples.md) |
| Set timeouts, cancellation, headers, or retry behavior | [Request Config](./request-config.md) |
| Catch failed TMDB requests | [Error Handling](./error-handling.md) |
| Convert `poster_path`, `backdrop_path`, or `file_path` values into image URLs | [Image Utilities](./image-utilities.md) |
| Find approachable contribution ideas | [Contributing Ideas](./contributing-ideas.md) |
| Run real code from this checkout | [Examples](../examples/README.md) |

## Endpoint Reference

| Client property | Docs | Common calls |
| --- | --- | --- |
| `tmdb.movies` | [Movies](./endpoints/movies.md) | `details`, `popular`, `credits`, `images`, `videos`, `watchProviders` |
| `tmdb.tvShows` | [TV Shows](./endpoints/tv-shows.md) | `details`, `popular`, `season`, `aggregateCredits`, `videos` |
| `tmdb.tvSeasons` | [TV Seasons](./endpoints/tv-seasons.md) | `details`, `aggregateCredits`, `images`, `videos` |
| `tmdb.tvEpisodes` | [TV Episodes](./endpoints/tv-episodes.md) | `details`, `credits`, `images`, `videos`, `addRating` |
| `tmdb.people` | [People](./endpoints/people.md) | `details`, `popular`, `movieCredits`, `combinedCredits`, `images` |
| `tmdb.search` | [Search](./endpoints/search.md) | `movies`, `tv`, `people`, `multi`, `companies`, `collections` |
| `tmdb.discover` | [Discover](./endpoints/discover.md) | `movie`, `tvShow` |
| `tmdb.trending` | [Trending](./endpoints/trending.md) | `trending("movie", "day")`, `trending("all", "week")` |
| `tmdb.watchProviders` | [Watch Providers](./endpoints/watch-providers.md) | `movie`, `tv`, `regions` |
| `tmdb.account` | [Account](./endpoints/account.md) | `details`, `favoriteMovies`, `watchlistMovies`, `ratedTv` |
| `tmdb.authentication` | [Authentication Endpoint](./endpoints/authentication.md) | `validateKey`, `createGuestSession`, `createRequestToken`, `createSession` |
| `tmdb.lists` | [Lists](./endpoints/lists.md) | `details`, `create`, `addMovie`, `removeMovie`, `clear`, `delete` |
| `tmdb.collections` | [Collections](./endpoints/collections.md) | `details`, `images`, `translations` |
| `tmdb.companies` | [Companies](./endpoints/companies.md) | `details`, `alternativeNames`, `images` |
| `tmdb.networks` | [Networks](./endpoints/networks.md) | `details`, `alternativeNames`, `images` |
| `tmdb.genre` | [Genre](./endpoints/genre.md) | `movies`, `tv` |
| `tmdb.keywords` | [Keywords](./endpoints/keywords.md) | `details`, `belongingMovies` |
| `tmdb.find` | [Find](./endpoints/find.md) | `byId` |
| `tmdb.configuration` | [Configuration](./endpoints/configuration.md) | `getCurrent`, `countries`, `languages`, `timezones` |
| `tmdb.certification` | [Certifications](./endpoints/certification.md) | `movies`, `tv` |
| `tmdb.changes` | [Changes](./endpoints/changes.md) | `movies`, `tv`, `person` |
| `tmdb.credits` | [Credits](./endpoints/credits.md) | `getById` |
| `tmdb.review` | [Review](./endpoints/review.md) | `details` |
| `tmdb.guestSessions` | [Guest Sessions](./endpoints/guest-sessions.md) | `ratedMovies`, `ratedTv`, `ratedTvEpisodes` |
| `tmdb.tvEpisodeGroups` | [TV Episode Groups](./endpoints/tv-episode-groups.md) | `details` |

## API Shape

Endpoint methods follow the same argument order:

```typescript
tmdb.endpoint.method(requiredIds, options, requestConfig);
```

- Required IDs come first, for example `movieId` or `{ tvShowID, seasonNumber }`.
- TMDB query/body options come next, for example `{ language: "en-US", page: 2 }`.
- Per-request transport options are last, for example `{ timeoutMs: 5_000, signal }`.

Some detail methods accept `append_to_response` keys before language:

```typescript
const show = await tmdb.tvShows.details(1396, ["credits", "videos"], "en-US");
```

Some write methods require a TMDB `session_id` or `guest_session_id`; the endpoint docs call that out where it applies.

# @api-wrappers/tmdb-wrapper

A TypeScript wrapper for [The Movie Database (TMDB) API v3](https://developers.themoviedb.org/3).

## Installation

```bash
npm install @api-wrappers/tmdb-wrapper
yarn add @api-wrappers/tmdb-wrapper
pnpm add @api-wrappers/tmdb-wrapper
bun add @api-wrappers/tmdb-wrapper
```

## Quick Start

```typescript
import { TMDB } from '@api-wrappers/tmdb-wrapper';

const tmdb = new TMDB('YOUR_READ_ACCESS_TOKEN');

const popular = await tmdb.movies.popular();
console.log(popular.results);
```

Get your read access token from [TMDB API Settings](https://www.themoviedb.org/settings/api).

## Endpoints

| Property | Class | Description |
|---|---|---|
| `tmdb.account` | `AccountEndpoint` | Account details |
| `tmdb.certification` | `CertificationEndpoint` | Movie/TV certifications |
| `tmdb.changes` | `ChangeEndpoint` | Database changes |
| `tmdb.collections` | `CollectionsEndpoint` | Movie collections |
| `tmdb.companies` | `CompaniesEndpoint` | Production companies |
| `tmdb.configuration` | `ConfigurationEndpoint` | API configuration |
| `tmdb.credits` | `CreditsEndpoint` | Credit details by ID |
| `tmdb.discover` | `DiscoverEndpoint` | Discovery with filters |
| `tmdb.find` | `FindEndpoint` | Find by external ID |
| `tmdb.genre` | `GenreEndpoint` | Genre lists |
| `tmdb.keywords` | `KeywordsEndpoint` | Keyword details |
| `tmdb.movies` | `MoviesEndpoint` | Movies |
| `tmdb.networks` | `NetworksEndpoint` | TV networks |
| `tmdb.people` | `PeopleEndpoint` | People |
| `tmdb.review` | `ReviewEndpoint` | Review details |
| `tmdb.search` | `SearchEndpoint` | Search |
| `tmdb.trending` | `TrendingEndpoint` | Trending content |
| `tmdb.tvEpisodes` | `TvEpisodesEndpoint` | TV episodes |
| `tmdb.tvSeasons` | `TvSeasonsEndpoint` | TV seasons |
| `tmdb.tvShows` | `TvShowsEndpoint` | TV shows |
| `tmdb.watchProviders` | `WatchProvidersEndpoint` | Streaming providers |

## Documentation

- [Authentication](./authentication.md)
- [Error Handling](./error-handling.md)
- [Image Utilities](./image-utilities.md)
- [Request Config](./request-config.md)
- **Endpoints**
  - [Movies](./endpoints/movies.md)
  - [TV Shows](./endpoints/tv-shows.md)
  - [TV Seasons](./endpoints/tv-seasons.md)
  - [TV Episodes](./endpoints/tv-episodes.md)
  - [People](./endpoints/people.md)
  - [Search](./endpoints/search.md)
  - [Discover](./endpoints/discover.md)
  - [Trending](./endpoints/trending.md)
  - [Watch Providers](./endpoints/watch-providers.md)
  - [Companies](./endpoints/companies.md)
  - [Networks](./endpoints/networks.md)
  - [Collections](./endpoints/collections.md)
  - [Genre](./endpoints/genre.md)
  - [Keywords](./endpoints/keywords.md)
  - [Find](./endpoints/find.md)
  - [Certifications](./endpoints/certification.md)
  - [Changes](./endpoints/changes.md)
  - [Configuration](./endpoints/configuration.md)
  - [Credits](./endpoints/credits.md)
  - [Account](./endpoints/account.md)
  - [Review](./endpoints/review.md)

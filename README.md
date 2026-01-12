<h1 align="center">
  TMDB Api Wrapper
</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@tdanks2000/tmdb-wrapper"><img alt="npm version" src="https://img.shields.io/npm/v/@tdanks2000/tmdb-wrapper"></a>
  <a href="https://github.com/tdanks2000/tmdb-wrapper/blob/master/LICENSE"><img alt="license" src="https://img.shields.io/npm/l/@tdanks2000/tmdb-wrapper"></a>
  <a href="https://github.com/tdanks2000/tmdb-wrapper"><img alt="GitHub stars" src="https://img.shields.io/github/stars/tdanks2000/tmdb-wrapper?style=social"></a>
</p>

<br />

<p align="center">
  <b>A powerful and easy-to-use TypeScript wrapper for The Movie Database (TMDb) API</b>
</p>

The TMDB Api Wrapper simplifies the process of making API requests to The Movie Database (TMDb), a comprehensive database for movies and TV shows. It encapsulates functionality related to various API endpoints, such as account, certifications, changes, collections, configuration, credits, discover, find, genres, keywords, movies, people, reviews, search, trending, TV episodes, TV seasons, TV shows, companies, networks, and watch providers. With this wrapper, developers can quickly integrate TMDB functionality into their TypeScript projects.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Authentication](#authentication)
- [Functionality](#functionality)
  - [Movies](#movies)
  - [TV Shows](#tv-shows)
  - [People](#people)
  - [Companies](#companies)
  - [Networks](#networks)
  - [Watch Providers](#watch-providers)
  - [Other Endpoints](#other-endpoints)
- [Image Handling](#image-handling)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the TMDB TypeScript Wrapper, follow these steps:

1. Run the following command in your project directory:

```typescript
// npm
npm install @tdanks2000/tmdb-wrapper
// yarn
yarn add @tdanks2000/tmdb-wrapper
// pnpm
pnpm i @tdanks2000/tmdb-wrapper
// bun
bun add @tdanks2000/tmdb-wrapper
```

## Usage

To use the TMDB TypeScript API Wrapper in your TypeScript project, import the necessary classes and functions:

```typescript
import { TMDB } from '@tdanks2000/tmdb-wrapper';
```

Then, create an instance of the TMDB class, optionally providing an access token. Access tokens can be obtained from [TMDb API Settings](https://www.themoviedb.org/settings/api) under read access token.

```typescript
const tmdb = new TMDB('YOUR_ACCESS_TOKEN');
```

You can now use the `tmdb` object to access various functionalities of the TMDB API. The wrapper provides access to all major TMDB API endpoints including Movies, TV Shows, People, Companies, Networks, and Watch Providers.

## Authentication

To use the TMDB API, you need to obtain an API key from [TMDb API Settings](https://www.themoviedb.org/settings/api). The wrapper supports both API key authentication and read access token authentication.

```typescript
// Using API key
const tmdb = new TMDB({ apiKey: 'YOUR_API_KEY' });

// Using read access token (recommended)
const tmdb = new TMDB('YOUR_ACCESS_TOKEN');
```

## Functionality

The TMDB Api Wrapper provides access to the following endpoints:

### Movies

Access comprehensive information about movies, including details, credits, reviews, and more.

```typescript
// Get popular movies
const popularMovies = await tmdb.movies.getPopular();

// Get movie details
const movieDetails = await tmdb.movies.getDetails(550); // Fight Club

// Get movie credits
const movieCredits = await tmdb.movies.getCredits(550);
```

### TV Shows

Retrieve information about TV shows, seasons, and episodes.

```typescript
// Get popular TV shows
const popularShows = await tmdb.tvShows.getPopular();

// Get TV show details
const showDetails = await tmdb.tvShows.getDetails(1396); // Breaking Bad

// Get season details
const seasonDetails = await tmdb.tvSeasons.getDetails(1396, 1);

// Get episode details
const episodeDetails = await tmdb.tvEpisodes.getDetails(1396, 1, 1);
```

### People

Access information about actors, directors, and other people involved in movies and TV shows.

```typescript
// Get popular people
const popularPeople = await tmdb.people.getPopular();

// Get person details
const personDetails = await tmdb.people.getDetails(287); // Brad Pitt

// Get person movie credits
const personMovieCredits = await tmdb.people.getMovieCredits(287);
```

### Companies

Retrieve information about production companies.

```typescript
// Get company details
const companyDetails = await tmdb.companies.getDetails(1); // Lucasfilm

// Get company movies
const companyMovies = await tmdb.companies.getMovies(1);
```

### Networks

Access information about TV networks.

```typescript
// Get network details
const networkDetails = await tmdb.networks.getDetails(213); // Netflix

// Get alternative names
const alternativeNames = await tmdb.networks.getAlternativeNames(213);
```

### Watch Providers

Retrieve information about streaming platforms and availability.

```typescript
// Get available regions
const regions = await tmdb.watchProviders.getAvailableRegions();

// Get movie providers
const movieProviders = await tmdb.watchProviders.getMovieProviders();

// Get TV providers
const tvProviders = await tmdb.watchProviders.getTvProviders();
```

### Other Endpoints

The wrapper also provides access to these additional endpoints:

- **Account**: Manage account details and settings
- **Certifications**: Retrieve certification information for movies and TV shows
- **Changes**: Get information about changes to the database
- **Collections**: Access information about movie collections
- **Configuration**: Retrieve configuration information for the API
- **Credits**: Get credits information for movies and TV shows
- **Discover**: Discover movies and TV shows based on various criteria
- **Find**: Find movies and TV shows by external IDs
- **Genres**: Retrieve information about movie and TV show genres
- **Keywords**: Access information about movie keywords
- **Reviews**: Get reviews for movies and TV shows
- **Search**: Search for movies, TV shows, and people
- **Trending**: Get trending movies and TV shows

## Image Handling

## Image Handling

The wrapper includes utilities to reliably construct TMDB image URLs, plus a convenience helper for TMDB `Image` objects.

```typescript
import {
	formImage,
	getFullImagePath,
	ImageSizes,
	ImageFormats,
} from "@tdanks2000/tmdb-wrapper";
```

### `getFullImagePath(...)`

```typescript
getFullImagePath(
  baseUrl: string,      // e.g. "https://image.tmdb.org/t/p/"
  fileSize: string,     // e.g. ImageSizes.W500 or "w780"
  imagePath: string,    // e.g. "/abc123" or "/abc123.jpg"
  format?: string       // optional: ImageFormats.JPG / PNG / SVG
): string
```

Notes:
- `imagePath` can be with or without a leading `/` (both work).
- If `imagePath` is already an absolute URL (`https://...`), it’s returned unchanged.
- If you provide `format`, the extension is appended/replaced safely.
- If you omit `format`, the original path is preserved (no forced default extension).

### `formImage(image, fileSize, format?)`

`formImage` is a small helper that reads `file_path` from a TMDB `Image` object and returns a ready-to-use URL. If the image object doesn’t include a `file_path`, it returns `undefined`.

```typescript
formImage(
  image: Image,
  fileSize: ImageSizes,
  format?: ImageFormats
): string | undefined
```

### Examples

Poster path without extension (add one via `format`):

```typescript
const posterUrl = getFullImagePath(
	"https://image.tmdb.org/t/p/",
	ImageSizes.W500,
	"/wwemzKWzjKYJFfCeiB57q3r4Bcm",
	ImageFormats.JPG,
);
// https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.jpg
```

Profile path that already includes an extension (no need to pass `format`):

```typescript
const profileUrl = getFullImagePath(
	"https://image.tmdb.org/t/p/",
	ImageSizes.W185,
	"/5XBzD5WuTyVQZeS4VI25z2moMeY.jpg",
);
// https://image.tmdb.org/t/p/w185/5XBzD5WuTyVQZeS4VI25z2moMeY.jpg
```

Using `formImage` with a TMDB response image object:

```typescript
const images = await tmdb.movies.getImages(550);
const poster = images.posters[0];

const posterUrl = formImage(poster, ImageSizes.W500);
// e.g. https://image.tmdb.org/t/p/w500/xxxxx.jpg
```

Override the output extension (append/replace) with `format`:

```typescript
const posterPngUrl = formImage(poster, ImageSizes.W500, ImageFormats.PNG);
```

### Sizes & formats

This package exports common presets:

- **Sizes**: `ImageSizes.ORIGINAL`, `W500`, `W300`, `W185`, `W92`, `H632`
- **Formats**: `ImageFormats.JPG`, `PNG`, `SVG`

TMDB can support additional sizes depending on their configuration; you can also pass any valid TMDB size string directly (e.g. `"w780"`, `"w1280"`).

### Searching for Content

```typescript
// Search for movies
const movieResults = await tmdb.search.searchMovies('Inception');

// Search for TV shows
const tvResults = await tmdb.search.searchTvShows('Breaking Bad');

// Search for people
const peopleResults = await tmdb.search.searchPeople('Brad Pitt');

// Multi-search (movies, TV shows, and people)
const multiResults = await tmdb.search.searchMulti('Marvel');
```

### Getting Trending Content

```typescript
// Get trending movies (day)
const trendingMoviesDay = await tmdb.trending.getTrendingMovies('day');

// Get trending TV shows (week)
const trendingTvWeek = await tmdb.trending.getTrendingTvShows('week');

// Get trending people (day)
const trendingPeopleDay = await tmdb.trending.getTrendingPeople('day');

// Get all trending content (week)
const trendingAllWeek = await tmdb.trending.getTrendingAll('week');
```

### Using Discover

```typescript
// Discover movies by genre
const actionMovies = await tmdb.discover.discoverMovies({
  with_genres: '28', // Action genre ID
  sort_by: 'popularity.desc'
});

// Discover TV shows by network
const netflixShows = await tmdb.discover.discoverTvShows({
  with_networks: '213', // Netflix network ID
  sort_by: 'vote_average.desc'
});
```

## Troubleshooting

### Rate Limiting

TMDb API has rate limiting in place. If you encounter rate limiting issues, consider implementing a delay between requests or using a caching mechanism.

```typescript
// Example of implementing a delay between requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithDelay() {
  const result1 = await tmdb.movies.getPopular();
  await delay(250); // Wait 250ms between requests
  const result2 = await tmdb.tvShows.getPopular();
  return { movies: result1, tvShows: result2 };
}
```

### Authentication Issues

If you're experiencing authentication issues, ensure your API key or access token is valid and correctly formatted.

```typescript
// Check if your token is valid
try {
  const accountDetails = await tmdb.account.getDetails();
  console.log('Authentication successful:', accountDetails);
} catch (error) {
  console.error('Authentication failed:', error);
}
```

## API Reference

For a complete list of available methods and parameters, please refer to the [TMDB API Documentation](https://developers.themoviedb.org/3/getting-started/introduction).

This wrapper aims to provide a 1:1 mapping to the official TMDB API, with TypeScript types for improved developer experience.

## Contributing

Contributions are welcome! For bug reports, feature requests, or any other questions, please open an issue on the [GitHub repository](https://github.com/tdanks2000/tmdb-wrapper).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/tdanks2000/tmdb-wrapper/blob/main/LICENSE) file for details.

<br/>

# ❤️

<p align="center">
<a target="_blank" href="https://tdanks.com/mental-health/quote">
❤️ Reminder that <strong><i>you are great, you are enough, and your presence is valued.</i></strong> If you are struggling with your mental health, please reach out to someone you love and consult a professional. You are not alone. ❤️
</a>
</p>

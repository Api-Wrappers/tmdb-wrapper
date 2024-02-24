<h1 align="center">
  TMDB Api Wrapper
</h1>

The TMDB Api Wrapper simplifies the process of making API requests to The Movie Database (TMDb), a comprehensive database for movies and TV shows. It encapsulates functionality related to various API endpoints, such as account, certifications, changes, collections, configuration, credits, discover, find, genres, keywords, movies, people, reviews, search, trending, TV episodes, TV seasons, and TV shows. With this wrapper, developers can quickly integrate TMDB functionality into their TypeScript projects.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Authentication](#authentication)
- [Functionality](#functionality)
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

You can now use the `tmdb` object to access various functionalities of the TMDB API. See the next section for details on available functionality.

## Functionality

The TMDB Api Wrapper provides the following functionality:

### Account

- Manage account details and settings.

### Certifications

- Retrieve certification information for movies.

### Changes

- Get information about changes to the database.

### Collections

- Access information about movie collections.

### Configuration

- Retrieve configuration information for the API.

### Credits

- Get credits information for movies and TV shows.

### Discover

- Discover movies and TV shows based on various criteria.

### Find

- Find movies and TV shows by external IDs.

### Genres

- Retrieve information about movie and TV show genres.

### Keywords

- Access information about movie keywords.

### Movies

- Access information about movies.

### People

- Retrieve information about people involved in movies and TV shows.

### Reviews

- Get reviews for movies and TV shows.

### Search

- Search for movies, TV shows, and people.

### Trending

- Get trending movies and TV shows.

### TV Episodes

- Access information about TV show episodes.

### TV Seasons

- Access information about TV show seasons.

### TV Shows

- Access information about TV shows.

## Contributing

Contributions are welcome! For bug reports, feature requests, or any other questions, please open an issue on the [GitHub repository](https://github.com/tdanks2000/tmdb-wrapper).

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/tdanks2000/tmdb-wrapper/blob/main/LICENSE) file for details.

<br/>

# ❤️

Reminder that <strong><i>you are great, you are enough, and your presence is valued.</i></strong> If you are struggling with your mental health, please reach out to someone you love and consult a professional. You are not alone.

/**
 * Basic usage example for @api-wrappers/tmdb-wrapper
 *
 * Prerequisites:
 *   1. Get a TMDB read access token from https://www.themoviedb.org/settings/api
 *   2. Set the TMDB_ACCESS_TOKEN environment variable
 *
 * Run:
 *   bun examples/basic-usage.ts
 */

import { TMDB } from "../src/index.ts";

const token = process.env.TMDB_ACCESS_TOKEN;
if (!token) {
	console.error("Set the TMDB_ACCESS_TOKEN environment variable first.");
	process.exit(1);
}

const tmdb = new TMDB(token);

// Fetch popular movies
const popular = await tmdb.movies.getPopular();
console.log("Popular movies:");
for (const movie of popular.results.slice(0, 5)) {
	console.log(` - ${movie.title} (${movie.release_date?.slice(0, 4)})`);
}

// Get details for Fight Club (id: 550)
const fightClub = await tmdb.movies.getDetails(550);
console.log(`\nFight Club overview: ${fightClub.overview}`);

// Search for a movie
const results = await tmdb.search.searchMovies("Inception");
console.log(`\nSearch results for "Inception":`);
for (const movie of results.results.slice(0, 3)) {
	console.log(` - ${movie.title} (${movie.release_date?.slice(0, 4)})`);
}

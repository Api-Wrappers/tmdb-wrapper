/**
 * Basic usage example for @api-wrappers/tmdb-wrapper.
 *
 * Prerequisites:
 *   1. Get a TMDB read access token from https://www.themoviedb.org/settings/api
 *   2. Set TMDB_ACCESS_TOKEN in your shell
 *
 * Run:
 *   bun examples/basic-usage.ts
 */

import { TMDB } from "../src/index.ts";

const token = process.env.TMDB_ACCESS_TOKEN;
if (!token) {
	console.error("Set TMDB_ACCESS_TOKEN before running this example.");
	process.exit(1);
}

const tmdb = new TMDB(token);

const popular = await tmdb.movies.popular({ page: 1, language: "en-US" });
console.log("Popular movies:");
for (const movie of popular.results.slice(0, 5)) {
	const year = movie.release_date?.slice(0, 4) || "unknown year";
	console.log(` - ${movie.title} (${year})`);
}

const fightClub = await tmdb.movies.details(550, ["credits", "videos"]);
console.log(`\n${fightClub.title}: ${fightClub.overview}`);
console.log("Top billed cast:");
for (const castMember of fightClub.credits.cast.slice(0, 5)) {
	console.log(` - ${castMember.name} as ${castMember.character}`);
}

const search = await tmdb.search.movies({
	query: "Inception",
	language: "en-US",
	include_adult: false,
});

console.log('\nSearch results for "Inception":');
for (const movie of search.results.slice(0, 3)) {
	const year = movie.release_date?.slice(0, 4) || "unknown year";
	console.log(` - ${movie.title} (${year})`);
}

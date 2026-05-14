/**
 * Search and discover example for @api-wrappers/tmdb-wrapper.
 *
 * Run:
 *   TMDB_ACCESS_TOKEN="YOUR_READ_ACCESS_TOKEN" bun examples/search-and-discover.ts
 */

import { TMDB } from "../src/index.ts";

const token = process.env.TMDB_ACCESS_TOKEN;
if (!token) {
	console.error("Set TMDB_ACCESS_TOKEN before running this example.");
	process.exit(1);
}

const tmdb = new TMDB(token);

const query = process.env.TMDB_QUERY || "Blade Runner";
const movieSearch = await tmdb.search.movies({
	query,
	include_adult: false,
	language: "en-US",
});

console.log(`Movie search for "${query}":`);
for (const movie of movieSearch.results.slice(0, 5)) {
	console.log(` - ${movie.title} (${movie.release_date?.slice(0, 4) || "n/a"})`);
}

const trending = await tmdb.trending.trending("movie", "week", {
	language: "en-US",
});

console.log("\nTrending movies this week:");
for (const movie of trending.results.slice(0, 5)) {
	console.log(` - ${movie.title}`);
}

const highlyRatedSciFi = await tmdb.discover.movie({
	with_genres: "878",
	"vote_count.gte": 1000,
	"vote_average.gte": 7.5,
	sort_by: "vote_average.desc",
	language: "en-US",
});

console.log("\nHighly rated science fiction movies:");
for (const movie of highlyRatedSciFi.results.slice(0, 5)) {
	console.log(` - ${movie.title} (${movie.vote_average.toFixed(1)})`);
}

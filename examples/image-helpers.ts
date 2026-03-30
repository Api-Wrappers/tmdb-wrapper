/**
 * Image helper example for @api-wrappers/tmdb-wrapper
 *
 * Demonstrates getFullImagePath and formImage utilities.
 *
 * Run:
 *   bun examples/image-helpers.ts
 */

import {
  ImageFormats,
  ImageSizes,
  TMDB,
  formImage,
  getFullImagePath,
} from "../src/index.ts";

const token = process.env.TMDB_ACCESS_TOKEN;
if (!token) {
	console.error("Set the TMDB_ACCESS_TOKEN environment variable first.");
	process.exit(1);
}

const tmdb = new TMDB(token);

// Build a URL manually
const posterUrl = getFullImagePath(
	"https://image.tmdb.org/t/p/",
	ImageSizes.W500,
	"/wwemzKWzjKYJFfCeiB57q3r4Bcm",
	ImageFormats.JPG,
);
console.log("Manual URL:", posterUrl);

// Use formImage with a real API response
const images = await tmdb.movies.images(550); // Fight Club
const firstPoster = images.posters[0];
if (firstPoster) {
	const url = formImage(firstPoster, ImageSizes.W500);
	console.log("First poster URL:", url);

	const pngUrl = formImage(firstPoster, ImageSizes.W500, ImageFormats.PNG);
	console.log("First poster PNG URL:", pngUrl);
}

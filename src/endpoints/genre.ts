import { BaseEndpoint, type Genres, type LanguageOption } from "../@types";
import { type RequestConfig, withQuery } from "../utils";

/**
 * Represents an endpoint for retrieving genre information for movies and TV
 * shows.
 */
export class GenreEndpoint extends BaseEndpoint {
	/**
	 * Retrieves genre information for movies asynchronously.
	 *
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @returns {Promise<Genres>} A Promise that resolves with the genre
	 * information for movies.
	 */
	movies(options?: LanguageOption, request?: RequestConfig): Promise<Genres> {
		return this.api.get<Genres>(
			"/genre/movie/list",
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves genre information for TV shows asynchronously.
	 *
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @returns {Promise<Genres>} A Promise that resolves with the genre
	 * information for TV shows.
	 */
	tv(options?: LanguageOption, request?: RequestConfig): Promise<Genres> {
		return this.api.get<Genres>("/genre/tv/list", withQuery(options, request));
	}
}

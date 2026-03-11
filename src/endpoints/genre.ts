import {
	BaseEndpoint,
	type Genres,
	type LanguageOption,
	type TokenType,
} from "../@types";

/**
 * Represents an endpoint for retrieving genre information for movies and TV
 * shows.
 */
export class GenreEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new GenreEndpoint instance.
	 *
	 * @param {TokenType} auth - The authentication configuration.
	 */
	constructor(protected readonly auth: TokenType) {
		super(auth);
	}

	/**
	 * Retrieves genre information for movies asynchronously.
	 *
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @returns {Promise<Genres>} A Promise that resolves with the genre
	 * information for movies.
	 */
	movies(options?: LanguageOption): Promise<Genres> {
		return this.api.get<Genres>("/genre/movie/list", { query: options });
	}

	/**
	 * Retrieves genre information for TV shows asynchronously.
	 *
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @returns {Promise<Genres>} A Promise that resolves with the genre
	 * information for TV shows.
	 */
	tv(options?: LanguageOption): Promise<Genres> {
		return this.api.get<Genres>("/genre/tv/list", { query: options });
	}
}

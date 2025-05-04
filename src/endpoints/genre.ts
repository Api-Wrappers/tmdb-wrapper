import { BaseEndpoint, Genres, LanguageOption, TokenType } from "../@types";

/**
 * Represents an endpoint for retrieving genre information for movies and TV shows.
 */
export class GenreEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new GenreEndpoint instance.
	 * @param {string} access_token - The access token used for authentication.
	 */
	constructor(protected readonly access_token: TokenType) {
		super(access_token);
	}

	/**
	 * Retrieves genre information for movies asynchronously.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the language.
	 * @returns {Promise<Genres>} A Promise that resolves with the genre information for movies.
	 */
	async movies(options?: LanguageOption): Promise<Genres> {
		return await this.api.get<Genres>(
			"/genre/movie/list",
			options as Record<string, unknown>,
		);
	}

	/**
	 * Retrieves genre information for TV shows asynchronously.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the language.
	 * @returns {Promise<Genres>} A Promise that resolves with the genre information for TV shows.
	 */
	async tv(options?: LanguageOption): Promise<Genres> {
		return await this.api.get<Genres>(
			"/genre/tv/list",
			options as Record<string, unknown>,
		);
	}
}

import {
	BaseEndpoint,
	BelongingMovies,
	Keyword,
	KeywordsOptions,
	TokenType,
} from "../@types";

const BASE_KEYWORD = "/keyword";

/**
 * Represents an endpoint for accessing keyword details and related movies.
 */
export class KeywordsEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new KeywordsEndpoint instance.
	 * @param {string} access_token - The access token used for authentication.
	 */
	constructor(protected readonly access_token: TokenType) {
		super(access_token);
	}

	/**
	 * Retrieves details of a specific keyword asynchronously.
	 * @param {number} keywordId - The ID of the keyword.
	 * @returns {Promise<Keyword>} A Promise that resolves with the details of the keyword.
	 */
	async details(keywordId: number): Promise<Keyword> {
		return await this.api.get<Keyword>(`${BASE_KEYWORD}/${keywordId}`);
	}

	/**
	 * Retrieves movies belonging to a specific keyword asynchronously.
	 * @param {number} keywordId - The ID of the keyword.
	 * @param {KeywordsOptions} [options] - Optional parameters for refining the search.
	 * @returns {Promise<BelongingMovies>} A Promise that resolves with the movies belonging to the keyword.
	 */
	async belongingMovies(
		keywordId: number,
		options?: KeywordsOptions,
	): Promise<BelongingMovies> {
		return await this.api.get<BelongingMovies>(
			`${BASE_KEYWORD}/${keywordId}/movies`,

			options as Record<string, unknown>,
		);
	}
}

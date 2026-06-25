import {
	BaseEndpoint,
	type BelongingMovies,
	type Keyword,
	type KeywordsOptions,
} from "../@types";
import { type RequestConfig, withQuery } from "../utils";

const BASE_KEYWORD = "/keyword";

/**
 * Represents an endpoint for accessing keyword details and related movies.
 */
export class KeywordsEndpoint extends BaseEndpoint {
	/**
	 * Retrieves details of a specific keyword asynchronously.
	 *
	 * @param {number} keywordId - The ID of the keyword.
	 * @returns {Promise<Keyword>} A Promise that resolves with the details of
	 * the keyword.
	 */
	details(keywordId: number, request?: RequestConfig): Promise<Keyword> {
		return this.api.get<Keyword>(`${BASE_KEYWORD}/${keywordId}`, request);
	}

	/**
	 * Retrieves movies belonging to a specific keyword asynchronously.
	 *
	 * @param {number} keywordId - The ID of the keyword.
	 * @param {KeywordsOptions} [options] - Optional parameters for refining the
	 * search.
	 * @returns {Promise<BelongingMovies>} A Promise that resolves with the
	 * movies belonging to the keyword.
	 */
	belongingMovies(
		keywordId: number,
		options?: KeywordsOptions,
		request?: RequestConfig,
	): Promise<BelongingMovies> {
		return this.api.get<BelongingMovies>(
			`${BASE_KEYWORD}/${keywordId}/movies`,
			withQuery(options, request),
		);
	}
}

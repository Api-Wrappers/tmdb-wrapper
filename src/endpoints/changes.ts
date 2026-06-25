import { BaseEndpoint, type ChangeOption, type MediaChanges } from "../@types";
import { type RequestConfig, withQuery } from "../utils";

/**
 * Represents an endpoint for retrieving changes in movies, TV shows, and persons.
 *
 * TMDB v3 reference:
 * - GET /movie/changes
 * - GET /tv/changes
 * - GET /person/changes
 */
export class ChangeEndpoint extends BaseEndpoint {
	/**
	 * Retrieves changes in movies asynchronously.
	 *
	 * TMDB: GET /movie/changes
	 *
	 * @param {ChangeOption} [options] - Optional parameters for filtering the changes.
	 * @returns {Promise<MediaChanges>} A Promise that resolves with the changes in movies.
	 */
	movies(
		options?: ChangeOption,
		request?: RequestConfig,
	): Promise<MediaChanges> {
		return this.api.get<MediaChanges>(
			"/movie/changes",
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves changes in TV shows asynchronously.
	 *
	 * TMDB: GET /tv/changes
	 *
	 * @param {ChangeOption} [options] - Optional parameters for filtering the changes.
	 * @returns {Promise<MediaChanges>} A Promise that resolves with the changes in TV shows.
	 */
	tv(options?: ChangeOption, request?: RequestConfig): Promise<MediaChanges> {
		return this.api.get<MediaChanges>(
			"/tv/changes",
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves changes related to persons asynchronously.
	 *
	 * TMDB: GET /person/changes
	 *
	 * @param {ChangeOption} [options] - Optional parameters for filtering the changes.
	 * @returns {Promise<MediaChanges>} A Promise that resolves with the changes related to persons.
	 */
	person(
		options?: ChangeOption,
		request?: RequestConfig,
	): Promise<MediaChanges> {
		return this.api.get<MediaChanges>(
			"/person/changes",
			withQuery(options, request),
		);
	}
}

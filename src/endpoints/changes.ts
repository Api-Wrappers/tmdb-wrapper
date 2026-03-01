import {
	BaseEndpoint,
	type ChangeOption,
	type MediaChanges,
	type TokenType,
} from "../@types";

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
	 * Constructs a new ChangeEndpoint instance.
	 *
	 * @param {TokenType} access_token - The access token used for authentication.
	 */
	constructor(protected readonly access_token: TokenType) {
		super(access_token);
	}

	/**
	 * Retrieves changes in movies asynchronously.
	 *
	 * TMDB: GET /movie/changes
	 *
	 * @param {ChangeOption} [options] - Optional parameters for filtering the changes.
	 * @returns {Promise<MediaChanges>} A Promise that resolves with the changes in movies.
	 */
	movies(options?: ChangeOption): Promise<MediaChanges> {
		return this.api.get<MediaChanges>(
			"/movie/changes",
			options as Record<string, unknown>,
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
	tv(options?: ChangeOption): Promise<MediaChanges> {
		return this.api.get<MediaChanges>(
			"/tv/changes",
			options as Record<string, unknown>,
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
	person(options?: ChangeOption): Promise<MediaChanges> {
		return this.api.get<MediaChanges>(
			"/person/changes",
			options as Record<string, unknown>,
		);
	}
}

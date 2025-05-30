import {
	BaseEndpoint,
	type ChangeOption,
	type MediaChanges,
	type TokenType,
} from "../@types";

/**
 * Represents an endpoint for retrieving changes in movies, TV shows, and persons.
 */
export class ChangeEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new ChangeEndpoint instance.
	 * @param {string} access_token - The access token used for authentication.
	 */
	constructor(protected readonly access_token: TokenType) {
		super(access_token);
	}

	/**
	 * Retrieves changes in movies asynchronously.
	 * @param {ChangeOption} [options] - Optional parameters for filtering the changes.
	 * @returns {Promise<MediaChanges>} A Promise that resolves with the changes in movies.
	 */
	async movies(options?: ChangeOption): Promise<MediaChanges> {
		return await this.api.get<MediaChanges>(
			"/movie/changes",
			options as Record<string, unknown>,
		);
	}

	/**
	 * Retrieves changes in TV shows asynchronously.
	 * @param {ChangeOption} [options] - Optional parameters for filtering the changes.
	 * @returns {Promise<MediaChanges>} A Promise that resolves with the changes in TV shows.
	 */
	async tv(options?: ChangeOption): Promise<MediaChanges> {
		return await this.api.get<MediaChanges>(
			"/tv/changes",
			options as Record<string, unknown>,
		);
	}

	/**
	 * Retrieves changes related to persons asynchronously.
	 * @param {ChangeOption} [options] - Optional parameters for filtering the changes.
	 * @returns {Promise<MediaChanges>} A Promise that resolves with the changes related to persons.
	 */
	async person(options?: ChangeOption): Promise<MediaChanges> {
		return await this.api.get<MediaChanges>(
			"/person/change",
			options as Record<string, unknown>,
		);
	}
}

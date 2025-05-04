import {
	BaseEndpoint,
	ExternalIdOptions,
	FindResult,
	TokenType,
} from "../@types";

/**
 * Represents an endpoint for finding media by external ID.
 */
export class FindEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new FindEndpoint instance.
	 * @param {string} access_token - The access token used for authentication.
	 */
	constructor(protected readonly access_token: TokenType) {
		super(access_token);
	}

	/**
	 * Retrieves media by external ID asynchronously.
	 * @param {string} externalId - The external ID of the media.
	 * @param {ExternalIdOptions} options - Options for finding media by external ID.
	 * @returns {Promise<FindResult>} A Promise that resolves with the result of the find operation.
	 */
	async byId(
		externalId: string,
		options: ExternalIdOptions,
	): Promise<FindResult> {
		return await this.api.get<FindResult>(
			`/find/${externalId}`,
			options as unknown as Record<string, unknown>,
		);
	}
}

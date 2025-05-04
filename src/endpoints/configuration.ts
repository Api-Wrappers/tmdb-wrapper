import { BaseEndpoint, Configuration, TokenType } from "../@types";

/**
 * Represents an endpoint for retrieving current system configuration.
 */
export class ConfigurationEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new ConfigurationEndpoint instance.
	 * @param {string} access_token - The access token used for authentication.
	 */
	constructor(protected readonly access_token: TokenType) {
		super(access_token);
	}

	/**
	 * Retrieves the current system configuration asynchronously.
	 * @returns {Promise<Configuration>} A Promise that resolves with the current system configuration.
	 */
	async getCurrent(): Promise<Configuration> {
		return await this.api.get<Configuration>(`/configuration`);
	}
}

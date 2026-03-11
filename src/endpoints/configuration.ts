import { BaseEndpoint, type Configuration, type TokenType } from "../@types";

/**
 * Represents an endpoint for retrieving current system configuration.
 */
export class ConfigurationEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new ConfigurationEndpoint instance.
	 *
	 * @param {TokenType} auth - The authentication configuration.
	 */
	constructor(protected readonly auth: TokenType) {
		super(auth);
	}

	/**
	 * Retrieves the current system configuration asynchronously.
	 *
	 * @returns {Promise<Configuration>} A Promise that resolves with the current
	 * system configuration.
	 */
	getCurrent(): Promise<Configuration> {
		return this.api.get<Configuration>("/configuration");
	}
}

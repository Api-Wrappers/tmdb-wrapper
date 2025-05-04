import {
	BaseEndpoint,
	TokenType,
	WatchProviders,
	WatchRegionsResponse,
} from "../@types";

/**
 * Represents an endpoint for accessing watch provider information.
 */
export class WatchProvidersEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new WatchProvidersEndpoint instance.
	 * @param {string} access_token - The access token used for authentication.
	 */
	constructor(protected readonly access_token: TokenType) {
		super(access_token);
	}

	/**
	 * Retrieves a list of all available watch providers (streaming services).
	 * @returns {Promise<WatchProviders>} A Promise that resolves with the list of watch providers.
	 */
	async available(): Promise<WatchProviders> {
		return await this.api.get<WatchProviders>("/watch/providers/movie");
	}

	/**
	 * Retrieves a list of available regions for watch providers.
	 * @returns {Promise<WatchRegionsResponse>} A Promise that resolves with the list of available regions.
	 */
	async regions(): Promise<WatchRegionsResponse> {
		return await this.api.get<WatchRegionsResponse>("/watch/providers/regions");
	}

	/**
	 * Retrieves a list of watch providers for movies.
	 * @returns {Promise<WatchProviders>} A Promise that resolves with the list of movie watch providers.
	 */
	async movie(): Promise<WatchProviders> {
		return await this.api.get<WatchProviders>("/watch/providers/movie");
	}

	/**
	 * Retrieves a list of watch providers for TV shows.
	 * @returns {Promise<WatchProviders>} A Promise that resolves with the list of TV watch providers.
	 */
	async tv(): Promise<WatchProviders> {
		return await this.api.get<WatchProviders>("/watch/providers/tv");
	}
}

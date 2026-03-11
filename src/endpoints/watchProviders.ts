import {
	BaseEndpoint,
	type TokenType,
	type WatchProviderListResponse,
	type WatchRegionsResponse,
} from "../@types";

/**
 * Represents an endpoint for accessing watch provider information.
 */
export class WatchProvidersEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new WatchProvidersEndpoint instance.
	 *
	 * @param {TokenType} access_token - The access token used for authentication.
	 */
	constructor(protected readonly access_token: TokenType) {
		super(access_token);
	}

	/**
	 * Retrieves a list of watch providers for movies.
	 *
	 * @returns {Promise<WatchProviderListResponse>} A Promise that resolves with
	 * the list of movie watch providers.
	 */
	movie(): Promise<WatchProviderListResponse> {
		return this.api.get<WatchProviderListResponse>("/watch/providers/movie");
	}

	/**
	 * Retrieves a list of watch providers for TV shows.
	 *
	 * @returns {Promise<WatchProviderListResponse>} A Promise that resolves with
	 * the list of TV watch providers.
	 */
	tv(): Promise<WatchProviderListResponse> {
		return this.api.get<WatchProviderListResponse>("/watch/providers/tv");
	}

	/**
	 * Retrieves a list of available regions for watch providers.
	 *
	 * @returns {Promise<WatchRegionsResponse>} A Promise that resolves with the
	 * list of available regions.
	 */
	regions(): Promise<WatchRegionsResponse> {
		return this.api.get<WatchRegionsResponse>("/watch/providers/regions");
	}
}

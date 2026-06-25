import {
	BaseEndpoint,
	type WatchProviderListResponse,
	type WatchRegionsResponse,
} from "../@types";
import type { RequestConfig } from "../utils";

/**
 * Represents an endpoint for accessing watch provider information.
 */
export class WatchProvidersEndpoint extends BaseEndpoint {
	/**
	 * Retrieves a list of watch providers for movies.
	 *
	 * @returns {Promise<WatchProviderListResponse>} A Promise that resolves with
	 * the list of movie watch providers.
	 */
	movie(request?: RequestConfig): Promise<WatchProviderListResponse> {
		return this.api.get<WatchProviderListResponse>(
			"/watch/providers/movie",
			request,
		);
	}

	/**
	 * Retrieves a list of watch providers for TV shows.
	 *
	 * @returns {Promise<WatchProviderListResponse>} A Promise that resolves with
	 * the list of TV watch providers.
	 */
	tv(request?: RequestConfig): Promise<WatchProviderListResponse> {
		return this.api.get<WatchProviderListResponse>(
			"/watch/providers/tv",
			request,
		);
	}

	/**
	 * Retrieves a list of available regions for watch providers.
	 *
	 * @returns {Promise<WatchRegionsResponse>} A Promise that resolves with the
	 * list of available regions.
	 */
	regions(request?: RequestConfig): Promise<WatchRegionsResponse> {
		return this.api.get<WatchRegionsResponse>(
			"/watch/providers/regions",
			request,
		);
	}
}

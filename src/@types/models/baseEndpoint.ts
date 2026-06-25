import type { TMDBApiClient } from "../../client";

/**
 * Base class for all TMDB API endpoints.
 *
 * Provides a configured api-core client instance to subclasses.
 */
export class BaseEndpoint {
	/**
	 * Low-level HTTP client wrapper used by all endpoints.
	 */
	protected readonly api: TMDBApiClient;

	/**
	 * Create a new endpoint instance.
	 *
	 * @param {TMDBApiClient} api - Shared TMDB API client instance.
	 */
	constructor(api: TMDBApiClient) {
		this.api = api;
	}
}

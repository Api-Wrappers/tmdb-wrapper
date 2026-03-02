import { API } from "../../utils";
import type { TokenType } from "../types";

/**
 * Base class for all TMDB API endpoints.
 *
 * Provides a configured {@link API} client instance to subclasses.
 */
export class BaseEndpoint {
	/**
	 * Low-level HTTP client wrapper used by all endpoints.
	 */
	protected readonly api: API;

	/**
	 * Create a new endpoint instance.
	 *
	 * @param {TokenType} auth - Authentication information.
	 * - If a string: treated as a v4 API Read Access Token (Bearer token).
	 * - If an object: can include an API key and/or access token.
	 */
	constructor(protected readonly auth: TokenType) {
		this.api = new API(auth);
	}
}

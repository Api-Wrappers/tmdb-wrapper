import { BaseEndpoint, type Certifications } from "../@types";
import type { RequestConfig } from "../utils";

/**
 * Represents an endpoint for retrieving certifications for movies and TV shows.
 *
 * TMDB v3 reference:
 * - GET /certification/movie/list
 * - GET /certification/tv/list
 */
export class CertificationEndpoint extends BaseEndpoint {
	/**
	 * Retrieves certifications for movies asynchronously.
	 *
	 * TMDB: GET /certification/movie/list
	 *
	 * @returns {Promise<Certifications>} A Promise that resolves with the certifications for movies.
	 */
	movies(request?: RequestConfig): Promise<Certifications> {
		return this.api.get<Certifications>("/certification/movie/list", request);
	}

	/**
	 * Retrieves certifications for TV shows asynchronously.
	 *
	 * TMDB: GET /certification/tv/list
	 *
	 * @returns {Promise<Certifications>} A Promise that resolves with the certifications for TV shows.
	 */
	tv(request?: RequestConfig): Promise<Certifications> {
		return this.api.get<Certifications>("/certification/tv/list", request);
	}
}

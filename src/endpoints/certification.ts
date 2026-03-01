import { BaseEndpoint, type Certifications, type TokenType } from "../@types";

/**
 * Represents an endpoint for retrieving certifications for movies and TV shows.
 *
 * TMDB v3 reference:
 * - GET /certification/movie/list
 * - GET /certification/tv/list
 */
export class CertificationEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new CertificationEndpoint instance.
	 *
	 * @param {TokenType} access_token - The access token used for authentication.
	 */
	constructor(protected readonly access_token: TokenType) {
		super(access_token);
	}

	/**
	 * Retrieves certifications for movies asynchronously.
	 *
	 * TMDB: GET /certification/movie/list
	 *
	 * @returns {Promise<Certifications>} A Promise that resolves with the certifications for movies.
	 */
	movies(): Promise<Certifications> {
		return this.api.get<Certifications>("/certification/movie/list");
	}

	/**
	 * Retrieves certifications for TV shows asynchronously.
	 *
	 * TMDB: GET /certification/tv/list
	 *
	 * @returns {Promise<Certifications>} A Promise that resolves with the certifications for TV shows.
	 */
	tv(): Promise<Certifications> {
		return this.api.get<Certifications>("/certification/tv/list");
	}
}

import { BaseEndpoint, type Certifications, type TokenType } from "../@types";

/**
 * Represents an endpoint for retrieving certifications for movies and TV shows.
 */
export class CertificationEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new CertificationEndpoint instance.
	 * @param {string} access_token - The access token used for authentication.
	 */
	constructor(protected readonly access_token: TokenType) {
		super(access_token);
	}

	/**
	 * Retrieves certifications for movies asynchronously.
	 * @returns {Promise<Certifications>} A Promise that resolves with the certifications for movies.
	 */
	async movies(): Promise<Certifications> {
		return await this.api.get<Certifications>("/certification/movie/list");
	}

	/**
	 * Retrieves certifications for TV shows asynchronously.
	 * @returns {Promise<Certifications>} A Promise that resolves with the certifications for TV shows.
	 */
	async tv(): Promise<Certifications> {
		return await this.api.get<Certifications>("/certification/tv/list");
	}
}

import { BaseEndpoint, ReviewDetails, TokenType } from "../@types";

/**
 * Represents an endpoint for accessing review details.
 */
export class ReviewEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new ReviewEndpoint instance.
	 * @param {string} access_token - The access token used for authentication.
	 */
	constructor(protected readonly access_token: TokenType) {
		super(access_token);
	}

	/**
	 * Retrieves details of a specific review asynchronously.
	 * @param {string} id - The ID of the review.
	 * @returns {Promise<ReviewDetails>} A Promise that resolves with the details of the review.
	 */
	async details(id: string): Promise<ReviewDetails> {
		return await this.api.get<ReviewDetails>(`/review/${id}`);
	}
}

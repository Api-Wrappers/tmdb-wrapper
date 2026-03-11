import { BaseEndpoint, type ReviewDetails, type TokenType } from "../@types";

/**
 * Represents an endpoint for accessing review details.
 */
export class ReviewEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new ReviewEndpoint instance.
	 *
	 * @param {TokenType} auth - The authentication configuration.
	 */
	constructor(protected readonly auth: TokenType) {
		super(auth);
	}

	/**
	 * Retrieves details of a specific review asynchronously.
	 *
	 * @param {string} id - The ID of the review.
	 * @returns {Promise<ReviewDetails>} A Promise that resolves with the details
	 * of the review.
	 */
	details(id: string): Promise<ReviewDetails> {
		return this.api.get<ReviewDetails>(`/review/${id}`);
	}
}

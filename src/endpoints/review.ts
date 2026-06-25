import { BaseEndpoint, type ReviewDetails } from "../@types";
import type { RequestConfig } from "../utils";

/**
 * Represents an endpoint for accessing review details.
 */
export class ReviewEndpoint extends BaseEndpoint {
	/**
	 * Retrieves details of a specific review asynchronously.
	 *
	 * @param {string} id - The ID of the review.
	 * @returns {Promise<ReviewDetails>} A Promise that resolves with the details
	 * of the review.
	 */
	details(id: string, request?: RequestConfig): Promise<ReviewDetails> {
		return this.api.get<ReviewDetails>(`/review/${id}`, request);
	}
}

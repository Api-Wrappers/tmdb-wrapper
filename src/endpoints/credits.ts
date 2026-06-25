import { BaseEndpoint, type CreditResponse } from "../@types";
import type { RequestConfig } from "../utils";

/**
 * Represents an endpoint for retrieving credit details.
 */
export class CreditsEndpoint extends BaseEndpoint {
	/**
	 * Retrieves credit details by ID asynchronously.
	 *
	 * @param {string} id - The ID of the credit.
	 * @returns {Promise<CreditResponse>} A Promise that resolves with the credit
	 * details.
	 */
	getById(id: string, request?: RequestConfig): Promise<CreditResponse> {
		return this.api.get<CreditResponse>(`/credit/${id}`, request);
	}
}

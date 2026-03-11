import { BaseEndpoint, type CreditResponse, type TokenType } from "../@types";

/**
 * Represents an endpoint for retrieving credit details.
 */
export class CreditsEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new CreditsEndpoint instance.
	 *
	 * @param {TokenType} auth - The authentication configuration.
	 */
	constructor(protected readonly auth: TokenType) {
		super(auth);
	}

	/**
	 * Retrieves credit details by ID asynchronously.
	 *
	 * @param {string} id - The ID of the credit.
	 * @returns {Promise<CreditResponse>} A Promise that resolves with the credit
	 * details.
	 */
	getById(id: string): Promise<CreditResponse> {
		return this.api.get<CreditResponse>(`/credit/${id}`);
	}
}

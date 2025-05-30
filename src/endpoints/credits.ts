import { BaseEndpoint, type CreditResponse, type TokenType } from "../@types";

/**
 * Represents an endpoint for retrieving credit details.
 */
export class CreditsEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new CreditsEndpoint instance.
	 * @param {string} access_token - The access token used for authentication.
	 */
	constructor(protected readonly access_token: TokenType) {
		super(access_token);
	}

	/**
	 * Retrieves credit details by ID asynchronously.
	 * @param {string} id - The ID of the credit.
	 * @returns {Promise<CreditResponse>} A Promise that resolves with the credit details.
	 */
	async getById(id: string): Promise<CreditResponse> {
		return await this.api.get<CreditResponse>(`/credit/${id}`);
	}
}

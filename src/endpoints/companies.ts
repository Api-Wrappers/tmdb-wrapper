import {
	type AlternativeNames,
	BaseEndpoint,
	type CompanyDetails,
	type CompanyImages,
	type TokenType,
} from "../@types";

/**
 * Represents an endpoint for accessing company details and related information.
 */
export class CompaniesEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new CompaniesEndpoint instance.
	 * @param {string} access_token - The access token used for authentication.
	 */
	constructor(protected readonly access_token: TokenType) {
		super(access_token);
	}

	/**
	 * Retrieves details of a specific company asynchronously.
	 * @param {number} id - The ID of the company.
	 * @returns {Promise<CompanyDetails>} A Promise that resolves with the detailed information of the company.
	 */
	async details(id: number): Promise<CompanyDetails> {
		return await this.api.get<CompanyDetails>(`/company/${id}`);
	}

	/**
	 * Retrieves alternative names of a specific company asynchronously.
	 * @param {number} id - The ID of the company.
	 * @returns {Promise<AlternativeNames>} A Promise that resolves with the alternative names of the company.
	 */
	async alternativeNames(id: number): Promise<AlternativeNames> {
		return await this.api.get<AlternativeNames>(
			`/company/${id}/alternative_names`,
		);
	}

	/**
	 * Retrieves images associated with a specific company asynchronously.
	 * @param {number} id - The ID of the company.
	 * @returns {Promise<CompanyImages>} A Promise that resolves with the images of the company.
	 */
	async images(id: number): Promise<CompanyImages> {
		return await this.api.get<CompanyImages>(`/company/${id}/images`);
	}
}

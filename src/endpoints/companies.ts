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
	 *
	 * @param {TokenType} auth - The authentication configuration.
	 */
	constructor(protected readonly auth: TokenType) {
		super(auth);
	}

	/**
	 * Retrieves details of a specific company asynchronously.
	 *
	 * @param {number} id - The ID of the company.
	 * @returns {Promise<CompanyDetails>} A Promise that resolves with the
	 * detailed information of the company.
	 */
	details(id: number): Promise<CompanyDetails> {
		return this.api.get<CompanyDetails>(`/company/${id}`);
	}

	/**
	 * Retrieves alternative names of a specific company asynchronously.
	 *
	 * @param {number} id - The ID of the company.
	 * @returns {Promise<AlternativeNames>} A Promise that resolves with the
	 * alternative names of the company.
	 */
	alternativeNames(id: number): Promise<AlternativeNames> {
		return this.api.get<AlternativeNames>(`/company/${id}/alternative_names`);
	}

	/**
	 * Retrieves images associated with a specific company asynchronously.
	 *
	 * @param {number} id - The ID of the company.
	 * @returns {Promise<CompanyImages>} A Promise that resolves with the images
	 * of the company.
	 */
	images(id: number): Promise<CompanyImages> {
		return this.api.get<CompanyImages>(`/company/${id}/images`);
	}
}

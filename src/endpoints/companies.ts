import {
	type AlternativeNames,
	BaseEndpoint,
	type CompanyDetails,
	type CompanyImages,
} from "../@types";
import type { RequestConfig } from "../utils";

/**
 * Represents an endpoint for accessing company details and related information.
 */
export class CompaniesEndpoint extends BaseEndpoint {
	/**
	 * Retrieves details of a specific company asynchronously.
	 *
	 * @param {number} id - The ID of the company.
	 * @returns {Promise<CompanyDetails>} A Promise that resolves with the
	 * detailed information of the company.
	 */
	details(id: number, request?: RequestConfig): Promise<CompanyDetails> {
		return this.api.get<CompanyDetails>(`/company/${id}`, request);
	}

	/**
	 * Retrieves alternative names of a specific company asynchronously.
	 *
	 * @param {number} id - The ID of the company.
	 * @returns {Promise<AlternativeNames>} A Promise that resolves with the
	 * alternative names of the company.
	 */
	alternativeNames(
		id: number,
		request?: RequestConfig,
	): Promise<AlternativeNames> {
		return this.api.get<AlternativeNames>(
			`/company/${id}/alternative_names`,
			request,
		);
	}

	/**
	 * Retrieves images associated with a specific company asynchronously.
	 *
	 * @param {number} id - The ID of the company.
	 * @returns {Promise<CompanyImages>} A Promise that resolves with the images
	 * of the company.
	 */
	images(id: number, request?: RequestConfig): Promise<CompanyImages> {
		return this.api.get<CompanyImages>(`/company/${id}/images`, request);
	}
}

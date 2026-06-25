import {
	type AlternativeNames,
	BaseEndpoint,
	type NetworkDetails,
	type NetworkImages,
} from "../@types";
import type { RequestConfig } from "../utils";

/**
 * Represents an endpoint for accessing network details.
 */
export class NetworksEndpoint extends BaseEndpoint {
	/**
	 * Retrieves details of a specific network asynchronously.
	 *
	 * @param {number} id - The ID of the network.
	 * @returns {Promise<NetworkDetails>} A Promise that resolves with the
	 * details of the network.
	 */
	details(id: number, request?: RequestConfig): Promise<NetworkDetails> {
		return this.api.get<NetworkDetails>(`/network/${id}`, request);
	}

	/**
	 * Retrieves alternative names of a specific network asynchronously.
	 *
	 * @param {number} id - The ID of the network.
	 * @returns {Promise<AlternativeNames>} A Promise that resolves with the
	 * alternative names of the network.
	 */
	alternativeNames(
		id: number,
		request?: RequestConfig,
	): Promise<AlternativeNames> {
		return this.api.get<AlternativeNames>(
			`/network/${id}/alternative_names`,
			request,
		);
	}

	/**
	 * Retrieves images of a specific network asynchronously.
	 *
	 * @param {number} id - The ID of the network.
	 * @returns {Promise<NetworkImages>} A Promise that resolves with the images
	 * of the network.
	 */
	images(id: number, request?: RequestConfig): Promise<NetworkImages> {
		return this.api.get<NetworkImages>(`/network/${id}/images`, request);
	}
}

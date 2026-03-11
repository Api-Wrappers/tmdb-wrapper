import {
	type AlternativeNames,
	BaseEndpoint,
	type NetworkDetails,
	type NetworkImages,
	type TokenType,
} from "../@types";

/**
 * Represents an endpoint for accessing network details.
 */
export class NetworksEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new NetworksEndpoint instance.
	 *
	 * @param {TokenType} auth - The authentication configuration.
	 */
	constructor(protected readonly auth: TokenType) {
		super(auth);
	}

	/**
	 * Retrieves details of a specific network asynchronously.
	 *
	 * @param {number} id - The ID of the network.
	 * @returns {Promise<NetworkDetails>} A Promise that resolves with the
	 * details of the network.
	 */
	details(id: number): Promise<NetworkDetails> {
		return this.api.get<NetworkDetails>(`/network/${id}`);
	}

	/**
	 * Retrieves alternative names of a specific network asynchronously.
	 *
	 * @param {number} id - The ID of the network.
	 * @returns {Promise<AlternativeNames>} A Promise that resolves with the
	 * alternative names of the network.
	 */
	alternativeNames(id: number): Promise<AlternativeNames> {
		return this.api.get<AlternativeNames>(`/network/${id}/alternative_names`);
	}

	/**
	 * Retrieves images of a specific network asynchronously.
	 *
	 * @param {number} id - The ID of the network.
	 * @returns {Promise<NetworkImages>} A Promise that resolves with the images
	 * of the network.
	 */
	images(id: number): Promise<NetworkImages> {
		return this.api.get<NetworkImages>(`/network/${id}/images`);
	}
}

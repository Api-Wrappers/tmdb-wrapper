import { AlternativeNames, BaseEndpoint, NetworkDetails, NetworkImages } from '@/@types';

/**
 * Represents an endpoint for accessing network details.
 */
export class NetworksEndpoint extends BaseEndpoint {
  /**
   * Constructs a new NetworksEndpoint instance.
   * @param {string} access_token - The access token used for authentication.
   */
  constructor(protected readonly access_token: string) {
    super(access_token);
  }

  /**
   * Retrieves details of a specific network asynchronously.
   * @param {number} id - The ID of the network.
   * @returns {Promise<NetworkDetails>} A Promise that resolves with the details of the network.
   */
  async details(id: number): Promise<NetworkDetails> {
    return await this.api.get<NetworkDetails>(`/network/${id}`);
  }

  /**
   * Retrieves alternative names of a specific network asynchronously.
   * @param {number} id - The ID of the network.
   * @returns {Promise<AlternativeNames>} A Promise that resolves with the alternative names of the network.
   */
  async alternativeNames(id: number): Promise<AlternativeNames> {
    return await this.api.get<AlternativeNames>(`/network/${id}/alternative_names`);
  }

  /**
   * Retrieves images of a specific network asynchronously.
   * @param {number} id - The ID of the network.
   * @returns {Promise<NetworkImages>} A Promise that resolves with the images of the network.
   */
  async images(id: number): Promise<NetworkImages> {
    return await this.api.get<NetworkImages>(`/network/${id}/images`);
  }
}

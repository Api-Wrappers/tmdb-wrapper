import { AlternativeNames, BaseEndpoint, NetworkDetails, NetworkImages } from '@/@types';

export class NetworksEndpoint extends BaseEndpoint {
  constructor(protected readonly access_token: string) {
    super(access_token);
  }

  async details(id: number): Promise<NetworkDetails> {
    return await this.api.get<NetworkDetails>(`/network/${id}`);
  }

  async alternativeNames(id: number): Promise<AlternativeNames> {
    return await this.api.get<AlternativeNames>(`/network/${id}/alternative_names`);
  }

  async images(id: number): Promise<NetworkImages> {
    return await this.api.get<NetworkImages>(`/network/${id}/images`);
  }
}

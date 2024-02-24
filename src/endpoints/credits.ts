import { BaseEndpoint, CreditResponse } from '@/@types';

export class CreditsEndpoint extends BaseEndpoint {
  constructor(protected readonly access_token: string) {
    super(access_token);
  }

  async getById(id: string): Promise<CreditResponse> {
    return await this.api.get<CreditResponse>(`/credit/${id}`);
  }
}

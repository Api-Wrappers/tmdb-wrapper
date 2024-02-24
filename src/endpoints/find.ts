import { BaseEndpoint, ExternalIdOptions, FindResult } from '@/@types';

export class FindEndpoint extends BaseEndpoint {
  constructor(access_token: string) {
    super(access_token);
  }

  async byId(externalId: string, options: ExternalIdOptions): Promise<FindResult> {
    return await this.api.get<FindResult>(`/find/${externalId}`, options);
  }
}

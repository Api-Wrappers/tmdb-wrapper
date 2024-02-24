import { BaseEndpoint, Configuration } from '@/@types';

export class ConfigurationEndpoint extends BaseEndpoint {
  constructor(protected readonly access_token: string) {
    super(access_token);
  }

  async getCurrent(): Promise<Configuration> {
    return await this.api.get<Configuration>(`/configuration`);
  }
}

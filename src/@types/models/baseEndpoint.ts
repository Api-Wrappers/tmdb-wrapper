import { API } from '@/utils';

export class BaseEndpoint {
  protected api: API;

  constructor(protected readonly access_token: string) {
    this.api = new API(access_token);
  }
}

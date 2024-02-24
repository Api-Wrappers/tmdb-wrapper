import { AccountDetails, BaseEndpoint } from '@/@types';

export class AccountEndpoint extends BaseEndpoint {
  constructor(access_token: string) {
    super(access_token);
  }

  async details(): Promise<AccountDetails> {
    return await this.api.get('/account');
  }
}

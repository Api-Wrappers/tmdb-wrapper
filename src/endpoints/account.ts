import { AccountDetails, BaseEndpoint } from '@/@types';

/**
 * Represents an endpoint for retrieving account details.
 */
export class AccountEndpoint extends BaseEndpoint {
  /**
   * Constructs a new AccountEndpoint instance.
   * @param {string} access_token - The access token used for authentication.
   */
  constructor(access_token: string) {
    super(access_token);
  }

  /**
   * Retrieves account details asynchronously.
   * @returns {Promise<AccountDetails>} A Promise that resolves with the account details.
   */
  async details(): Promise<AccountDetails> {
    return await this.api.get('/account');
  }
}

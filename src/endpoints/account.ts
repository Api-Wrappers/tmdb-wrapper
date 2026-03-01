import { type AccountDetails, BaseEndpoint, type TokenType } from "../@types";

/**
 * Represents an endpoint for retrieving account details.
 *
 * TMDB v3 reference:
 * - GET /account/{account_id}
 *
 * Note:
 * TMDB does not expose a generic "GET /account" for account details. You must
 * provide an `account_id`. Most apps obtain it from an auth flow and then cache
 * it for subsequent requests.
 */
export class AccountEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new AccountEndpoint instance.
	 *
	 * @param {TokenType} access_token - The access token used for authentication.
	 */
	constructor(protected readonly access_token: TokenType) {
		super(access_token);
	}

	/**
	 * Retrieves account details asynchronously.
	 *
	 * TMDB: GET /account/{account_id}
	 *
	 * @param {number} accountId - The TMDB account ID.
	 * @returns {Promise<AccountDetails>} A Promise that resolves with the account details.
	 */
	details(accountId: number): Promise<AccountDetails> {
		return this.api.get<AccountDetails>(`/account/${accountId}`);
	}
}

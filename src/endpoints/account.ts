import {
	type AccountDetails,
	type AccountListOptions,
	type AccountLists,
	type AccountMarkFavoriteRequest,
	type AccountMediaListOptions,
	type AccountMovies,
	type AccountStatusResponse,
	type AccountTvEpisodes,
	type AccountTvShows,
	type AccountWatchlistRequest,
	BaseEndpoint,
	type SessionIdOption,
} from "../@types";
import { type RequestConfig, withQuery } from "../utils";

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
	 * Retrieves account details asynchronously.
	 *
	 * TMDB: GET /account/{account_id}
	 *
	 * @param {number} accountId - The TMDB account ID.
	 * @param {SessionIdOption} [options] - Optional session ID.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<AccountDetails>} A Promise that resolves with the account details.
	 */
	details(
		accountId: number,
		options?: SessionIdOption,
		request?: RequestConfig,
	): Promise<AccountDetails> {
		return this.api.get<AccountDetails>(
			`/account/${accountId}`,
			withQuery(options, request),
		);
	}

	/**
	 * Marks a movie or TV show as a favorite.
	 */
	addFavorite(
		accountId: number,
		body: AccountMarkFavoriteRequest,
		options?: SessionIdOption,
		request?: RequestConfig,
	): Promise<AccountStatusResponse> {
		return this.api.post<AccountStatusResponse>(
			`/account/${accountId}/favorite`,
			body,
			withQuery(options, request),
		);
	}

	/**
	 * Adds or removes a movie or TV show from the account watchlist.
	 */
	addToWatchlist(
		accountId: number,
		body: AccountWatchlistRequest,
		options?: SessionIdOption,
		request?: RequestConfig,
	): Promise<AccountStatusResponse> {
		return this.api.post<AccountStatusResponse>(
			`/account/${accountId}/watchlist`,
			body,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves the account's favorite movies.
	 */
	favoriteMovies(
		accountId: number,
		options?: AccountMediaListOptions,
		request?: RequestConfig,
	): Promise<AccountMovies> {
		return this.api.get<AccountMovies>(
			`/account/${accountId}/favorite/movies`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves the account's favorite TV shows.
	 */
	favoriteTv(
		accountId: number,
		options?: AccountMediaListOptions,
		request?: RequestConfig,
	): Promise<AccountTvShows> {
		return this.api.get<AccountTvShows>(
			`/account/${accountId}/favorite/tv`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves custom lists created by the account.
	 */
	lists(
		accountId: number,
		options?: AccountListOptions,
		request?: RequestConfig,
	): Promise<AccountLists> {
		return this.api.get<AccountLists>(
			`/account/${accountId}/lists`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves movies rated by the account.
	 */
	ratedMovies(
		accountId: number,
		options?: AccountMediaListOptions,
		request?: RequestConfig,
	): Promise<AccountMovies> {
		return this.api.get<AccountMovies>(
			`/account/${accountId}/rated/movies`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves TV shows rated by the account.
	 */
	ratedTv(
		accountId: number,
		options?: AccountMediaListOptions,
		request?: RequestConfig,
	): Promise<AccountTvShows> {
		return this.api.get<AccountTvShows>(
			`/account/${accountId}/rated/tv`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves TV episodes rated by the account.
	 */
	ratedTvEpisodes(
		accountId: number,
		options?: AccountMediaListOptions,
		request?: RequestConfig,
	): Promise<AccountTvEpisodes> {
		return this.api.get<AccountTvEpisodes>(
			`/account/${accountId}/rated/tv/episodes`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves the account's movie watchlist.
	 */
	watchlistMovies(
		accountId: number,
		options?: AccountMediaListOptions,
		request?: RequestConfig,
	): Promise<AccountMovies> {
		return this.api.get<AccountMovies>(
			`/account/${accountId}/watchlist/movies`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves the account's TV watchlist.
	 */
	watchlistTv(
		accountId: number,
		options?: AccountMediaListOptions,
		request?: RequestConfig,
	): Promise<AccountTvShows> {
		return this.api.get<AccountTvShows>(
			`/account/${accountId}/watchlist/tv`,
			withQuery(options, request),
		);
	}
}

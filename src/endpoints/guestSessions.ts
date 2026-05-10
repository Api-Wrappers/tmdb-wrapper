import {
	BaseEndpoint,
	type GuestSessionRatedMovies,
	type GuestSessionRatedOptions,
	type GuestSessionRatedTvEpisodes,
	type GuestSessionRatedTvShows,
	type TokenType,
} from "../@types";
import { type RequestConfig, withQuery } from "../utils";

const BASE_GUEST_SESSION = "/guest_session";

/**
 * Represents TMDB v3 guest session endpoints.
 */
export class GuestSessionsEndpoint extends BaseEndpoint {
	constructor(protected readonly auth: TokenType) {
		super(auth);
	}

	/**
	 * Retrieves movies rated by a guest session.
	 */
	ratedMovies(
		guestSessionId: string,
		options?: GuestSessionRatedOptions,
		request?: RequestConfig,
	): Promise<GuestSessionRatedMovies> {
		return this.api.get<GuestSessionRatedMovies>(
			`${BASE_GUEST_SESSION}/${guestSessionId}/rated/movies`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves TV shows rated by a guest session.
	 */
	ratedTv(
		guestSessionId: string,
		options?: GuestSessionRatedOptions,
		request?: RequestConfig,
	): Promise<GuestSessionRatedTvShows> {
		return this.api.get<GuestSessionRatedTvShows>(
			`${BASE_GUEST_SESSION}/${guestSessionId}/rated/tv`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves TV episodes rated by a guest session.
	 */
	ratedTvEpisodes(
		guestSessionId: string,
		options?: GuestSessionRatedOptions,
		request?: RequestConfig,
	): Promise<GuestSessionRatedTvEpisodes> {
		return this.api.get<GuestSessionRatedTvEpisodes>(
			`${BASE_GUEST_SESSION}/${guestSessionId}/rated/tv/episodes`,
			withQuery(options, request),
		);
	}
}

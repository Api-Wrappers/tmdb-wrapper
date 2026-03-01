import {
	BaseEndpoint,
	type MovieDiscoverResult,
	type MovieQueryOptions,
	type TokenType,
	type TvShowDiscoverResult,
	type TvShowQueryOptions,
} from "../@types";

const BASE_DISCOVER = "/discover";

/**
 * Represents an endpoint for discovering movies and TV shows based on various criteria.
 *
 * TMDB v3 reference:
 * - GET /discover/movie
 * - GET /discover/tv
 */
export class DiscoverEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new DiscoverEndpoint instance.
	 *
	 * @param {TokenType} access_token - The access token used for authentication.
	 */
	constructor(protected readonly access_token: TokenType) {
		super(access_token);
	}

	/**
	 * Retrieves a list of movies based on the provided query options asynchronously.
	 *
	 * TMDB: GET /discover/movie
	 *
	 * @param {MovieQueryOptions} [options] - Optional parameters for refining the movie discovery.
	 * @returns {Promise<MovieDiscoverResult>} A Promise that resolves with the movie discovery results.
	 */
	movie(options?: MovieQueryOptions): Promise<MovieDiscoverResult> {
		return this.api.get<MovieDiscoverResult>(
			`${BASE_DISCOVER}/movie`,
			options as Record<string, unknown>,
		);
	}

	/**
	 * Retrieves a list of TV shows based on the provided query options asynchronously.
	 *
	 * TMDB: GET /discover/tv
	 *
	 * @param {TvShowQueryOptions} [options] - Optional parameters for refining the TV show discovery.
	 * @returns {Promise<TvShowDiscoverResult>} A Promise that resolves with the TV show discovery results.
	 */
	tvShow(options?: TvShowQueryOptions): Promise<TvShowDiscoverResult> {
		return this.api.get<TvShowDiscoverResult>(
			`${BASE_DISCOVER}/tv`,
			options as Record<string, unknown>,
		);
	}
}

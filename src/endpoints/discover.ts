import {
  BaseEndpoint,
  MovieDiscoverResult,
  MovieQueryOptions,
  TvShowDiscoverResult,
  TvShowQueryOptions,
} from '../@types';

const BASE_DISCOVER = '/discover';

/**
 * Represents an endpoint for discovering movies and TV shows based on various criteria.
 */
export class DiscoverEndpoint extends BaseEndpoint {
  /**
   * Constructs a new DiscoverEndpoint instance.
   * @param {string} access_token - The access token used for authentication.
   */
  constructor(access_token: string) {
    super(access_token);
  }

  /**
   * Retrieves a list of movies based on the provided query options asynchronously.
   * @param {MovieQueryOptions} [options] - Optional parameters for refining the movie discovery.
   * @returns {Promise<MovieDiscoverResult>} A Promise that resolves with the movie discovery results.
   */
  async movie(options?: MovieQueryOptions): Promise<MovieDiscoverResult> {
    return await this.api.get<MovieDiscoverResult>(`${BASE_DISCOVER}/movie`, options);
  }

  /**
   * Retrieves a list of TV shows based on the provided query options asynchronously.
   * @param {TvShowQueryOptions} [options] - Optional parameters for refining the TV show discovery.
   * @returns {Promise<TvShowDiscoverResult>} A Promise that resolves with the TV show discovery results.
   */
  async tvShow(options?: TvShowQueryOptions): Promise<TvShowDiscoverResult> {
    return await this.api.get<TvShowDiscoverResult>(`${BASE_DISCOVER}/tv`, options);
  }
}

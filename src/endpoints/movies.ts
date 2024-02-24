import {
  AlternativeTitles,
  AppendToResponse,
  AppendToResponseMovieKey,
  BaseEndpoint,
  ChangeOption,
  Changes,
  Credits,
  ExternalIds,
  Images,
  Keywords,
  LanguageOption,
  LatestMovie,
  MovieChangeValue,
  MovieDetails,
  MovieLists,
  MoviesImageSearchOptions,
  MoviesPlayingNow,
  PageOption,
  PopularMovies,
  Recommendations,
  RegionOption,
  ReleaseDates,
  Reviews,
  SimilarMovies,
  TopRatedMovies,
  Translations,
  UpcomingMovies,
  Videos,
  WatchProviders,
} from '../@types';

const BASE_MOVIE = '/movie';

/**
 * Represents an endpoint for accessing movie-related information.
 */
export class MoviesEndpoint extends BaseEndpoint {
  /**
   * Constructs a new MoviesEndpoint instance.
   * @param {string} access_token - The access token used for authentication.
   */
  constructor(protected readonly access_token: string) {
    super(access_token);
  }

  /**
   * Retrieves details of a specific movie asynchronously.
   * @param {number} id - The ID of the movie.
   * @param {AppendToResponseMovieKey[]} [appendToResponse] - Optional keys to append to the response.
   * @param {string} [language] - Optional parameter for specifying the language.
   * @returns {Promise<AppendToResponse<MovieDetails, AppendToResponseMovieKey[], 'movie'>>} A Promise that resolves with the details of the movie.
   */
  async details<T extends AppendToResponseMovieKey[] | undefined>(id: number, appendToResponse?: T, language?: string) {
    const options = {
      append_to_response: appendToResponse ? appendToResponse.join(',') : undefined,
      language: language,
    };

    return await this.api.get<AppendToResponse<MovieDetails, T, 'movie'>>(`${BASE_MOVIE}/${id}`, options);
  }

  /**
   * Retrieves alternative titles of a specific movie asynchronously.
   * @param {number} id - The ID of the movie.
   * @returns {Promise<AlternativeTitles>} A Promise that resolves with the alternative titles of the movie.
   */
  async alternativeTitles(id: number): Promise<AlternativeTitles> {
    return await this.api.get<AlternativeTitles>(`${BASE_MOVIE}/${id}/alternative_titles`);
  }

  /**
   * Retrieves changes made to a specific movie asynchronously.
   * @param {number} id - The ID of the movie.
   * @param {ChangeOption} [options] - Optional parameters for filtering changes.
   * @returns {Promise<Changes<MovieChangeValue>>} A Promise that resolves with the changes made to the movie.
   */
  async changes(id: number, options?: ChangeOption): Promise<Changes<MovieChangeValue>> {
    return await this.api.get<Changes<MovieChangeValue>>(`${BASE_MOVIE}/${id}/changes`, options);
  }

  /**
   * Retrieves credits of a specific movie asynchronously.
   * @param {number} id - The ID of the movie.
   * @param {LanguageOption} [options] - Optional parameters for specifying the language.
   * @returns {Promise<Credits>} A Promise that resolves with the credits of the movie.
   */
  async credits(id: number, options?: LanguageOption): Promise<Credits> {
    return await this.api.get<Credits>(`${BASE_MOVIE}/${id}/credits`, options);
  }

  /**
   * Retrieves external IDs of a specific movie asynchronously.
   * @param {number} id - The ID of the movie.
   * @returns {Promise<ExternalIds>} A Promise that resolves with the external IDs of the movie.
   */
  async externalIds(id: number): Promise<ExternalIds> {
    return await this.api.get<ExternalIds>(`${BASE_MOVIE}/${id}/external_ids`);
  }

  /**
   * Retrieves images of a specific movie asynchronously.
   * @param {number} id - The ID of the movie.
   * @param {MoviesImageSearchOptions} [options] - Optional parameters for specifying image search options.
   * @returns {Promise<Images>} A Promise that resolves with the images of the movie.
   */
  async images(id: number, options?: MoviesImageSearchOptions): Promise<Images> {
    const computedOptions = {
      include_image_language: options?.include_image_language?.join(','),
      language: options?.language,
    };
    return await this.api.get<Images>(`${BASE_MOVIE}/${id}/images`, computedOptions);
  }

  /**
   * Retrieves keywords of a specific movie asynchronously.
   * @param {number} id - The ID of the movie.
   * @returns {Promise<Keywords>} A Promise that resolves with the keywords of the movie.
   */
  async keywords(id: number): Promise<Keywords> {
    return await this.api.get<Keywords>(`${BASE_MOVIE}/${id}/keywords`);
  }

  /**
   * Retrieves lists containing a specific movie asynchronously.
   * @param {number} id - The ID of the movie.
   * @param {LanguageOption & PageOption} [options] - Optional parameters for specifying language and pagination options.
   * @returns {Promise<MovieLists>} A Promise that resolves with the lists containing the movie.
   */
  async lists(id: number, options?: LanguageOption & PageOption): Promise<MovieLists> {
    return await this.api.get<MovieLists>(`${BASE_MOVIE}/${id}/lists`, options);
  }

  /**
   * Retrieves recommendations for a specific movie asynchronously.
   * @param {number} id - The ID of the movie.
   * @param {LanguageOption & PageOption} [options] - Optional parameters for specifying language and pagination options.
   * @returns {Promise<Recommendations>} A Promise that resolves with the recommendations for the movie.
   */
  async recommendations(id: number, options?: LanguageOption & PageOption): Promise<Recommendations> {
    return await this.api.get<Recommendations>(`${BASE_MOVIE}/${id}/recommendations`, options);
  }

  /**
   * Retrieves release dates of a specific movie asynchronously.
   * @param {number} id - The ID of the movie.
   * @returns {Promise<ReleaseDates>} A Promise that resolves with the release dates of the movie.
   */
  async releaseDates(id: number): Promise<ReleaseDates> {
    return await this.api.get<ReleaseDates>(`${BASE_MOVIE}/${id}/release_dates`);
  }

  /**
   * Retrieves reviews for a specific movie asynchronously.
   * @param {number} id - The ID of the movie.
   * @param {LanguageOption & PageOption} [options] - Optional parameters for specifying language and pagination options.
   * @returns {Promise<Reviews>} A Promise that resolves with the reviews for the movie.
   */
  async reviews(id: number, options?: LanguageOption & PageOption): Promise<Reviews> {
    return await this.api.get<Reviews>(`${BASE_MOVIE}/${id}/reviews`, options);
  }

  /**
   * Retrieves similar movies for a specific movie asynchronously.
   * @param {number} id - The ID of the movie.
   * @param {LanguageOption & PageOption} [options] - Optional parameters for specifying language and pagination options.
   * @returns {Promise<SimilarMovies>} A Promise that resolves with the similar movies for the movie.
   */
  async similar(id: number, options?: LanguageOption & PageOption): Promise<SimilarMovies> {
    return await this.api.get<SimilarMovies>(`${BASE_MOVIE}/${id}/similar`, options);
  }

  /**
   * Retrieves translations of a specific movie asynchronously.
   * @param {number} id - The ID of the movie.
   * @returns {Promise<Translations>} A Promise that resolves with the translations of the movie.
   */
  async translations(id: number): Promise<Translations> {
    return await this.api.get<Translations>(`${BASE_MOVIE}/${id}/translations`);
  }

  /**
   * Retrieves videos of a specific movie asynchronously.
   * @param {number} id - The ID of the movie.
   * @param {LanguageOption} [options] - Optional parameters for specifying the language.
   * @returns {Promise<Videos>} A Promise that resolves with the videos of the movie.
   */
  async videos(id: number, options?: LanguageOption): Promise<Videos> {
    return await this.api.get<Videos>(`${BASE_MOVIE}/${id}/videos`, options);
  }

  /**
   * Retrieves watch providers of a specific movie asynchronously.
   * @param {number} id - The ID of the movie.
   * @returns {Promise<WatchProviders>} A Promise that resolves with the watch providers of the movie.
   */
  async watchProviders(id: number): Promise<WatchProviders> {
    return await this.api.get<WatchProviders>(`${BASE_MOVIE}/${id}/watch/providers`);
  }

  /**
   * Retrieves details of the latest movie asynchronously.
   * @returns {Promise<LatestMovie>} A Promise that resolves with the details of the latest movie.
   */
  async latest(): Promise<LatestMovie> {
    return await this.api.get<LatestMovie>(`${BASE_MOVIE}/latest`);
  }

  /**
   * Retrieves movies playing now asynchronously.
   * @param {PageOption & LanguageOption & RegionOption} [options] - Optional parameters for specifying language, region, and pagination options.
   * @returns {Promise<MoviesPlayingNow>} A Promise that resolves with the movies playing now.
   */
  async nowPlaying(options?: PageOption & LanguageOption & RegionOption): Promise<MoviesPlayingNow> {
    return await this.api.get<MoviesPlayingNow>(`${BASE_MOVIE}/now_playing`, options);
  }

  /**
   * Retrieves popular movies asynchronously.
   * @param {LanguageOption & PageOption} [options] - Optional parameters for specifying language and pagination options.
   * @returns {Promise<PopularMovies>} A Promise that resolves with the popular movies.
   */
  async popular(options?: LanguageOption & PageOption): Promise<PopularMovies> {
    return await this.api.get<PopularMovies>(`${BASE_MOVIE}/popular`, options);
  }

  /**
   * Retrieves top rated movies asynchronously.
   * @param {PageOption & LanguageOption & RegionOption} [options] - Optional parameters for specifying language, region, and pagination options.
   * @returns {Promise<TopRatedMovies>} A Promise that resolves with the top rated movies.
   */
  async topRated(options?: PageOption & LanguageOption & RegionOption): Promise<TopRatedMovies> {
    return await this.api.get<TopRatedMovies>(`${BASE_MOVIE}/top_rated`, options);
  }

  /**
   * Retrieves upcoming movies asynchronously.
   * @param {PageOption & LanguageOption & RegionOption} [options] - Optional parameters for specifying language, region, and pagination options.
   * @returns {Promise<UpcomingMovies>} A Promise that resolves with the upcoming movies.
   */
  async upcoming(options?: PageOption & LanguageOption & RegionOption): Promise<UpcomingMovies> {
    return await this.api.get<UpcomingMovies>(`${BASE_MOVIE}/upcoming`, options);
  }
}

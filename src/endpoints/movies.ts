import {
	type AlternativeTitles,
	type AppendToResponse,
	type AppendToResponseMovieKey,
	BaseEndpoint,
	type ChangeOption,
	type Changes,
	type Credits,
	type ExternalIds,
	type Images,
	type Keywords,
	type LanguageOption,
	type LatestMovie,
	type MovieChangeValue,
	type MovieDetails,
	type MovieLists,
	type MoviesImageSearchOptions,
	type MoviesPlayingNow,
	type PageOption,
	type PopularMovies,
	type Recommendations,
	type RegionOption,
	type ReleaseDates,
	type Reviews,
	type SimilarMovies,
	type TokenType,
	type TopRatedMovies,
	type Translations,
	type UpcomingMovies,
	type Videos,
	type WatchProviders,
} from "../@types";

const BASE_MOVIE = "/movie";

/**
 * Represents an endpoint for accessing movie-related information.
 */
export class MoviesEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new MoviesEndpoint instance.
	 *
	 * @param {TokenType} auth - The authentication configuration.
	 */
	constructor(protected readonly auth: TokenType) {
		super(auth);
	}

	/**
	 * Retrieves details of a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {AppendToResponseMovieKey[]} [appendToResponse] - Optional keys to
	 * append to the response.
	 * @param {string} [language] - Optional parameter for specifying the
	 * language.
	 * @returns {Promise<AppendToResponse<MovieDetails, T, "movie">>} A Promise
	 * that resolves with the details of the movie.
	 */
	details<T extends AppendToResponseMovieKey[] | undefined>(
		id: number,
		appendToResponse?: T,
		language?: string,
	): Promise<AppendToResponse<MovieDetails, T, "movie">> {
		const query = {
			append_to_response: appendToResponse
				? appendToResponse.join(",")
				: undefined,
			language,
		};

		return this.api.get<AppendToResponse<MovieDetails, T, "movie">>(
			`${BASE_MOVIE}/${id}`,
			{ query },
		);
	}

	/**
	 * Retrieves alternative titles of a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @returns {Promise<AlternativeTitles>} A Promise that resolves with the
	 * alternative titles of the movie.
	 */
	alternativeTitles(id: number): Promise<AlternativeTitles> {
		return this.api.get<AlternativeTitles>(
			`${BASE_MOVIE}/${id}/alternative_titles`,
		);
	}

	/**
	 * Retrieves changes made to a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {ChangeOption} [options] - Optional parameters for filtering
	 * changes.
	 * @returns {Promise<Changes<MovieChangeValue>>} A Promise that resolves with
	 * the changes made to the movie.
	 */
	changes(
		id: number,
		options?: ChangeOption,
	): Promise<Changes<MovieChangeValue>> {
		return this.api.get<Changes<MovieChangeValue>>(
			`${BASE_MOVIE}/${id}/changes`,
			{ query: options },
		);
	}

	/**
	 * Retrieves credits of a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @returns {Promise<Credits>} A Promise that resolves with the credits of
	 * the movie.
	 */
	credits(id: number, options?: LanguageOption): Promise<Credits> {
		return this.api.get<Credits>(`${BASE_MOVIE}/${id}/credits`, {
			query: options,
		});
	}

	/**
	 * Retrieves external IDs of a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @returns {Promise<ExternalIds>} A Promise that resolves with the external
	 * IDs of the movie.
	 */
	externalIds(id: number): Promise<ExternalIds> {
		return this.api.get<ExternalIds>(`${BASE_MOVIE}/${id}/external_ids`);
	}

	/**
	 * Retrieves images of a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {MoviesImageSearchOptions} [options] - Optional parameters for
	 * specifying image search options.
	 * @returns {Promise<Images>} A Promise that resolves with the images of the
	 * movie.
	 */
	images(id: number, options?: MoviesImageSearchOptions): Promise<Images> {
		const computedOptions = {
			include_image_language: options?.include_image_language?.join(","),
			language: options?.language,
		};

		return this.api.get<Images>(`${BASE_MOVIE}/${id}/images`, {
			query: computedOptions,
		});
	}

	/**
	 * Retrieves keywords of a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @returns {Promise<Keywords>} A Promise that resolves with the keywords of
	 * the movie.
	 */
	keywords(id: number): Promise<Keywords> {
		return this.api.get<Keywords>(`${BASE_MOVIE}/${id}/keywords`);
	}

	/**
	 * Retrieves lists containing a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {LanguageOption & PageOption} [options] - Optional parameters for
	 * specifying language and pagination options.
	 * @returns {Promise<MovieLists>} A Promise that resolves with the lists
	 * containing the movie.
	 */
	lists(
		id: number,
		options?: LanguageOption & PageOption,
	): Promise<MovieLists> {
		return this.api.get<MovieLists>(`${BASE_MOVIE}/${id}/lists`, {
			query: options,
		});
	}

	/**
	 * Retrieves recommendations for a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {LanguageOption & PageOption} [options] - Optional parameters for
	 * specifying language and pagination options.
	 * @returns {Promise<Recommendations>} A Promise that resolves with the
	 * recommendations for the movie.
	 */
	recommendations(
		id: number,
		options?: LanguageOption & PageOption,
	): Promise<Recommendations> {
		return this.api.get<Recommendations>(
			`${BASE_MOVIE}/${id}/recommendations`,
			{ query: options },
		);
	}

	/**
	 * Retrieves release dates of a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @returns {Promise<ReleaseDates>} A Promise that resolves with the release
	 * dates of the movie.
	 */
	releaseDates(id: number): Promise<ReleaseDates> {
		return this.api.get<ReleaseDates>(`${BASE_MOVIE}/${id}/release_dates`);
	}

	/**
	 * Retrieves reviews for a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {LanguageOption & PageOption} [options] - Optional parameters for
	 * specifying language and pagination options.
	 * @returns {Promise<Reviews>} A Promise that resolves with the reviews for
	 * the movie.
	 */
	reviews(id: number, options?: LanguageOption & PageOption): Promise<Reviews> {
		return this.api.get<Reviews>(`${BASE_MOVIE}/${id}/reviews`, {
			query: options,
		});
	}

	/**
	 * Retrieves similar movies for a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {LanguageOption & PageOption} [options] - Optional parameters for
	 * specifying language and pagination options.
	 * @returns {Promise<SimilarMovies>} A Promise that resolves with the similar
	 * movies for the movie.
	 */
	similar(
		id: number,
		options?: LanguageOption & PageOption,
	): Promise<SimilarMovies> {
		return this.api.get<SimilarMovies>(`${BASE_MOVIE}/${id}/similar`, {
			query: options,
		});
	}

	/**
	 * Retrieves translations of a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @returns {Promise<Translations>} A Promise that resolves with the
	 * translations of the movie.
	 */
	translations(id: number): Promise<Translations> {
		return this.api.get<Translations>(`${BASE_MOVIE}/${id}/translations`);
	}

	/**
	 * Retrieves videos of a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @returns {Promise<Videos>} A Promise that resolves with the videos of the
	 * movie.
	 */
	videos(id: number, options?: LanguageOption): Promise<Videos> {
		return this.api.get<Videos>(`${BASE_MOVIE}/${id}/videos`, {
			query: options,
		});
	}

	/**
	 * Retrieves watch providers of a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @returns {Promise<WatchProviders>} A Promise that resolves with the watch
	 * providers of the movie.
	 */
	watchProviders(id: number): Promise<WatchProviders> {
		return this.api.get<WatchProviders>(`${BASE_MOVIE}/${id}/watch/providers`);
	}

	/**
	 * Retrieves details of the latest movie asynchronously.
	 *
	 * @returns {Promise<LatestMovie>} A Promise that resolves with the details
	 * of the latest movie.
	 */
	latest(): Promise<LatestMovie> {
		return this.api.get<LatestMovie>(`${BASE_MOVIE}/latest`);
	}

	/**
	 * Retrieves movies playing now asynchronously.
	 *
	 * @param {PageOption & LanguageOption & RegionOption} [options] - Optional
	 * parameters for specifying language, region, and pagination options.
	 * @returns {Promise<MoviesPlayingNow>} A Promise that resolves with the
	 * movies playing now.
	 */
	nowPlaying(
		options?: PageOption & LanguageOption & RegionOption,
	): Promise<MoviesPlayingNow> {
		return this.api.get<MoviesPlayingNow>(`${BASE_MOVIE}/now_playing`, {
			query: options,
		});
	}

	/**
	 * Retrieves popular movies asynchronously.
	 *
	 * @param {LanguageOption & PageOption} [options] - Optional parameters for
	 * specifying language and pagination options.
	 * @returns {Promise<PopularMovies>} A Promise that resolves with the popular
	 * movies.
	 */
	popular(options?: LanguageOption & PageOption): Promise<PopularMovies> {
		return this.api.get<PopularMovies>(`${BASE_MOVIE}/popular`, {
			query: options,
		});
	}

	/**
	 * Retrieves top rated movies asynchronously.
	 *
	 * @param {PageOption & LanguageOption & RegionOption} [options] - Optional
	 * parameters for specifying language, region, and pagination options.
	 * @returns {Promise<TopRatedMovies>} A Promise that resolves with the top
	 * rated movies.
	 */
	topRated(
		options?: PageOption & LanguageOption & RegionOption,
	): Promise<TopRatedMovies> {
		return this.api.get<TopRatedMovies>(`${BASE_MOVIE}/top_rated`, {
			query: options,
		});
	}

	/**
	 * Retrieves upcoming movies asynchronously.
	 *
	 * @param {PageOption & LanguageOption & RegionOption} [options] - Optional
	 * parameters for specifying language, region, and pagination options.
	 * @returns {Promise<UpcomingMovies>} A Promise that resolves with the
	 * upcoming movies.
	 */
	upcoming(
		options?: PageOption & LanguageOption & RegionOption,
	): Promise<UpcomingMovies> {
		return this.api.get<UpcomingMovies>(`${BASE_MOVIE}/upcoming`, {
			query: options,
		});
	}
}

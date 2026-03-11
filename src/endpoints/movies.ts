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
import { csv, type RequestConfig, withQuery } from "../utils";

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
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<AppendToResponse<MovieDetails, T, "movie">>} A Promise
	 * that resolves with the details of the movie.
	 */
	details<T extends AppendToResponseMovieKey[] | undefined>(
		id: number,
		appendToResponse?: T,
		language?: string,
		request?: RequestConfig,
	): Promise<AppendToResponse<MovieDetails, T, "movie">> {
		const query = {
			append_to_response: csv(appendToResponse),
			language,
		};

		return this.api.get<AppendToResponse<MovieDetails, T, "movie">>(
			`${BASE_MOVIE}/${id}`,
			withQuery(query, request),
		);
	}

	/**
	 * Retrieves alternative titles of a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<AlternativeTitles>} A Promise that resolves with the
	 * alternative titles of the movie.
	 */
	alternativeTitles(
		id: number,
		request?: RequestConfig,
	): Promise<AlternativeTitles> {
		return this.api.get<AlternativeTitles>(
			`${BASE_MOVIE}/${id}/alternative_titles`,
			request,
		);
	}

	/**
	 * Retrieves changes made to a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {ChangeOption} [options] - Optional parameters for filtering
	 * changes.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Changes<MovieChangeValue>>} A Promise that resolves with
	 * the changes made to the movie.
	 */
	changes(
		id: number,
		options?: ChangeOption,
		request?: RequestConfig,
	): Promise<Changes<MovieChangeValue>> {
		return this.api.get<Changes<MovieChangeValue>>(
			`${BASE_MOVIE}/${id}/changes`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves credits of a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Credits>} A Promise that resolves with the credits of
	 * the movie.
	 */
	credits(
		id: number,
		options?: LanguageOption,
		request?: RequestConfig,
	): Promise<Credits> {
		return this.api.get<Credits>(
			`${BASE_MOVIE}/${id}/credits`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves external IDs of a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<ExternalIds>} A Promise that resolves with the external
	 * IDs of the movie.
	 */
	externalIds(id: number, request?: RequestConfig): Promise<ExternalIds> {
		return this.api.get<ExternalIds>(
			`${BASE_MOVIE}/${id}/external_ids`,
			request,
		);
	}

	/**
	 * Retrieves images of a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {MoviesImageSearchOptions} [options] - Optional parameters for
	 * specifying image search options.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Images>} A Promise that resolves with the images of the
	 * movie.
	 */
	images(
		id: number,
		options?: MoviesImageSearchOptions,
		request?: RequestConfig,
	): Promise<Images> {
		const query = {
			include_image_language: csv(options?.include_image_language),
			language: options?.language,
		};

		return this.api.get<Images>(
			`${BASE_MOVIE}/${id}/images`,
			withQuery(query, request),
		);
	}

	/**
	 * Retrieves keywords of a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Keywords>} A Promise that resolves with the keywords of
	 * the movie.
	 */
	keywords(id: number, request?: RequestConfig): Promise<Keywords> {
		return this.api.get<Keywords>(`${BASE_MOVIE}/${id}/keywords`, request);
	}

	/**
	 * Retrieves lists containing a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {LanguageOption & PageOption} [options] - Optional parameters for
	 * specifying language and pagination options.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<MovieLists>} A Promise that resolves with the lists
	 * containing the movie.
	 */
	lists(
		id: number,
		options?: LanguageOption & PageOption,
		request?: RequestConfig,
	): Promise<MovieLists> {
		return this.api.get<MovieLists>(
			`${BASE_MOVIE}/${id}/lists`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves recommendations for a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {LanguageOption & PageOption} [options] - Optional parameters for
	 * specifying language and pagination options.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Recommendations>} A Promise that resolves with the
	 * recommendations for the movie.
	 */
	recommendations(
		id: number,
		options?: LanguageOption & PageOption,
		request?: RequestConfig,
	): Promise<Recommendations> {
		return this.api.get<Recommendations>(
			`${BASE_MOVIE}/${id}/recommendations`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves release dates of a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<ReleaseDates>} A Promise that resolves with the release
	 * dates of the movie.
	 */
	releaseDates(id: number, request?: RequestConfig): Promise<ReleaseDates> {
		return this.api.get<ReleaseDates>(
			`${BASE_MOVIE}/${id}/release_dates`,
			request,
		);
	}

	/**
	 * Retrieves reviews for a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {LanguageOption & PageOption} [options] - Optional parameters for
	 * specifying language and pagination options.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Reviews>} A Promise that resolves with the reviews for
	 * the movie.
	 */
	reviews(
		id: number,
		options?: LanguageOption & PageOption,
		request?: RequestConfig,
	): Promise<Reviews> {
		return this.api.get<Reviews>(
			`${BASE_MOVIE}/${id}/reviews`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves similar movies for a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {LanguageOption & PageOption} [options] - Optional parameters for
	 * specifying language and pagination options.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<SimilarMovies>} A Promise that resolves with the similar
	 * movies for the movie.
	 */
	similar(
		id: number,
		options?: LanguageOption & PageOption,
		request?: RequestConfig,
	): Promise<SimilarMovies> {
		return this.api.get<SimilarMovies>(
			`${BASE_MOVIE}/${id}/similar`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves translations of a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Translations>} A Promise that resolves with the
	 * translations of the movie.
	 */
	translations(id: number, request?: RequestConfig): Promise<Translations> {
		return this.api.get<Translations>(
			`${BASE_MOVIE}/${id}/translations`,
			request,
		);
	}

	/**
	 * Retrieves videos of a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Videos>} A Promise that resolves with the videos of the
	 * movie.
	 */
	videos(
		id: number,
		options?: LanguageOption,
		request?: RequestConfig,
	): Promise<Videos> {
		return this.api.get<Videos>(
			`${BASE_MOVIE}/${id}/videos`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves watch providers of a specific movie asynchronously.
	 *
	 * @param {number} id - The ID of the movie.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<WatchProviders>} A Promise that resolves with the watch
	 * providers of the movie.
	 */
	watchProviders(id: number, request?: RequestConfig): Promise<WatchProviders> {
		return this.api.get<WatchProviders>(
			`${BASE_MOVIE}/${id}/watch/providers`,
			request,
		);
	}

	/**
	 * Retrieves details of the latest movie asynchronously.
	 *
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<LatestMovie>} A Promise that resolves with the details
	 * of the latest movie.
	 */
	latest(request?: RequestConfig): Promise<LatestMovie> {
		return this.api.get<LatestMovie>(`${BASE_MOVIE}/latest`, request);
	}

	/**
	 * Retrieves movies playing now asynchronously.
	 *
	 * @param {PageOption & LanguageOption & RegionOption} [options] - Optional
	 * parameters for specifying language, region, and pagination options.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<MoviesPlayingNow>} A Promise that resolves with the
	 * movies playing now.
	 */
	nowPlaying(
		options?: PageOption & LanguageOption & RegionOption,
		request?: RequestConfig,
	): Promise<MoviesPlayingNow> {
		return this.api.get<MoviesPlayingNow>(
			`${BASE_MOVIE}/now_playing`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves popular movies asynchronously.
	 *
	 * @param {LanguageOption & PageOption} [options] - Optional parameters for
	 * specifying language and pagination options.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<PopularMovies>} A Promise that resolves with the popular
	 * movies.
	 */
	popular(
		options?: LanguageOption & PageOption,
		request?: RequestConfig,
	): Promise<PopularMovies> {
		return this.api.get<PopularMovies>(
			`${BASE_MOVIE}/popular`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves top rated movies asynchronously.
	 *
	 * @param {PageOption & LanguageOption & RegionOption} [options] - Optional
	 * parameters for specifying language, region, and pagination options.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<TopRatedMovies>} A Promise that resolves with the top
	 * rated movies.
	 */
	topRated(
		options?: PageOption & LanguageOption & RegionOption,
		request?: RequestConfig,
	): Promise<TopRatedMovies> {
		return this.api.get<TopRatedMovies>(
			`${BASE_MOVIE}/top_rated`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves upcoming movies asynchronously.
	 *
	 * @param {PageOption & LanguageOption & RegionOption} [options] - Optional
	 * parameters for specifying language, region, and pagination options.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<UpcomingMovies>} A Promise that resolves with the
	 * upcoming movies.
	 */
	upcoming(
		options?: PageOption & LanguageOption & RegionOption,
		request?: RequestConfig,
	): Promise<UpcomingMovies> {
		return this.api.get<UpcomingMovies>(
			`${BASE_MOVIE}/upcoming`,
			withQuery(options, request),
		);
	}
}

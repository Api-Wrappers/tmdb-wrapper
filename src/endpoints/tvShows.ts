import {
	type AggregateCredits,
	type AlternativeTitles,
	type AppendToResponse,
	type AppendToResponseTvKey,
	BaseEndpoint,
	type ChangeOption,
	type Changes,
	type ContentRatings,
	type Credits,
	type EpisodeGroups,
	type ExternalIds,
	type Images,
	type Keywords,
	type LanguageOption,
	type Latesttv,
	type MediaAccountStates,
	type MovieLists,
	type OnTheAir,
	type PageOption,
	type Populartv,
	type RatingBody,
	type Recommendations,
	type Reviews,
	type ScreenedTheatrically,
	type SeasonDetails,
	type SessionOrGuestSessionOption,
	type Similartv,
	type StatusResponse,
	type TimezoneOption,
	type TopRatedtv,
	type Translations,
	type TvShowChangeValue,
	type TvShowDetails,
	type TvShowImageOptions,
	type TvShowVideoOptions,
	type tvAiringToday,
	type Videos,
	type WatchProviders,
} from "../@types";
import { csv, type RequestConfig, withQuery } from "../utils";

const BASE_TV = "/tv";

/**
 * Represents an endpoint for accessing TV show-related information.
 */
export class TvShowsEndpoint extends BaseEndpoint {
	/**
	 * Retrieves details of a specific TV show asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @param {AppendToResponseTvKey[]} [appendToResponse] - Additional data to
	 * append to the response.
	 * @param {string} [language] - The language for the response.
	 * @returns {Promise<AppendToResponse<TvShowDetails, T, "tvShow">>} A
	 * Promise that resolves with the details of the TV show.
	 */
	details<T extends AppendToResponseTvKey[] | undefined>(
		id: number,
		appendToResponse?: T,
		language?: string,
		request?: RequestConfig,
	): Promise<AppendToResponse<TvShowDetails, T, "tvShow">> {
		const options = {
			append_to_response: csv(appendToResponse),
			language,
		};

		return this.api.get<AppendToResponse<TvShowDetails, T, "tvShow">>(
			`${BASE_TV}/${id}`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves alternative titles of a specific TV show asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @returns {Promise<AlternativeTitles>} A Promise that resolves with the
	 * alternative titles of the TV show.
	 */
	alternativeTitles(
		id: number,
		request?: RequestConfig,
	): Promise<AlternativeTitles> {
		return this.api.get<AlternativeTitles>(
			`${BASE_TV}/${id}/alternative_titles`,
			request,
		);
	}

	/**
	 * Retrieves changes for a specific TV show asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @param {ChangeOption} [options] - Additional options for the request.
	 * @returns {Promise<Changes<TvShowChangeValue>>} A Promise that resolves
	 * with the changes for the TV show.
	 */
	changes(
		id: number,
		options?: ChangeOption,
		request?: RequestConfig,
	): Promise<Changes<TvShowChangeValue>> {
		return this.api.get<Changes<TvShowChangeValue>>(
			`${BASE_TV}/${id}/changes`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves content ratings for a specific TV show asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @returns {Promise<ContentRatings>} A Promise that resolves with the
	 * content ratings of the TV show.
	 */
	contentRatings(id: number, request?: RequestConfig): Promise<ContentRatings> {
		return this.api.get<ContentRatings>(
			`${BASE_TV}/${id}/content_ratings`,
			request,
		);
	}

	/**
	 * Retrieves aggregate credits for a specific TV show asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @param {LanguageOption} [options] - Additional options for the request.
	 * @returns {Promise<AggregateCredits>} A Promise that resolves with the
	 * aggregate credits of the TV show.
	 */
	aggregateCredits(
		id: number,
		options?: LanguageOption,
		request?: RequestConfig,
	): Promise<AggregateCredits> {
		return this.api.get<AggregateCredits>(
			`${BASE_TV}/${id}/aggregate_credits`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves credits for a specific TV show asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @param {LanguageOption} [options] - Additional options for the request.
	 * @returns {Promise<Credits>} A Promise that resolves with the credits of
	 * the TV show.
	 */
	credits(
		id: number,
		options?: LanguageOption,
		request?: RequestConfig,
	): Promise<Credits> {
		return this.api.get<Credits>(
			`${BASE_TV}/${id}/credits`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves details of a specific season of a TV show asynchronously.
	 *
	 * @param {number} tvId - The ID of the TV show.
	 * @param {number} seasonNumber - The season number.
	 * @returns {Promise<SeasonDetails>} A Promise that resolves with the details
	 * of the season.
	 */
	season(
		tvId: number,
		seasonNumber: number,
		request?: RequestConfig,
	): Promise<SeasonDetails> {
		return this.api.get<SeasonDetails>(
			`${BASE_TV}/${tvId}/season/${seasonNumber}`,
			request,
		);
	}

	/**
	 * Retrieves episode groups for a specific TV show asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @returns {Promise<EpisodeGroups>} A Promise that resolves with the episode
	 * groups of the TV show.
	 */
	episodeGroups(id: number, request?: RequestConfig): Promise<EpisodeGroups> {
		return this.api.get<EpisodeGroups>(
			`${BASE_TV}/${id}/episode_groups`,
			request,
		);
	}

	/**
	 * Retrieves external IDs for a specific TV show asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @returns {Promise<ExternalIds>} A Promise that resolves with the external
	 * IDs of the TV show.
	 */
	externalIds(id: number, request?: RequestConfig): Promise<ExternalIds> {
		return this.api.get<ExternalIds>(`${BASE_TV}/${id}/external_ids`, request);
	}

	/**
	 * Retrieves images for a specific TV show asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @param {TvShowImageOptions} [options] - Additional options for the
	 * request.
	 * @returns {Promise<Images>} A Promise that resolves with the images of the
	 * TV show.
	 */
	images(
		id: number,
		options?: TvShowImageOptions,
		request?: RequestConfig,
	): Promise<Images> {
		const computedOptions = {
			include_image_language: csv(options?.include_image_language),
			language: options?.language,
		};

		return this.api.get<Images>(
			`${BASE_TV}/${id}/images`,
			withQuery(computedOptions, request),
		);
	}

	/**
	 * Retrieves keywords for a specific TV show asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @returns {Promise<Keywords>} A Promise that resolves with the keywords of
	 * the TV show.
	 */
	keywords(id: number, request?: RequestConfig): Promise<Keywords> {
		return this.api.get<Keywords>(`${BASE_TV}/${id}/keywords`, request);
	}

	/**
	 * Retrieves recommendations for a specific TV show asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @param {LanguageOption & PageOption} [options] - Additional options for
	 * the request.
	 * @returns {Promise<Recommendations>} A Promise that resolves with the
	 * recommendations for the TV show.
	 */
	recommendations(
		id: number,
		options?: LanguageOption & PageOption,
		request?: RequestConfig,
	): Promise<Recommendations> {
		return this.api.get<Recommendations>(
			`${BASE_TV}/${id}/recommendations`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves reviews for a specific TV show asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @param {LanguageOption & PageOption} [options] - Additional options for
	 * the request.
	 * @returns {Promise<Reviews>} A Promise that resolves with the reviews of
	 * the TV show.
	 */
	reviews(
		id: number,
		options?: LanguageOption & PageOption,
		request?: RequestConfig,
	): Promise<Reviews> {
		return this.api.get<Reviews>(
			`${BASE_TV}/${id}/reviews`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves information about whether the TV show was screened theatrically
	 * asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @returns {Promise<ScreenedTheatrically>} A Promise that resolves with
	 * information about theatrical screenings.
	 */
	screenedTheatrically(
		id: number,
		request?: RequestConfig,
	): Promise<ScreenedTheatrically> {
		return this.api.get<ScreenedTheatrically>(
			`${BASE_TV}/${id}/screened_theatrically`,
			request,
		);
	}

	/**
	 * Retrieves similar TV shows for a specific TV show asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @param {LanguageOption & PageOption} [options] - Additional options for
	 * the request.
	 * @returns {Promise<Similartv>} A Promise that resolves with the similar TV
	 * shows.
	 */
	similar(
		id: number,
		options?: LanguageOption & PageOption,
		request?: RequestConfig,
	): Promise<Similartv> {
		return this.api.get<Similartv>(
			`${BASE_TV}/${id}/similar`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves translations for a specific TV show asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @returns {Promise<Translations>} A Promise that resolves with the
	 * translations of the TV show.
	 */
	translations(id: number, request?: RequestConfig): Promise<Translations> {
		return this.api.get<Translations>(`${BASE_TV}/${id}/translations`, request);
	}

	/**
	 * Retrieves videos for a specific TV show asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @param {TvShowVideoOptions} [options] - Additional options for the
	 * request.
	 * @returns {Promise<Videos>} A Promise that resolves with the videos of the
	 * TV show.
	 */
	videos(
		id: number,
		options?: TvShowVideoOptions,
		request?: RequestConfig,
	): Promise<Videos> {
		const computedOptions = {
			include_video_language: csv(options?.include_video_language),
			language: options?.language,
		};

		return this.api.get<Videos>(
			`${BASE_TV}/${id}/videos`,
			withQuery(computedOptions, request),
		);
	}

	/**
	 * Retrieves watch providers for a specific TV show asynchronously.
	 * Powered by JustWatch.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @returns {Promise<WatchProviders>} A Promise that resolves with the watch
	 * providers of the TV show.
	 */
	watchProviders(id: number, request?: RequestConfig): Promise<WatchProviders> {
		return this.api.get<WatchProviders>(
			`${BASE_TV}/${id}/watch/providers`,
			request,
		);
	}

	/**
	 * Retrieves account states for a TV show.
	 *
	 * Requires either `session_id` or `guest_session_id`.
	 */
	accountStates(
		id: number,
		options?: SessionOrGuestSessionOption,
		request?: RequestConfig,
	): Promise<MediaAccountStates> {
		return this.api.get<MediaAccountStates>(
			`${BASE_TV}/${id}/account_states`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves lists containing a TV show.
	 */
	lists(
		id: number,
		options?: LanguageOption & PageOption,
		request?: RequestConfig,
	): Promise<MovieLists> {
		return this.api.get<MovieLists>(
			`${BASE_TV}/${id}/lists`,
			withQuery(options, request),
		);
	}

	/**
	 * Adds or updates the authenticated user's rating for a TV show.
	 */
	addRating(
		id: number,
		input: number | RatingBody,
		options?: SessionOrGuestSessionOption,
		request?: RequestConfig,
	): Promise<StatusResponse> {
		const body = typeof input === "number" ? { value: input } : input;

		return this.api.post<StatusResponse>(
			`${BASE_TV}/${id}/rating`,
			body,
			withQuery(options, request),
		);
	}

	/**
	 * Deletes the authenticated user's rating for a TV show.
	 */
	deleteRating(
		id: number,
		options?: SessionOrGuestSessionOption,
		request?: RequestConfig,
	): Promise<StatusResponse> {
		return this.api.delete<StatusResponse>(
			`${BASE_TV}/${id}/rating`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves the latest TV show asynchronously.
	 *
	 * @returns {Promise<Latesttv>} A Promise that resolves with the latest TV
	 * show.
	 */
	latest(request?: RequestConfig): Promise<Latesttv> {
		return this.api.get<Latesttv>(`${BASE_TV}/latest`, request);
	}

	/**
	 * Retrieves TV shows that are currently on the air asynchronously.
	 *
	 * @param {PageOption & LanguageOption & TimezoneOption} [options] -
	 * Additional options for the request.
	 * @returns {Promise<OnTheAir>} A Promise that resolves with TV shows
	 * currently on the air.
	 */
	onTheAir(
		options?: PageOption & LanguageOption & TimezoneOption,
		request?: RequestConfig,
	): Promise<OnTheAir> {
		return this.api.get<OnTheAir>(
			`${BASE_TV}/on_the_air`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves TV shows that are airing today asynchronously.
	 *
	 * @param {PageOption & LanguageOption & TimezoneOption} [options] -
	 * Additional options for the request.
	 * @returns {Promise<tvAiringToday>} A Promise that resolves with TV shows
	 * airing today.
	 */
	airingToday(
		options?: PageOption & LanguageOption & TimezoneOption,
		request?: RequestConfig,
	): Promise<tvAiringToday> {
		return this.api.get<tvAiringToday>(
			`${BASE_TV}/airing_today`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves popular TV shows asynchronously.
	 *
	 * @param {PageOption & LanguageOption} [options] - Additional options for
	 * the request.
	 * @returns {Promise<Populartv>} A Promise that resolves with popular TV
	 * shows.
	 */
	popular(
		options?: PageOption & LanguageOption,
		request?: RequestConfig,
	): Promise<Populartv> {
		return this.api.get<Populartv>(
			`${BASE_TV}/popular`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves top-rated TV shows asynchronously.
	 *
	 * @param {PageOption & LanguageOption} [options] - Additional options for
	 * the request.
	 * @returns {Promise<TopRatedtv>} A Promise that resolves with top-rated TV
	 * shows.
	 */
	topRated(
		options?: PageOption & LanguageOption,
		request?: RequestConfig,
	): Promise<TopRatedtv> {
		return this.api.get<TopRatedtv>(
			`${BASE_TV}/top_rated`,
			withQuery(options, request),
		);
	}
}

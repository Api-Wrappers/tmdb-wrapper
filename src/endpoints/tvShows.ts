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
	type OnTheAir,
	type PageOption,
	type Populartv,
	type Recommendations,
	type Reviews,
	type ScreenedTheatrically,
	type SeasonDetails,
	type Similartv,
	type TimezoneOption,
	type TokenType,
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
import { csv } from "../utils";

const BASE_TV = "/tv";

/**
 * Represents an endpoint for accessing TV show-related information.
 */
export class TvShowsEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new TvShowsEndpoint instance.
	 *
	 * @param {TokenType} auth - The authentication configuration.
	 */
	constructor(protected readonly auth: TokenType) {
		super(auth);
	}

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
	): Promise<AppendToResponse<TvShowDetails, T, "tvShow">> {
		const options = {
			append_to_response: csv(appendToResponse),
			language,
		};

		return this.api.get<AppendToResponse<TvShowDetails, T, "tvShow">>(
			`${BASE_TV}/${id}`,
			{ query: options },
		);
	}

	/**
	 * Retrieves alternative titles of a specific TV show asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @returns {Promise<AlternativeTitles>} A Promise that resolves with the
	 * alternative titles of the TV show.
	 */
	alternativeTitles(id: number): Promise<AlternativeTitles> {
		return this.api.get<AlternativeTitles>(
			`${BASE_TV}/${id}/alternative_titles`,
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
	): Promise<Changes<TvShowChangeValue>> {
		return this.api.get<Changes<TvShowChangeValue>>(
			`${BASE_TV}/${id}/changes`,
			{ query: options },
		);
	}

	/**
	 * Retrieves content ratings for a specific TV show asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @returns {Promise<ContentRatings>} A Promise that resolves with the
	 * content ratings of the TV show.
	 */
	contentRatings(id: number): Promise<ContentRatings> {
		return this.api.get<ContentRatings>(`${BASE_TV}/${id}/content_ratings`);
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
	): Promise<AggregateCredits> {
		return this.api.get<AggregateCredits>(
			`${BASE_TV}/${id}/aggregate_credits`,
			{ query: options },
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
	credits(id: number, options?: LanguageOption): Promise<Credits> {
		return this.api.get<Credits>(`${BASE_TV}/${id}/credits`, {
			query: options,
		});
	}

	/**
	 * Retrieves details of a specific season of a TV show asynchronously.
	 *
	 * @param {number} tvId - The ID of the TV show.
	 * @param {number} seasonNumber - The season number.
	 * @returns {Promise<SeasonDetails>} A Promise that resolves with the details
	 * of the season.
	 */
	season(tvId: number, seasonNumber: number): Promise<SeasonDetails> {
		return this.api.get<SeasonDetails>(
			`${BASE_TV}/${tvId}/season/${seasonNumber}`,
		);
	}

	/**
	 * Retrieves episode groups for a specific TV show asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @returns {Promise<EpisodeGroups>} A Promise that resolves with the episode
	 * groups of the TV show.
	 */
	episodeGroups(id: number): Promise<EpisodeGroups> {
		return this.api.get<EpisodeGroups>(`${BASE_TV}/${id}/episode_groups`);
	}

	/**
	 * Retrieves external IDs for a specific TV show asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @returns {Promise<ExternalIds>} A Promise that resolves with the external
	 * IDs of the TV show.
	 */
	externalIds(id: number): Promise<ExternalIds> {
		return this.api.get<ExternalIds>(`${BASE_TV}/${id}/external_ids`);
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
	images(id: number, options?: TvShowImageOptions): Promise<Images> {
		const computedOptions = {
			include_image_language: csv(options?.include_image_language),
			language: options?.language,
		};

		return this.api.get<Images>(`${BASE_TV}/${id}/images`, {
			query: computedOptions,
		});
	}

	/**
	 * Retrieves keywords for a specific TV show asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @returns {Promise<Keywords>} A Promise that resolves with the keywords of
	 * the TV show.
	 */
	keywords(id: number): Promise<Keywords> {
		return this.api.get<Keywords>(`${BASE_TV}/${id}/keywords`);
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
	): Promise<Recommendations> {
		return this.api.get<Recommendations>(`${BASE_TV}/${id}/recommendations`, {
			query: options,
		});
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
	reviews(id: number, options?: LanguageOption & PageOption): Promise<Reviews> {
		return this.api.get<Reviews>(`${BASE_TV}/${id}/reviews`, {
			query: options,
		});
	}

	/**
	 * Retrieves information about whether the TV show was screened theatrically
	 * asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @returns {Promise<ScreenedTheatrically>} A Promise that resolves with
	 * information about theatrical screenings.
	 */
	screenedTheatrically(id: number): Promise<ScreenedTheatrically> {
		return this.api.get<ScreenedTheatrically>(
			`${BASE_TV}/${id}/screened_theatrically`,
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
	): Promise<Similartv> {
		return this.api.get<Similartv>(`${BASE_TV}/${id}/similar`, {
			query: options,
		});
	}

	/**
	 * Retrieves translations for a specific TV show asynchronously.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @returns {Promise<Translations>} A Promise that resolves with the
	 * translations of the TV show.
	 */
	translations(id: number): Promise<Translations> {
		return this.api.get<Translations>(`${BASE_TV}/${id}/translations`);
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
	videos(id: number, options?: TvShowVideoOptions): Promise<Videos> {
		const computedOptions = {
			include_video_language: csv(options?.include_video_language),
			language: options?.language,
		};

		return this.api.get<Videos>(`${BASE_TV}/${id}/videos`, {
			query: computedOptions,
		});
	}

	/**
	 * Retrieves watch providers for a specific TV show asynchronously.
	 * Powered by JustWatch.
	 *
	 * @param {number} id - The ID of the TV show.
	 * @returns {Promise<WatchProviders>} A Promise that resolves with the watch
	 * providers of the TV show.
	 */
	watchProviders(id: number): Promise<WatchProviders> {
		return this.api.get<WatchProviders>(`${BASE_TV}/${id}/watch/providers`);
	}

	/**
	 * Retrieves the latest TV show asynchronously.
	 *
	 * @returns {Promise<Latesttv>} A Promise that resolves with the latest TV
	 * show.
	 */
	latest(): Promise<Latesttv> {
		return this.api.get<Latesttv>(`${BASE_TV}/latest`);
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
	): Promise<OnTheAir> {
		return this.api.get<OnTheAir>(`${BASE_TV}/on_the_air`, {
			query: options,
		});
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
	): Promise<tvAiringToday> {
		return this.api.get<tvAiringToday>(`${BASE_TV}/airing_today`, {
			query: options,
		});
	}

	/**
	 * Retrieves popular TV shows asynchronously.
	 *
	 * @param {PageOption & LanguageOption} [options] - Additional options for
	 * the request.
	 * @returns {Promise<Populartv>} A Promise that resolves with popular TV
	 * shows.
	 */
	popular(options?: PageOption & LanguageOption): Promise<Populartv> {
		return this.api.get<Populartv>(`${BASE_TV}/popular`, {
			query: options,
		});
	}

	/**
	 * Retrieves top-rated TV shows asynchronously.
	 *
	 * @param {PageOption & LanguageOption} [options] - Additional options for
	 * the request.
	 * @returns {Promise<TopRatedtv>} A Promise that resolves with top-rated TV
	 * shows.
	 */
	topRated(options?: PageOption & LanguageOption): Promise<TopRatedtv> {
		return this.api.get<TopRatedtv>(`${BASE_TV}/top_rated`, {
			query: options,
		});
	}
}

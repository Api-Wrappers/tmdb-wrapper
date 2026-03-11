import {
	type AggregateCredits,
	type AppendToResponse,
	type AppendToResponseTvSeasonKey,
	BaseEndpoint,
	type ChangeOption,
	type Changes,
	type Credits,
	type ExternalIds,
	type Images,
	type LanguageOption,
	type SeasonDetails,
	type SeasonSelection,
	type TokenType,
	type Translations,
	type TvSeasonChangeValue,
	type TvSeasonImageSearchOptions,
	type TvSeasonVideoSearchOptions,
	type Videos,
} from "../@types";
import { csv, type RequestConfig, withQuery } from "../utils";

const BASE_SEASON = (seasonSelection: SeasonSelection): string => {
	return `/tv/${seasonSelection.tvShowID}/season/${seasonSelection.seasonNumber}`;
};

/**
 * Represents an endpoint for accessing TV season-related information.
 */
export class TvSeasonsEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new TvSeasonsEndpoint instance.
	 *
	 * @param {TokenType} auth - The authentication configuration.
	 */
	constructor(protected readonly auth: TokenType) {
		super(auth);
	}

	/**
	 * Retrieves details of a specific TV season asynchronously.
	 *
	 * @param {SeasonSelection} seasonSelection - The selection criteria for the
	 * TV season.
	 * @param {AppendToResponseTvSeasonKey[]} [appendToResponse] - Additional
	 * data to append to the response.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<AppendToResponse<SeasonDetails, T, "tvSeason">>} A
	 * Promise that resolves with the details of the TV season.
	 */
	details<T extends AppendToResponseTvSeasonKey[] | undefined>(
		seasonSelection: SeasonSelection,
		appendToResponse?: T,
		options?: LanguageOption,
		request?: RequestConfig,
	): Promise<AppendToResponse<SeasonDetails, T, "tvSeason">> {
		const query = {
			append_to_response: csv(appendToResponse),
			...options,
		};

		return this.api.get<AppendToResponse<SeasonDetails, T, "tvSeason">>(
			BASE_SEASON(seasonSelection),
			withQuery(query, request),
		);
	}

	/**
	 * Retrieves aggregate credits for a specific TV season asynchronously.
	 *
	 * @param {SeasonSelection} seasonSelection - The selection criteria for the
	 * TV season.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<AggregateCredits>} A Promise that resolves with the
	 * aggregate credits for the TV season.
	 */
	aggregateCredits(
		seasonSelection: SeasonSelection,
		options?: LanguageOption,
		request?: RequestConfig,
	): Promise<AggregateCredits> {
		return this.api.get<AggregateCredits>(
			`${BASE_SEASON(seasonSelection)}/aggregate_credits`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves changes related to a specific TV season asynchronously.
	 *
	 * @param {number} seasonId - The ID of the TV season.
	 * @param {ChangeOption} [options] - Optional parameters for specifying
	 * changes.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Changes<TvSeasonChangeValue>>} A Promise that resolves
	 * with the changes related to the TV season.
	 */
	changes(
		seasonId: number,
		options?: ChangeOption,
		request?: RequestConfig,
	): Promise<Changes<TvSeasonChangeValue>> {
		return this.api.get<Changes<TvSeasonChangeValue>>(
			`/tv/season/${seasonId}/changes`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves credits for a specific TV season asynchronously.
	 *
	 * @param {SeasonSelection} seasonSelection - The selection criteria for the
	 * TV season.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Credits>} A Promise that resolves with the credits for
	 * the TV season.
	 */
	credits(
		seasonSelection: SeasonSelection,
		options?: LanguageOption,
		request?: RequestConfig,
	): Promise<Credits> {
		return this.api.get<Credits>(
			`${BASE_SEASON(seasonSelection)}/credits`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves external IDs for a specific TV season asynchronously.
	 *
	 * @param {SeasonSelection} seasonSelection - The selection criteria for the
	 * TV season.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<ExternalIds>} A Promise that resolves with the external
	 * IDs for the TV season.
	 */
	externalIds(
		seasonSelection: SeasonSelection,
		options?: LanguageOption,
		request?: RequestConfig,
	): Promise<ExternalIds> {
		return this.api.get<ExternalIds>(
			`${BASE_SEASON(seasonSelection)}/external_ids`,
			withQuery(options, request),
		);
	}

	/**
	 * Retrieves images for a specific TV season asynchronously.
	 *
	 * @param {SeasonSelection} seasonSelection - The selection criteria for the
	 * TV season.
	 * @param {TvSeasonImageSearchOptions} [options] - Optional parameters for
	 * specifying image search options.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Images>} A Promise that resolves with the images for the
	 * TV season.
	 */
	images(
		seasonSelection: SeasonSelection,
		options?: TvSeasonImageSearchOptions,
		request?: RequestConfig,
	): Promise<Images> {
		const query = {
			include_image_language: csv(options?.include_image_language),
			language: options?.language,
		};

		return this.api.get<Images>(
			`${BASE_SEASON(seasonSelection)}/images`,
			withQuery(query, request),
		);
	}

	/**
	 * Retrieves videos for a specific TV season asynchronously.
	 *
	 * @param {SeasonSelection} seasonSelection - The selection criteria for the
	 * TV season.
	 * @param {TvSeasonVideoSearchOptions} [options] - Optional parameters for
	 * specifying video search options.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Videos>} A Promise that resolves with the videos for the
	 * TV season.
	 */
	videos(
		seasonSelection: SeasonSelection,
		options?: TvSeasonVideoSearchOptions,
		request?: RequestConfig,
	): Promise<Videos> {
		const query = {
			include_video_language: csv(options?.include_video_language),
			language: options?.language,
		};

		return this.api.get<Videos>(
			`${BASE_SEASON(seasonSelection)}/videos`,
			withQuery(query, request),
		);
	}

	/**
	 * Retrieves translations for a specific TV season asynchronously.
	 *
	 * @param {SeasonSelection} seasonSelection - The selection criteria for the
	 * TV season.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Translations>} A Promise that resolves with the
	 * translations for the TV season.
	 */
	translations(
		seasonSelection: SeasonSelection,
		options?: LanguageOption,
		request?: RequestConfig,
	): Promise<Translations> {
		return this.api.get<Translations>(
			`${BASE_SEASON(seasonSelection)}/translations`,
			withQuery(options, request),
		);
	}
}

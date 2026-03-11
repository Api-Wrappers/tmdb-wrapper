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
	 * @returns {Promise<AppendToResponse<SeasonDetails, T, "tvSeason">>} A
	 * Promise that resolves with the details of the TV season.
	 */
	details<T extends AppendToResponseTvSeasonKey[] | undefined>(
		seasonSelection: SeasonSelection,
		appendToResponse?: T,
		options?: LanguageOption,
	): Promise<AppendToResponse<SeasonDetails, T, "tvSeason">> {
		const combinedOptions = {
			append_to_response: appendToResponse
				? appendToResponse.join(",")
				: undefined,
			...options,
		};

		return this.api.get<AppendToResponse<SeasonDetails, T, "tvSeason">>(
			BASE_SEASON(seasonSelection),
			{ query: combinedOptions },
		);
	}

	/**
	 * Retrieves aggregate credits for a specific TV season asynchronously.
	 *
	 * @param {SeasonSelection} seasonSelection - The selection criteria for the
	 * TV season.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @returns {Promise<AggregateCredits>} A Promise that resolves with the
	 * aggregate credits for the TV season.
	 */
	aggregateCredits(
		seasonSelection: SeasonSelection,
		options?: LanguageOption,
	): Promise<AggregateCredits> {
		return this.api.get<AggregateCredits>(
			`${BASE_SEASON(seasonSelection)}/aggregate_credits`,
			{ query: options },
		);
	}

	/**
	 * Retrieves changes related to a specific TV season asynchronously.
	 *
	 * @param {number} seasonId - The ID of the TV season.
	 * @param {ChangeOption} [options] - Optional parameters for specifying
	 * changes.
	 * @returns {Promise<Changes<TvSeasonChangeValue>>} A Promise that resolves
	 * with the changes related to the TV season.
	 */
	changes(
		seasonId: number,
		options?: ChangeOption,
	): Promise<Changes<TvSeasonChangeValue>> {
		return this.api.get<Changes<TvSeasonChangeValue>>(
			`/tv/season/${seasonId}/changes`,
			{ query: options },
		);
	}

	/**
	 * Retrieves credits for a specific TV season asynchronously.
	 *
	 * @param {SeasonSelection} seasonSelection - The selection criteria for the
	 * TV season.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @returns {Promise<Credits>} A Promise that resolves with the credits for
	 * the TV season.
	 */
	credits(
		seasonSelection: SeasonSelection,
		options?: LanguageOption,
	): Promise<Credits> {
		return this.api.get<Credits>(`${BASE_SEASON(seasonSelection)}/credits`, {
			query: options,
		});
	}

	/**
	 * Retrieves external IDs for a specific TV season asynchronously.
	 *
	 * @param {SeasonSelection} seasonSelection - The selection criteria for the
	 * TV season.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @returns {Promise<ExternalIds>} A Promise that resolves with the external
	 * IDs for the TV season.
	 */
	externalIds(
		seasonSelection: SeasonSelection,
		options?: LanguageOption,
	): Promise<ExternalIds> {
		return this.api.get<ExternalIds>(
			`${BASE_SEASON(seasonSelection)}/external_ids`,
			{ query: options },
		);
	}

	/**
	 * Retrieves images for a specific TV season asynchronously.
	 *
	 * @param {SeasonSelection} seasonSelection - The selection criteria for the
	 * TV season.
	 * @param {TvSeasonImageSearchOptions} [options] - Optional parameters for
	 * specifying image search options.
	 * @returns {Promise<Images>} A Promise that resolves with the images for the
	 * TV season.
	 */
	images(
		seasonSelection: SeasonSelection,
		options?: TvSeasonImageSearchOptions,
	): Promise<Images> {
		const computedOptions = {
			include_image_language: options?.include_image_language?.join(","),
			language: options?.language,
		};

		return this.api.get<Images>(`${BASE_SEASON(seasonSelection)}/images`, {
			query: computedOptions,
		});
	}

	/**
	 * Retrieves videos for a specific TV season asynchronously.
	 *
	 * @param {SeasonSelection} seasonSelection - The selection criteria for the
	 * TV season.
	 * @param {TvSeasonVideoSearchOptions} [options] - Optional parameters for
	 * specifying video search options.
	 * @returns {Promise<Videos>} A Promise that resolves with the videos for the
	 * TV season.
	 */
	videos(
		seasonSelection: SeasonSelection,
		options?: TvSeasonVideoSearchOptions,
	): Promise<Videos> {
		const computedOptions = {
			include_video_language: options?.include_video_language?.join(","),
			language: options?.language,
		};

		return this.api.get<Videos>(`${BASE_SEASON(seasonSelection)}/videos`, {
			query: computedOptions,
		});
	}

	/**
	 * Retrieves translations for a specific TV season asynchronously.
	 *
	 * @param {SeasonSelection} seasonSelection - The selection criteria for the
	 * TV season.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @returns {Promise<Translations>} A Promise that resolves with the
	 * translations for the TV season.
	 */
	translations(
		seasonSelection: SeasonSelection,
		options?: LanguageOption,
	): Promise<Translations> {
		return this.api.get<Translations>(
			`${BASE_SEASON(seasonSelection)}/translations`,
			{ query: options },
		);
	}
}

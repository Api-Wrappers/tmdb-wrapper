import {
  AggregateCredits,
  AppendToResponse,
  AppendToResponseTvSeasonKey,
  BaseEndpoint,
  ChangeOption,
  Changes,
  Credits,
  ExternalIds,
  Images,
  LanguageOption,
  SeasonDetails,
  SeasonSelection,
  Translations,
  TvSeasonChangeValue,
  TvSeasonImageSearchOptions,
  TvSeasonVideoSearchOptions,
  Videos,
} from '../@types';

const BASE_SEASON = (seasonSelection: SeasonSelection): string => {
  return `/tv/${seasonSelection.tvShowID}/season/${seasonSelection.seasonNumber}`;
};

/**
 * Represents an endpoint for accessing TV season-related information.
 */
export class TvSeasonsEndpoint extends BaseEndpoint {
  /**
   * Constructs a new TvSeasonsEndpoint instance.
   * @param {string} access_token - The access token used for authentication.
   */
  constructor(access_token: string) {
    super(access_token);
  }

  /**
   * Retrieves details of a specific TV season asynchronously.
   * @param {SeasonSelection} seasonSelection - The selection criteria for the TV season.
   * @param {AppendToResponseTvSeasonKey[]} [appendToResponse] - Additional data to append to the response.
   * @param {LanguageOption} [options] - Optional parameters for specifying the language.
   * @returns {Promise<AppendToResponse<SeasonDetails, AppendToResponseTvSeasonKey[], 'tvSeason'>>}
   * A Promise that resolves with the details of the TV season.
   */
  async details<T extends AppendToResponseTvSeasonKey[] | undefined>(
    seasonSelection: SeasonSelection,
    appendToResponse?: T,
    options?: LanguageOption,
  ) {
    const combinedOptions = {
      append_to_response: appendToResponse ? appendToResponse.join(',') : undefined,
      ...options,
    };

    return await this.api.get<AppendToResponse<SeasonDetails, T, 'tvSeason'>>(
      `${BASE_SEASON(seasonSelection)}`,
      combinedOptions,
    );
  }

  /**
   * Retrieves aggregate credits for a specific TV season asynchronously.
   * @param {SeasonSelection} seasonSelection - The selection criteria for the TV season.
   * @param {LanguageOption} [options] - Optional parameters for specifying the language.
   * @returns {Promise<AggregateCredits>} A Promise that resolves with the aggregate credits for the TV season.
   */
  async aggregateCredits(seasonSelection: SeasonSelection, options?: LanguageOption) {
    return await this.api.get<AggregateCredits>(`${BASE_SEASON(seasonSelection)}/aggregate_credits`, options);
  }

  /**
   * Retrieves changes related to a specific TV season asynchronously.
   * @param {number} seasonId - The ID of the TV season.
   * @param {ChangeOption} [options] - Optional parameters for specifying changes.
   * @returns {Promise<Changes<TvSeasonChangeValue>>} A Promise that resolves with the changes related to the TV season.
   */
  async changes(seasonId: number, options?: ChangeOption) {
    return await this.api.get<Changes<TvSeasonChangeValue>>(`/tv/season/${seasonId}/changes`, options);
  }

  /**
   * Retrieves credits for a specific TV season asynchronously.
   * @param {SeasonSelection} seasonSelection - The selection criteria for the TV season.
   * @param {LanguageOption} [options] - Optional parameters for specifying the language.
   * @returns {Promise<Credits>} A Promise that resolves with the credits for the TV season.
   */
  async credits(seasonSelection: SeasonSelection, options?: LanguageOption) {
    return await this.api.get<Credits>(`${BASE_SEASON(seasonSelection)}/credits`, options);
  }

  /**
   * Retrieves external IDs for a specific TV season asynchronously.
   * @param {SeasonSelection} seasonSelection - The selection criteria for the TV season.
   * @param {LanguageOption} [options] - Optional parameters for specifying the language.
   * @returns {Promise<ExternalIds>} A Promise that resolves with the external IDs for the TV season.
   */
  async externalIds(seasonSelection: SeasonSelection, options?: LanguageOption) {
    return await this.api.get<ExternalIds>(`${BASE_SEASON(seasonSelection)}/external_ids`, options);
  }

  /**
   * Retrieves images for a specific TV season asynchronously.
   * @param {SeasonSelection} seasonSelection - The selection criteria for the TV season.
   * @param {TvSeasonImageSearchOptions} [options] - Optional parameters for specifying image search options.
   * @returns {Promise<Images>} A Promise that resolves with the images for the TV season.
   */
  async images(seasonSelection: SeasonSelection, options?: TvSeasonImageSearchOptions) {
    const computedOptions = {
      include_image_language: options?.include_image_language?.join(','),
      language: options?.language,
    };
    return await this.api.get<Images>(`${BASE_SEASON(seasonSelection)}/images`, computedOptions);
  }

  /**
   * Retrieves videos for a specific TV season asynchronously.
   * @param {SeasonSelection} seasonSelection - The selection criteria for the TV season.
   * @param {TvSeasonVideoSearchOptions} [options] - Optional parameters for specifying video search options.
   * @returns {Promise<Videos>} A Promise that resolves with the videos for the TV season.
   */
  async videos(seasonSelection: SeasonSelection, options?: TvSeasonVideoSearchOptions) {
    const computedOptions = {
      include_video_language: options?.include_video_language?.join(','),
      language: options?.language,
    };
    return await this.api.get<Videos>(`${BASE_SEASON(seasonSelection)}/videos`, computedOptions);
  }

  /**
   * Retrieves translations for a specific TV season asynchronously.
   * @param {SeasonSelection} seasonSelection - The selection criteria for the TV season.
   * @param {LanguageOption} [options] - Optional parameters for specifying the language.
   * @returns {Promise<Translations>} A Promise that resolves with the translations for the TV season.
   */
  async translations(seasonSelection: SeasonSelection, options?: LanguageOption) {
    return await this.api.get<Translations>(`${BASE_SEASON(seasonSelection)}/translations`, options);
  }
}

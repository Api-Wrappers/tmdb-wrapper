import {
  AppendToResponse,
  AppendToResponseTvEpisodeKey,
  BaseEndpoint,
  ChangeOption,
  Changes,
  Episode,
  EpisodeSelection,
  ExternalIds,
  Images,
  LanguageOption,
  TvEpisodeChangeValue,
  TvEpisodeCredit,
  TvEpisodeImageSearchOptions,
  TvEpisodeTranslations,
  TvEpisodeVideoSearchOptions,
  Videos,
} from '@/@types';

const BASE_EPISODE = (episodeSelection: EpisodeSelection): string => {
  return `/tv/${episodeSelection.tvShowID}/season/${episodeSelection.seasonNumber}/episode/${episodeSelection.episodeNumber}`;
};

/**
 * Represents an endpoint for accessing TV episode-related information.
 */
export class TvEpisodesEndpoint extends BaseEndpoint {
  /**
   * Constructs a new TvEpisodesEndpoint instance.
   * @param {string} access_token - The access token used for authentication.
   */
  constructor(access_token: string) {
    super(access_token);
  }

  /**
   * Retrieves details of a specific TV episode asynchronously.
   * @param {EpisodeSelection} episodeSelection - The selection criteria for the TV episode.
   * @param {AppendToResponseTvEpisodeKey[]} [appendToResponse] - Additional data to append to the response.
   * @param {LanguageOption} [options] - Optional parameters for specifying the language.
   * @returns {Promise<AppendToResponse<Omit<Episode, 'show_id'>, AppendToResponseTvEpisodeKey[], 'tvEpisode'>>}
   * A Promise that resolves with the details of the TV episode.
   */
  async details<T extends AppendToResponseTvEpisodeKey[] | undefined>(
    episodeSelection: EpisodeSelection,
    appendToResponse?: T,
    options?: LanguageOption,
  ) {
    const combinedOptions = {
      append_to_response: appendToResponse ? appendToResponse.join(',') : undefined,
      ...options,
    };

    return await this.api.get<AppendToResponse<Omit<Episode, 'show_id'>, T, 'tvEpisode'>>(
      `${BASE_EPISODE(episodeSelection)}`,
      combinedOptions,
    );
  }

  /**
   * Retrieves changes related to a specific TV episode asynchronously.
   * @param {number} episodeID - The ID of the TV episode.
   * @param {ChangeOption} [options] - Optional parameters for specifying changes.
   * @returns {Promise<Changes<TvEpisodeChangeValue>>} A Promise that resolves with the changes related to the TV episode.
   */
  async changes(episodeID: number, options?: ChangeOption) {
    return await this.api.get<Changes<TvEpisodeChangeValue>>(`/tv/episode/${episodeID}/changes`, options);
  }

  /**
   * Retrieves credits for a specific TV episode asynchronously.
   * @param {EpisodeSelection} episodeSelection - The selection criteria for the TV episode.
   * @param {LanguageOption} [options] - Optional parameters for specifying the language.
   * @returns {Promise<TvEpisodeCredit>} A Promise that resolves with the credits for the TV episode.
   */
  async credits(episodeSelection: EpisodeSelection, options?: LanguageOption) {
    return await this.api.get<TvEpisodeCredit>(`${BASE_EPISODE(episodeSelection)}/credits`, options);
  }

  /**
   * Retrieves external IDs for a specific TV episode asynchronously.
   * @param {EpisodeSelection} episodeSelection - The selection criteria for the TV episode.
   * @returns {Promise<ExternalIds>} A Promise that resolves with the external IDs for the TV episode.
   */
  async externalIds(episodeSelection: EpisodeSelection) {
    return await this.api.get<ExternalIds>(`${BASE_EPISODE(episodeSelection)}/external_ids`);
  }

  /**
   * Retrieves images for a specific TV episode asynchronously.
   * @param {EpisodeSelection} episodeSelection - The selection criteria for the TV episode.
   * @param {TvEpisodeImageSearchOptions} [options] - Optional parameters for specifying image search options.
   * @returns {Promise<Images>} A Promise that resolves with the images for the TV episode.
   */
  async images(episodeSelection: EpisodeSelection, options?: TvEpisodeImageSearchOptions) {
    const computedOptions = {
      include_image_language: options?.include_image_language?.join(','),
      language: options?.language,
    };
    return await this.api.get<Images>(`${BASE_EPISODE(episodeSelection)}/images`, computedOptions);
  }

  /**
   * Retrieves translations for a specific TV episode asynchronously.
   * @param {EpisodeSelection} episodeSelection - The selection criteria for the TV episode.
   * @returns {Promise<TvEpisodeTranslations>} A Promise that resolves with the translations for the TV episode.
   */
  async translations(episodeSelection: EpisodeSelection) {
    return await this.api.get<TvEpisodeTranslations>(`${BASE_EPISODE(episodeSelection)}/translations`);
  }

  /**
   * Retrieves videos for a specific TV episode asynchronously.
   * @param {EpisodeSelection} episodeSelection - The selection criteria for the TV episode.
   * @param {TvEpisodeVideoSearchOptions} [options] - Optional parameters for specifying video search options.
   * @returns {Promise<Videos>} A Promise that resolves with the videos for the TV episode.
   */
  async videos(episodeSelection: EpisodeSelection, options?: TvEpisodeVideoSearchOptions) {
    const computedOptions = {
      include_video_language: options?.include_video_language?.join(','),
      language: options?.language,
    };
    return await this.api.get<Videos>(`${BASE_EPISODE(episodeSelection)}/videos`, computedOptions);
  }
}

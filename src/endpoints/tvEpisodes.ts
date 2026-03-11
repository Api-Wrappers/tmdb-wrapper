import {
	type AppendToResponse,
	type AppendToResponseTvEpisodeKey,
	BaseEndpoint,
	type ChangeOption,
	type Changes,
	type Episode,
	type EpisodeSelection,
	type ExternalIds,
	type Images,
	type LanguageOption,
	type TokenType,
	type TvEpisodeChangeValue,
	type TvEpisodeCredit,
	type TvEpisodeImageSearchOptions,
	type TvEpisodeTranslations,
	type TvEpisodeVideoSearchOptions,
	type Videos,
} from "../@types";

const BASE_EPISODE = (episodeSelection: EpisodeSelection): string => {
	return `/tv/${episodeSelection.tvShowID}/season/${episodeSelection.seasonNumber}/episode/${episodeSelection.episodeNumber}`;
};

/**
 * Represents an endpoint for accessing TV episode-related information.
 */
export class TvEpisodesEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new TvEpisodesEndpoint instance.
	 *
	 * @param {TokenType} auth - The authentication configuration.
	 */
	constructor(protected readonly auth: TokenType) {
		super(auth);
	}

	/**
	 * Retrieves details of a specific TV episode asynchronously.
	 *
	 * @param {EpisodeSelection} episodeSelection - The selection criteria for
	 * the TV episode.
	 * @param {AppendToResponseTvEpisodeKey[]} [appendToResponse] - Additional
	 * data to append to the response.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @returns {Promise<AppendToResponse<Omit<Episode, "show_id">, T,
	 * "tvEpisode">>} A Promise that resolves with the details of the TV
	 * episode.
	 */
	details<T extends AppendToResponseTvEpisodeKey[] | undefined>(
		episodeSelection: EpisodeSelection,
		appendToResponse?: T,
		options?: LanguageOption,
	): Promise<AppendToResponse<Omit<Episode, "show_id">, T, "tvEpisode">> {
		const combinedOptions = {
			append_to_response: appendToResponse
				? appendToResponse.join(",")
				: undefined,
			...options,
		};

		return this.api.get<
			AppendToResponse<Omit<Episode, "show_id">, T, "tvEpisode">
		>(BASE_EPISODE(episodeSelection), { query: combinedOptions });
	}

	/**
	 * Retrieves changes related to a specific TV episode asynchronously.
	 *
	 * @param {number} episodeID - The ID of the TV episode.
	 * @param {ChangeOption} [options] - Optional parameters for specifying
	 * changes.
	 * @returns {Promise<Changes<TvEpisodeChangeValue>>} A Promise that resolves
	 * with the changes related to the TV episode.
	 */
	changes(
		episodeID: number,
		options?: ChangeOption,
	): Promise<Changes<TvEpisodeChangeValue>> {
		return this.api.get<Changes<TvEpisodeChangeValue>>(
			`/tv/episode/${episodeID}/changes`,
			{ query: options },
		);
	}

	/**
	 * Retrieves credits for a specific TV episode asynchronously.
	 *
	 * @param {EpisodeSelection} episodeSelection - The selection criteria for
	 * the TV episode.
	 * @param {LanguageOption} [options] - Optional parameters for specifying the
	 * language.
	 * @returns {Promise<TvEpisodeCredit>} A Promise that resolves with the
	 * credits for the TV episode.
	 */
	credits(
		episodeSelection: EpisodeSelection,
		options?: LanguageOption,
	): Promise<TvEpisodeCredit> {
		return this.api.get<TvEpisodeCredit>(
			`${BASE_EPISODE(episodeSelection)}/credits`,
			{ query: options },
		);
	}

	/**
	 * Retrieves external IDs for a specific TV episode asynchronously.
	 *
	 * @param {EpisodeSelection} episodeSelection - The selection criteria for
	 * the TV episode.
	 * @returns {Promise<ExternalIds>} A Promise that resolves with the external
	 * IDs for the TV episode.
	 */
	externalIds(episodeSelection: EpisodeSelection): Promise<ExternalIds> {
		return this.api.get<ExternalIds>(
			`${BASE_EPISODE(episodeSelection)}/external_ids`,
		);
	}

	/**
	 * Retrieves images for a specific TV episode asynchronously.
	 *
	 * @param {EpisodeSelection} episodeSelection - The selection criteria for
	 * the TV episode.
	 * @param {TvEpisodeImageSearchOptions} [options] - Optional parameters for
	 * specifying image search options.
	 * @returns {Promise<Images>} A Promise that resolves with the images for the
	 * TV episode.
	 */
	images(
		episodeSelection: EpisodeSelection,
		options?: TvEpisodeImageSearchOptions,
	): Promise<Images> {
		const computedOptions = {
			include_image_language: options?.include_image_language?.join(","),
			language: options?.language,
		};

		return this.api.get<Images>(`${BASE_EPISODE(episodeSelection)}/images`, {
			query: computedOptions,
		});
	}

	/**
	 * Retrieves translations for a specific TV episode asynchronously.
	 *
	 * @param {EpisodeSelection} episodeSelection - The selection criteria for
	 * the TV episode.
	 * @returns {Promise<TvEpisodeTranslations>} A Promise that resolves with the
	 * translations for the TV episode.
	 */
	translations(
		episodeSelection: EpisodeSelection,
	): Promise<TvEpisodeTranslations> {
		return this.api.get<TvEpisodeTranslations>(
			`${BASE_EPISODE(episodeSelection)}/translations`,
		);
	}

	/**
	 * Retrieves videos for a specific TV episode asynchronously.
	 *
	 * @param {EpisodeSelection} episodeSelection - The selection criteria for
	 * the TV episode.
	 * @param {TvEpisodeVideoSearchOptions} [options] - Optional parameters for
	 * specifying video search options.
	 * @returns {Promise<Videos>} A Promise that resolves with the videos for the
	 * TV episode.
	 */
	videos(
		episodeSelection: EpisodeSelection,
		options?: TvEpisodeVideoSearchOptions,
	): Promise<Videos> {
		const computedOptions = {
			include_video_language: options?.include_video_language?.join(","),
			language: options?.language,
		};

		return this.api.get<Videos>(`${BASE_EPISODE(episodeSelection)}/videos`, {
			query: computedOptions,
		});
	}
}

import {
	BaseEndpoint,
	type LanguageOption,
	type PageOption,
	type TimeWindow,
	type TokenType,
	type TrendingMediaType,
	type TrendingResults,
} from "../@types";

/**
 * Represents an endpoint for retrieving trending content.
 */
export class TrendingEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new TrendingEndpoint instance.
	 * @param {string} access_token - The access token used for authentication.
	 */
	constructor(protected readonly access_token: TokenType) {
		super(access_token);
	}

	/**
	 * Retrieves trending content asynchronously based on media type and time window.
	 * @param {TrendingMediaType} mediaType - The type of media (e.g., 'all', 'movie', 'tv').
	 * @param {TimeWindow} timeWindow - The time window for trending content (e.g., 'day', 'week').
	 * @param {LanguageOption & PageOption} [options] - Optional parameters for specifying the language and pagination.
	 * @returns {Promise<TrendingResults<T>>} A Promise that resolves with the trending results.
	 * @template T - The type of media being searched for (e.g., 'movie', 'tv').
	 */
	async trending<T extends TrendingMediaType>(
		mediaType: T,
		timeWindow: TimeWindow,
		options?: LanguageOption & PageOption,
	): Promise<TrendingResults<T>> {
		return await this.api.get<TrendingResults<T>>(
			`/trending/${mediaType}/${timeWindow}`,
			options as Record<string, unknown>,
		);
	}
}

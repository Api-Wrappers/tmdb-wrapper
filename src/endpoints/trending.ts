import {
	BaseEndpoint,
	type LanguageOption,
	type PageOption,
	type TimeWindow,
	type TokenType,
	type TrendingMediaType,
	type TrendingResults,
} from "../@types";
import { type RequestConfig, withQuery } from "../utils";

/**
 * Represents an endpoint for retrieving trending content.
 */
export class TrendingEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new TrendingEndpoint instance.
	 *
	 * @param {TokenType} auth - The authentication configuration.
	 */
	constructor(protected readonly auth: TokenType) {
		super(auth);
	}

	/**
	 * Retrieves trending content asynchronously based on media type and time
	 * window.
	 *
	 * @param {TrendingMediaType} mediaType - The type of media.
	 * @param {TimeWindow} timeWindow - The time window for trending content.
	 * @param {LanguageOption & PageOption} [options] - Optional parameters for
	 * specifying the language and pagination.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<TrendingResults<T>>} A Promise that resolves with the
	 * trending results.
	 * @template T - The type of media being searched for.
	 */
	trending<T extends TrendingMediaType>(
		mediaType: T,
		timeWindow: TimeWindow,
		options?: LanguageOption & PageOption,
		request?: RequestConfig,
	): Promise<TrendingResults<T>> {
		return this.api.get<TrendingResults<T>>(
			`/trending/${mediaType}/${timeWindow}`,
			withQuery(options, request),
		);
	}
}

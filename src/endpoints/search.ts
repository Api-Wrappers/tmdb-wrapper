import {
	BaseEndpoint,
	type Collection,
	type CollectionSearchOptions,
	type Company,
	type Movie,
	type MovieSearchOptions,
	type MultiSearchOptions,
	type MultiSearchResult,
	type PeopleSearchOptions,
	type Person,
	type Search,
	type SearchOptions,
	type TokenType,
	type TV,
	type TvSearchOptions,
} from "../@types";
import { type RequestConfig, withQuery } from "../utils";

const BASE_SEARCH = "/search";

/**
 * Represents an endpoint for performing various search operations.
 */
export class SearchEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new SearchEndpoint instance.
	 *
	 * @param {TokenType} access_token - The access token used for authentication.
	 */
	constructor(protected readonly access_token: TokenType) {
		super(access_token);
	}

	/**
	 * Searches for companies asynchronously.
	 *
	 * @param {SearchOptions} options - The search options.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Search<Company>>} A Promise that resolves with the
	 * search results for companies.
	 */
	companies(
		options: SearchOptions,
		request?: RequestConfig,
	): Promise<Search<Company>> {
		return this.api.get<Search<Company>>(
			`${BASE_SEARCH}/company`,
			withQuery(options, request),
		);
	}

	/**
	 * Searches for collections asynchronously.
	 *
	 * @param {CollectionSearchOptions} options - The search options.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Search<Collection>>} A Promise that resolves with the
	 * search results for collections.
	 */
	collections(
		options: CollectionSearchOptions,
		request?: RequestConfig,
	): Promise<Search<Collection>> {
		return this.api.get<Search<Collection>>(
			`${BASE_SEARCH}/collection`,
			withQuery(options, request),
		);
	}

	/**
	 * Searches for keywords asynchronously.
	 *
	 * @param {SearchOptions} options - The search options.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Search<{ id: string; name: string }>>} A Promise that
	 * resolves with the search results for keywords.
	 */
	keywords(
		options: SearchOptions,
		request?: RequestConfig,
	): Promise<Search<{ id: string; name: string }>> {
		return this.api.get<Search<{ id: string; name: string }>>(
			`${BASE_SEARCH}/keyword`,
			withQuery(options, request),
		);
	}

	/**
	 * Searches for movies asynchronously.
	 *
	 * @param {MovieSearchOptions} options - The search options.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Search<Movie>>} A Promise that resolves with the search
	 * results for movies.
	 */
	movies(
		options: MovieSearchOptions,
		request?: RequestConfig,
	): Promise<Search<Movie>> {
		return this.api.get<Search<Movie>>(
			`${BASE_SEARCH}/movie`,
			withQuery(options, request),
		);
	}

	/**
	 * Searches for people asynchronously.
	 *
	 * @param {PeopleSearchOptions} options - The search options.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Search<Person>>} A Promise that resolves with the search
	 * results for people.
	 */
	people(
		options: PeopleSearchOptions,
		request?: RequestConfig,
	): Promise<Search<Person>> {
		return this.api.get<Search<Person>>(
			`${BASE_SEARCH}/person`,
			withQuery(options, request),
		);
	}

	/**
	 * Searches for TV shows asynchronously.
	 *
	 * @param {TvSearchOptions} options - The search options.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Search<TV>>} A Promise that resolves with the search
	 * results for TV shows.
	 */
	tv(options: TvSearchOptions, request?: RequestConfig): Promise<Search<TV>> {
		return this.api.get<Search<TV>>(
			`${BASE_SEARCH}/tv`,
			withQuery(options, request),
		);
	}

	/**
	 * Performs a multi-search asynchronously.
	 *
	 * @param {MultiSearchOptions} options - The search options.
	 * @param {RequestConfig} [request] - Optional request behavior overrides.
	 * @returns {Promise<Search<MultiSearchResult>>} A Promise that resolves with
	 * the multi-search results.
	 */
	multi(
		options: MultiSearchOptions,
		request?: RequestConfig,
	): Promise<Search<MultiSearchResult>> {
		return this.api.get<Search<MultiSearchResult>>(
			`${BASE_SEARCH}/multi`,
			withQuery(options, request),
		);
	}
}

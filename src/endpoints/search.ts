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
	 * @returns {Promise<Search<Company>>} A Promise that resolves with the
	 * search results for companies.
	 */
	companies(options: SearchOptions): Promise<Search<Company>> {
		return this.api.get<Search<Company>>(`${BASE_SEARCH}/company`, {
			query: options,
		});
	}

	/**
	 * Searches for collections asynchronously.
	 *
	 * @param {CollectionSearchOptions} options - The search options.
	 * @returns {Promise<Search<Collection>>} A Promise that resolves with the
	 * search results for collections.
	 */
	collections(options: CollectionSearchOptions): Promise<Search<Collection>> {
		return this.api.get<Search<Collection>>(`${BASE_SEARCH}/collection`, {
			query: options,
		});
	}

	/**
	 * Searches for keywords asynchronously.
	 *
	 * @param {SearchOptions} options - The search options.
	 * @returns {Promise<Search<{ id: string; name: string }>>} A Promise that
	 * resolves with the search results for keywords.
	 */
	keywords(
		options: SearchOptions,
	): Promise<Search<{ id: string; name: string }>> {
		return this.api.get<Search<{ id: string; name: string }>>(
			`${BASE_SEARCH}/keyword`,
			{ query: options },
		);
	}

	/**
	 * Searches for movies asynchronously.
	 *
	 * @param {MovieSearchOptions} options - The search options.
	 * @returns {Promise<Search<Movie>>} A Promise that resolves with the search
	 * results for movies.
	 */
	movies(options: MovieSearchOptions): Promise<Search<Movie>> {
		return this.api.get<Search<Movie>>(`${BASE_SEARCH}/movie`, {
			query: options,
		});
	}

	/**
	 * Searches for people asynchronously.
	 *
	 * @param {PeopleSearchOptions} options - The search options.
	 * @returns {Promise<Search<Person>>} A Promise that resolves with the search
	 * results for people.
	 */
	people(options: PeopleSearchOptions): Promise<Search<Person>> {
		return this.api.get<Search<Person>>(`${BASE_SEARCH}/person`, {
			query: options,
		});
	}

	/**
	 * Searches for TV shows asynchronously.
	 *
	 * @param {TvSearchOptions} options - The search options.
	 * @returns {Promise<Search<TV>>} A Promise that resolves with the search
	 * results for TV shows.
	 */
	tv(options: TvSearchOptions): Promise<Search<TV>> {
		return this.api.get<Search<TV>>(`${BASE_SEARCH}/tv`, {
			query: options,
		});
	}

	/**
	 * Performs a multi-search asynchronously.
	 *
	 * @param {MultiSearchOptions} options - The search options.
	 * @returns {Promise<Search<MultiSearchResult>>} A Promise that resolves with
	 * the multi-search results.
	 */
	multi(options: MultiSearchOptions): Promise<Search<MultiSearchResult>> {
		return this.api.get<Search<MultiSearchResult>>(`${BASE_SEARCH}/multi`, {
			query: options,
		});
	}
}

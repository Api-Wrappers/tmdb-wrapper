import {
	BaseEndpoint,
	Collection,
	Company,
	Movie,
	MovieSearchOptions,
	MultiSearchOptions,
	MultiSearchResult,
	PeopleSearchOptions,
	Person,
	Search,
	SearchOptions,
	TokenType,
	TV,
	TvSearchOptions,
} from "../@types";

const BASE_SEARCH = "/search";

/**
 * Represents an endpoint for performing various search operations.
 */
export class SearchEndpoint extends BaseEndpoint {
	/**
	 * Constructs a new SearchEndpoint instance.
	 * @param {string} access_token - The access token used for authentication.
	 */
	constructor(protected readonly access_token: TokenType) {
		super(access_token);
	}

	/**
	 * Searches for companies asynchronously.
	 * @param {SearchOptions} options - The search options.
	 * @returns {Promise<Search<Company>>} A Promise that resolves with the search results for companies.
	 */
	async companies(options: SearchOptions): Promise<Search<Company>> {
		return await this.api.get<Search<Company>>(
			`${BASE_SEARCH}/company`,

			options as unknown as Record<string, unknown>,
		);
	}

	/**
	 * Searches for collections asynchronously.
	 * @param {SearchOptions} options - The search options.
	 * @returns {Promise<Search<Collection>>} A Promise that resolves with the search results for collections.
	 */
	async collections(options: SearchOptions): Promise<Search<Collection>> {
		return await this.api.get<Search<Collection>>(
			`${BASE_SEARCH}/collection`,

			options as unknown as Record<string, unknown>,
		);
	}

	/**
	 * Searches for keywords asynchronously.
	 * @param {SearchOptions} options - The search options.
	 * @returns {Promise<Search<{ id: string; name: string }>>} A Promise that resolves with the search results for keywords.
	 */
	async keywords(
		options: SearchOptions,
	): Promise<Search<{ id: string; name: string }>> {
		return await this.api.get<Search<{ id: string; name: string }>>(
			`${BASE_SEARCH}/keyword`,

			options as unknown as Record<string, unknown>,
		);
	}

	/**
	 * Searches for movies asynchronously.
	 * @param {MovieSearchOptions} options - The search options.
	 * @returns {Promise<Search<Movie>>} A Promise that resolves with the search results for movies.
	 */
	async movies(options: MovieSearchOptions): Promise<Search<Movie>> {
		return await this.api.get<Search<Movie>>(
			`${BASE_SEARCH}/movie`,

			options as unknown as Record<string, unknown>,
		);
	}

	/**
	 * Searches for people asynchronously.
	 * @param {PeopleSearchOptions} options - The search options.
	 * @returns {Promise<Search<Person>>} A Promise that resolves with the search results for people.
	 */
	async people(options: PeopleSearchOptions): Promise<Search<Person>> {
		return await this.api.get<Search<Person>>(
			`${BASE_SEARCH}/person`,

			options as unknown as Record<string, unknown>,
		);
	}

	/**
	 * Searches for TV shows asynchronously.
	 * @param {TvSearchOptions} options - The search options.
	 * @returns {Promise<Search<TV>>} A Promise that resolves with the search results for TV shows.
	 */
	async tv(options: TvSearchOptions): Promise<Search<TV>> {
		return await this.api.get<Search<TV>>(
			`${BASE_SEARCH}/tv`,

			options as unknown as Record<string, unknown>,
		);
	}

	/**
	 * Performs a multi-search asynchronously.
	 * @param {MultiSearchOptions} options - The search options.
	 * @returns {Promise<Search<MultiSearchResult>>} A Promise that resolves with the multi-search results.
	 */
	async multi(options: MultiSearchOptions): Promise<Search<MultiSearchResult>> {
		return await this.api.get<Search<MultiSearchResult>>(
			`${BASE_SEARCH}/multi`,

			options as unknown as Record<string, unknown>,
		);
	}
}

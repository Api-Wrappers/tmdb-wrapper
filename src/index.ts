import type { TokenType } from "./@types";
import { TMDBApiClient } from "./client";
import {
	AccountEndpoint,
	AuthenticationEndpoint,
	CertificationEndpoint,
	ChangeEndpoint,
	CollectionsEndpoint,
	CompaniesEndpoint,
	ConfigurationEndpoint,
	CreditsEndpoint,
	DiscoverEndpoint,
	FindEndpoint,
	GenreEndpoint,
	GuestSessionsEndpoint,
	KeywordsEndpoint,
	ListsEndpoint,
	MoviesEndpoint,
	NetworksEndpoint,
	PeopleEndpoint,
	ReviewEndpoint,
	SearchEndpoint,
	TrendingEndpoint,
	TvEpisodeGroupsEndpoint,
	TvEpisodesEndpoint,
	TvSeasonsEndpoint,
	TvShowsEndpoint,
	WatchProvidersEndpoint,
} from "./endpoints";

/** Authentication or an already configured TMDB transport client. */
export type TMDBClientInput = TokenType | TMDBApiClient;

/** Creates or reuses the shared api-core HTTP client used by TMDB endpoints. */
export function createHttpClient(auth: TMDBClientInput): TMDBApiClient {
	return auth instanceof TMDBApiClient ? auth : new TMDBApiClient(auth);
}

/** Creates every endpoint group around one shared TMDB transport client. */
export function createClientBundle(auth: TMDBClientInput) {
	const http = createHttpClient(auth);

	return {
		http,
		account: new AccountEndpoint(http),
		authentication: new AuthenticationEndpoint(http),
		certification: new CertificationEndpoint(http),
		changes: new ChangeEndpoint(http),
		collections: new CollectionsEndpoint(http),
		companies: new CompaniesEndpoint(http),
		configuration: new ConfigurationEndpoint(http),
		credits: new CreditsEndpoint(http),
		discover: new DiscoverEndpoint(http),
		find: new FindEndpoint(http),
		genre: new GenreEndpoint(http),
		guestSessions: new GuestSessionsEndpoint(http),
		keywords: new KeywordsEndpoint(http),
		lists: new ListsEndpoint(http),
		movies: new MoviesEndpoint(http),
		networks: new NetworksEndpoint(http),
		people: new PeopleEndpoint(http),
		review: new ReviewEndpoint(http),
		search: new SearchEndpoint(http),
		trending: new TrendingEndpoint(http),
		tvEpisodeGroups: new TvEpisodeGroupsEndpoint(http),
		tvEpisodes: new TvEpisodesEndpoint(http),
		tvSeasons: new TvSeasonsEndpoint(http),
		tvShows: new TvShowsEndpoint(http),
		watchProviders: new WatchProvidersEndpoint(http),
	};
}

export type TMDBClientBundle = ReturnType<typeof createClientBundle>;

class TMDB {
	readonly http: TMDBApiClient;
	readonly account: AccountEndpoint;
	readonly authentication: AuthenticationEndpoint;
	readonly certification: CertificationEndpoint;
	readonly changes: ChangeEndpoint;
	readonly collections: CollectionsEndpoint;
	readonly companies: CompaniesEndpoint;
	readonly configuration: ConfigurationEndpoint;
	readonly credits: CreditsEndpoint;
	readonly discover: DiscoverEndpoint;
	readonly find: FindEndpoint;
	readonly genre: GenreEndpoint;
	readonly guestSessions: GuestSessionsEndpoint;
	readonly keywords: KeywordsEndpoint;
	readonly lists: ListsEndpoint;
	readonly movies: MoviesEndpoint;
	readonly networks: NetworksEndpoint;
	readonly people: PeopleEndpoint;
	readonly review: ReviewEndpoint;
	readonly search: SearchEndpoint;
	readonly trending: TrendingEndpoint;
	readonly tvEpisodeGroups: TvEpisodeGroupsEndpoint;
	readonly tvEpisodes: TvEpisodesEndpoint;
	readonly tvSeasons: TvSeasonsEndpoint;
	readonly tvShows: TvShowsEndpoint;
	readonly watchProviders: WatchProvidersEndpoint;

	constructor(auth: TMDBClientInput) {
		const bundle = createClientBundle(auth);

		this.http = bundle.http;
		this.account = bundle.account;
		this.authentication = bundle.authentication;
		this.certification = bundle.certification;
		this.changes = bundle.changes;
		this.collections = bundle.collections;
		this.companies = bundle.companies;
		this.configuration = bundle.configuration;
		this.credits = bundle.credits;
		this.discover = bundle.discover;
		this.find = bundle.find;
		this.genre = bundle.genre;
		this.guestSessions = bundle.guestSessions;
		this.keywords = bundle.keywords;
		this.lists = bundle.lists;
		this.movies = bundle.movies;
		this.networks = bundle.networks;
		this.people = bundle.people;
		this.review = bundle.review;
		this.search = bundle.search;
		this.trending = bundle.trending;
		this.tvEpisodeGroups = bundle.tvEpisodeGroups;
		this.tvEpisodes = bundle.tvEpisodes;
		this.tvSeasons = bundle.tvSeasons;
		this.tvShows = bundle.tvShows;
		this.watchProviders = bundle.watchProviders;
	}

	/** Disposes resources owned by the shared api-core HTTP client. */
	dispose(): Promise<void> {
		return this.http.dispose();
	}
}

export type {
	ApiCoreError,
	ApiPlugin,
	ApiResponse,
	ClientConfig,
	HeaderInput,
	QueryParams,
	RequestOptions,
	RetryConfig,
} from "@api-wrappers/api-core";
export {
	ApiError,
	isApiCoreError,
	isApiError,
	isRateLimitError,
	isTimeoutError,
	RateLimitError,
	TimeoutError,
} from "@api-wrappers/api-core";

export * from "./@types";
export * from "./utils";
export { TMDB, TMDBApiClient };

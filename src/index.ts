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

class TMDB {
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

	constructor(auth: TokenType) {
		const api = new TMDBApiClient(auth);

		this.account = new AccountEndpoint(api);
		this.authentication = new AuthenticationEndpoint(api);
		this.certification = new CertificationEndpoint(api);
		this.changes = new ChangeEndpoint(api);
		this.collections = new CollectionsEndpoint(api);
		this.companies = new CompaniesEndpoint(api);
		this.configuration = new ConfigurationEndpoint(api);
		this.credits = new CreditsEndpoint(api);
		this.discover = new DiscoverEndpoint(api);
		this.find = new FindEndpoint(api);
		this.genre = new GenreEndpoint(api);
		this.guestSessions = new GuestSessionsEndpoint(api);
		this.keywords = new KeywordsEndpoint(api);
		this.lists = new ListsEndpoint(api);
		this.movies = new MoviesEndpoint(api);
		this.networks = new NetworksEndpoint(api);
		this.people = new PeopleEndpoint(api);
		this.review = new ReviewEndpoint(api);
		this.search = new SearchEndpoint(api);
		this.trending = new TrendingEndpoint(api);
		this.tvEpisodeGroups = new TvEpisodeGroupsEndpoint(api);
		this.tvEpisodes = new TvEpisodesEndpoint(api);
		this.tvSeasons = new TvSeasonsEndpoint(api);
		this.tvShows = new TvShowsEndpoint(api);
		this.watchProviders = new WatchProvidersEndpoint(api);
	}
}

export * from "./@types";
export * from "./utils";
export { TMDB };

import type { TokenType } from "./@types";
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
		this.account = new AccountEndpoint(auth);
		this.authentication = new AuthenticationEndpoint(auth);
		this.certification = new CertificationEndpoint(auth);
		this.changes = new ChangeEndpoint(auth);
		this.collections = new CollectionsEndpoint(auth);
		this.companies = new CompaniesEndpoint(auth);
		this.configuration = new ConfigurationEndpoint(auth);
		this.credits = new CreditsEndpoint(auth);
		this.discover = new DiscoverEndpoint(auth);
		this.find = new FindEndpoint(auth);
		this.genre = new GenreEndpoint(auth);
		this.guestSessions = new GuestSessionsEndpoint(auth);
		this.keywords = new KeywordsEndpoint(auth);
		this.lists = new ListsEndpoint(auth);
		this.movies = new MoviesEndpoint(auth);
		this.networks = new NetworksEndpoint(auth);
		this.people = new PeopleEndpoint(auth);
		this.review = new ReviewEndpoint(auth);
		this.search = new SearchEndpoint(auth);
		this.trending = new TrendingEndpoint(auth);
		this.tvEpisodeGroups = new TvEpisodeGroupsEndpoint(auth);
		this.tvEpisodes = new TvEpisodesEndpoint(auth);
		this.tvSeasons = new TvSeasonsEndpoint(auth);
		this.tvShows = new TvShowsEndpoint(auth);
		this.watchProviders = new WatchProvidersEndpoint(auth);
	}
}

export * from "./@types";
export * from "./utils";
export { TMDB };

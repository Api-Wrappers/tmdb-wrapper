import { TokenType } from "./@types";
import {
	AccountEndpoint,
	CertificationEndpoint,
	ChangeEndpoint,
	CollectionsEndpoint,
	CompaniesEndpoint,
	ConfigurationEndpoint,
	CreditsEndpoint,
	DiscoverEndpoint,
	FindEndpoint,
	GenreEndpoint,
	KeywordsEndpoint,
	MoviesEndpoint,
	NetworksEndpoint,
	PeopleEndpoint,
	ReviewEndpoint,
	SearchEndpoint,
	TrendingEndpoint,
	TvEpisodesEndpoint,
	TvSeasonsEndpoint,
	TvShowsEndpoint,
	WatchProvidersEndpoint,
} from "./endpoints";

class TMDB {
	constructor(auth: TokenType) {
		this.account = new AccountEndpoint(auth);
		this.certification = new CertificationEndpoint(auth);
		this.changes = new ChangeEndpoint(auth);
		this.collections = new CollectionsEndpoint(auth);
		this.companies = new CompaniesEndpoint(auth);
		this.configuration = new ConfigurationEndpoint(auth);
		this.credits = new CreditsEndpoint(auth);
		this.discover = new DiscoverEndpoint(auth);
		this.find = new FindEndpoint(auth);
		this.genre = new GenreEndpoint(auth);
		this.keywords = new KeywordsEndpoint(auth);
		this.movies = new MoviesEndpoint(auth);
		this.networks = new NetworksEndpoint(auth);
		this.people = new PeopleEndpoint(auth);
		this.review = new ReviewEndpoint(auth);
		this.search = new SearchEndpoint(auth);
		this.trending = new TrendingEndpoint(auth);
		this.tvEpisodes = new TvEpisodesEndpoint(auth);
		this.tvSeasons = new TvSeasonsEndpoint(auth);
		this.tvShows = new TvShowsEndpoint(auth);
		this.watchProviders = new WatchProvidersEndpoint(auth);
	}

	account: AccountEndpoint;
	certification: CertificationEndpoint;
	changes: ChangeEndpoint;
	collections: CollectionsEndpoint;
	companies: CompaniesEndpoint;
	configuration: ConfigurationEndpoint;
	credits: CreditsEndpoint;
	discover: DiscoverEndpoint;
	find: FindEndpoint;
	genre: GenreEndpoint;
	keywords: KeywordsEndpoint;
	movies: MoviesEndpoint;
	networks: NetworksEndpoint;
	people: PeopleEndpoint;
	review: ReviewEndpoint;
	search: SearchEndpoint;
	trending: TrendingEndpoint;
	tvEpisodes: TvEpisodesEndpoint;
	tvSeasons: TvSeasonsEndpoint;
	tvShows: TvShowsEndpoint;
	watchProviders: WatchProvidersEndpoint;
}

export * from "./@types";
export * from "./utils";
export { TMDB };

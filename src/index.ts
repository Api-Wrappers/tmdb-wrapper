import {
  AccountEndpoint,
  CertificationEndpoint,
  ChangeEndpoint,
  CollectionsEndpoint,
  ConfigurationEndpoint,
  CreditsEndpoint,
  DiscoverEndpoint,
  FindEndpoint,
  GenreEndpoint,
  KeywordsEndpoint,
  MoviesEndpoint,
  PeopleEndpoint,
  ReviewEndpoint,
  SearchEndpoint,
  TrendingEndpoint,
  TvEpisodesEndpoint,
  TvSeasonsEndpoint,
  TvShowsEndpoint,
} from './endpoints';

class TMDB {
  constructor(access_token: string) {
    this.account = new AccountEndpoint(access_token);
    this.certification = new CertificationEndpoint(access_token);
    this.changes = new ChangeEndpoint(access_token);
    this.collections = new CollectionsEndpoint(access_token);
    this.configuration = new ConfigurationEndpoint(access_token);
    this.credits = new CreditsEndpoint(access_token);
    this.discover = new DiscoverEndpoint(access_token);
    this.find = new FindEndpoint(access_token);
    this.genre = new GenreEndpoint(access_token);
    this.keywords = new KeywordsEndpoint(access_token);
    this.movies = new MoviesEndpoint(access_token);
    this.people = new PeopleEndpoint(access_token);
    this.review = new ReviewEndpoint(access_token);
    this.search = new SearchEndpoint(access_token);
    this.trending = new TrendingEndpoint(access_token);
    this.tvEpisodes = new TvEpisodesEndpoint(access_token);
    this.tvSeasons = new TvSeasonsEndpoint(access_token);
    this.tvShows = new TvShowsEndpoint(access_token);
  }

  account: AccountEndpoint;
  certification: CertificationEndpoint;
  changes: ChangeEndpoint;
  collections: CollectionsEndpoint;
  configuration: ConfigurationEndpoint;
  credits: CreditsEndpoint;
  discover: DiscoverEndpoint;
  find: FindEndpoint;
  genre: GenreEndpoint;
  keywords: KeywordsEndpoint;
  movies: MoviesEndpoint;
  people: PeopleEndpoint;
  review: ReviewEndpoint;
  search: SearchEndpoint;
  trending: TrendingEndpoint;
  tvEpisodes: TvEpisodesEndpoint;
  tvSeasons: TvSeasonsEndpoint;
  tvShows: TvShowsEndpoint;
}

export * from './@types';
export * from './utils';
export { TMDB };

import { LanguageOption, MovieWithMediaType, PageOption, PersonWithMediaType, RegionOption, TVWithMediaType } from '..';

export interface Search<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type MultiSearchResult = MovieWithMediaType | TVWithMediaType | PersonWithMediaType;

export interface SearchOptions {
  query: string;
  page?: number;
}

export interface MovieSearchOptions extends SearchOptions, LanguageOption, PageOption, RegionOption {
  include_adult?: boolean;
  year?: number;
  primary_release_year?: number;
}

export interface CollectionSearchOptions extends SearchOptions, LanguageOption, PageOption, RegionOption {
  include_adult?: boolean;
}

export interface TvSearchOptions extends SearchOptions, LanguageOption, PageOption {
  include_adult?: boolean;
  year?: number;
  first_air_date_year?: number;
}

export interface PeopleSearchOptions extends SearchOptions, LanguageOption, PageOption {
  include_adult?: boolean;
}

export interface MultiSearchOptions extends SearchOptions, LanguageOption, PageOption {
  include_adult?: boolean;
}

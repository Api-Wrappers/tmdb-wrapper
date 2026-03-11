import type {
	Genre,
	LanguageOption,
	Movie,
	ProductionCompany,
	ProductionCountry,
	SpokenLanguage,
} from "..";
import type { Nullable, TMDBDateTime } from "../wire";

export interface BelongsToCollection {
	id: number;
	name: string;
	poster_path: Nullable<string>;
	backdrop_path: Nullable<string>;
}

export interface MovieDetails {
	adult: boolean;
	backdrop_path: Nullable<string>;
	belongs_to_collection?: Nullable<BelongsToCollection>;
	budget: number;
	genres: Genre[];
	homepage: Nullable<string>;
	id: number;
	imdb_id: Nullable<string>;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: Nullable<string>;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	release_date: string;
	revenue: number;
	runtime: Nullable<number>;
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: Nullable<string>;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export enum ReleaseDateType {
	Premiere = 1,
	"Theatrical (limited)" = 2,
	Theatrical = 3,
	Digital = 4,
	Physical = 5,
	TV = 6,
}

export interface ReleaseDate {
	certification: string;
	iso_639_1: string;
	release_date: TMDBDateTime;
	type: ReleaseDateType;
	note: string;
}

export interface ReleaseDateResult {
	iso_3166_1: string;
	release_dates: ReleaseDate[];
}

export interface ReleaseDates {
	id: number;
	results: ReleaseDateResult[];
}

export interface SimilarMovies {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
}

export interface MovieList {
	description: string;
	favorite_count: number;
	id: number;
	item_count: number;
	iso_639_1: string;
	list_type: string;
	name: string;
	poster_path: Nullable<string>;
}

export interface MovieLists {
	id: number;
	page: number;
	results: MovieList[];
	total_pages: number;
	total_results: number;
}

export interface LatestMovie {
	adult: boolean;
	backdrop_path: Nullable<string>;
	belongs_to_collection?: Nullable<BelongsToCollection>;
	budget: number;
	genres: Genre[];
	homepage: Nullable<string>;
	id: number;
	imdb_id: Nullable<string>;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: Nullable<string>;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	release_date: string;
	revenue: number;
	runtime: Nullable<number>;
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: Nullable<string>;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface Dates {
	maximum: string;
	minimum: string;
}

export interface MoviesPlayingNow {
	page: number;
	results: Movie[];
	dates: Dates;
	total_pages: number;
	total_results: number;
}

export interface PopularMovies {
	page: number;
	results: Movie[];
	total_results: number;
	total_pages: number;
}

export interface TopRatedMovies {
	page: number;
	results: Movie[];
	total_results: number;
	total_pages: number;
}

export interface UpcomingMovies {
	page: number;
	results: Movie[];
	total_results: number;
	total_pages: number;
}

export type MovieChangeValue =
	| string
	| {
			person_id: number;
			character: string;
			order: number;
			cast_id: number;
			credit_id: string;
	  }
	| unknown;

export interface MoviesImageSearchOptions extends LanguageOption {
	/**
	 * a list of ISO-639-1 values to query
	 */
	include_image_language?: string[];
}

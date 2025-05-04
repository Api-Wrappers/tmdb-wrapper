export interface ErrorResponse {
	status_code: number;
	status_message: string;
	success: boolean;
}

export type MediaType = "movie" | "tv" | "person";

export interface AuthorDetails {
	name: string;
	username: string;
	avatar_path: string;
	rating?: number;
}

export type KnownFor = MovieWithMediaType | TVWithMediaType;

export interface Person {
	id: number;
	name: string;
	known_for: KnownFor[];
	profile_path: string;
	adult: boolean;
	known_for_department: string;
	gender: number;
	popularity: number;
}

export interface PersonWithMediaType extends Person {
	media_type: "person";
}

export interface Movie {
	id: number;
	poster_path: string;
	adult: boolean;
	overview: string;
	release_date: string;
	genre_ids: number[];
	original_title: string;
	original_language: string;
	title: string;
	backdrop_path: string;
	popularity: number;
	vote_count: number;
	video: boolean;
	vote_average: number;
}

export interface MovieWithMediaType extends Movie {
	media_type: "movie";
}

export interface Company {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

export interface TV {
	id: number;
	name: string;
	first_air_date: string;
	backdrop_path: string;
	genre_ids: number[];
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	poster_path: string;
	popularity: number;
	vote_count: number;
	vote_average: number;
}

export interface TVWithMediaType extends TV {
	media_type: "tv";
}

export interface Genre {
	id: number;
	name: string;
}

export interface ExternalIds {
	imdb_id: string;
	facebook_id: string;
	instagram_id: string;
	twitter_id: string;
	id: number;
}

export interface ProductionCompany {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

export interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

export interface SpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

export interface ContentRatings {
	results: ContentRatingsResult[];
	id: number;
}

export interface ContentRatingsResult {
	descriptor: unknown[];
	iso_3166_1: string;
	rating: string;
}

export interface Recommendation {
	adult: boolean;
	backdrop_path?: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	release_date: string;
	poster_path?: string;
	popularity: number;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface Recommendations {
	page: number;
	results: Recommendation[];
	total_pages: number;
	total_results: number;
}

export interface Review {
	author: string;
	author_details: AuthorDetails;
	content: string;
	created_at: Date;
	id: string;
	updated_at: Date;
	url: string;
}

export interface Reviews {
	id: number;
	page: number;
	results: Review[];
	total_pages: number;
	total_results: number;
}

export interface TranslationData {
	title: string;
	overview: string;
	homepage: string;
}

export interface Translation {
	iso_3166_1: string;
	iso_639_1: string;
	name: string;
	english_name: string;
	data: TranslationData;
}

export interface Translations {
	id: number;
	translations: Translation[];
}

export interface Image {
	aspect_ratio: number;
	file_path: string;
	height: number;
	iso_639_1: string;
	vote_average: number;
	vote_count: number;
	width: number;
}

export interface Images {
	id: number;
	backdrops: Image[];
	logos: Image[];
	posters: Image[];
}

export interface TMDBConfig {
	apiKey?: string;
	accessToken?: string;
}

export type TokenType = string | TMDBConfig;

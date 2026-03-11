import type {
	Genre,
	LanguageOption,
	ProductionCompany,
	ProductionCountry,
	SpokenLanguage,
} from "..";
import type { Nullable } from "../wire";

export interface CreatedBy {
	id: number;
	credit_id: string;
	name: string;
	gender: number;
	profile_path: Nullable<string>;
}

export interface NextEpisodeToAir {
	id: number;
	name: string;
	overview: string;
	vote_average: number;
	vote_count: number;
	air_date: string;
	episode_number: number;
	production_code: string;
	runtime: Nullable<number>;
	season_number: number;
	show_id: number;
	still_path: Nullable<string>;
}

export interface LastEpisodeToAir {
	air_date: string;
	episode_number: number;
	id: number;
	name: string;
	overview: string;
	production_code: string;
	season_number: number;
	still_path: Nullable<string>;
	vote_average: number;
	vote_count: number;
}

export interface Network {
	id: number;
	logo_path: Nullable<string>;
	name: string;
	origin_country: string;
}

export interface Season {
	air_date: string;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: Nullable<string>;
	season_number: number;
}

export interface TvShowDetails {
	backdrop_path: Nullable<string>;
	created_by: CreatedBy[];
	episode_run_time: number[];
	first_air_date: string;
	genres: Genre[];
	homepage: Nullable<string>;
	id: number;
	in_production: boolean;
	languages: string[];
	last_air_date: string;
	last_episode_to_air: Nullable<LastEpisodeToAir>;
	name: string;
	next_episode_to_air?: Nullable<NextEpisodeToAir>;
	networks: Network[];
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: Nullable<string>;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	seasons: Season[];
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: Nullable<string>;
	type: string;
	vote_average: number;
	vote_count: number;
}

export interface EpisodeGroup {
	description: string;
	episode_count: number;
	group_count: number;
	id: string;
	name: string;
	network: Network;
	type: number;
}

export interface EpisodeGroups {
	results: EpisodeGroup[];
	id: number;
}

export interface ScreenedTheatricallyResult {
	id: number;
	episode_number: number;
	season_number: number;
}

export interface ScreenedTheatrically {
	id: number;
	results: ScreenedTheatricallyResult[];
}

export interface SimilarTvShow {
	backdrop_path: Nullable<string>;
	first_air_date: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_name: string;
	overview: string;
	origin_country: string[];
	poster_path: Nullable<string>;
	popularity: number;
	name: string;
	vote_average: number;
	vote_count: number;
}

export interface Similartv {
	page: number;
	results: SimilarTvShow[];
	total_pages: number;
	total_results: number;
}

export interface Latesttv {
	backdrop_path: Nullable<string>;
	created_by: CreatedBy[];
	episode_run_time: number[];
	first_air_date: string;
	genres: Genre[];
	homepage: Nullable<string>;
	id: number;
	in_production: boolean;
	languages: string[];
	last_air_date: string;
	name: string;
	networks: Network[];
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview?: Nullable<string>;
	popularity: number;
	poster_path: Nullable<string>;
	production_companies: ProductionCompany[];
	seasons: Season[];
	status: string;
	type: string;
	vote_average: number;
	vote_count: number;
}

export interface OnTheAirResult {
	poster_path: Nullable<string>;
	popularity: number;
	id: number;
	backdrop_path: Nullable<string>;
	vote_average: number;
	overview: string;
	first_air_date: string;
	origin_country: string[];
	genre_ids: number[];
	original_language: string;
	vote_count: number;
	name: string;
	original_name: string;
}

export interface OnTheAir {
	page: number;
	results: OnTheAirResult[];
	total_results: number;
	total_pages: number;
}

export interface AiringTodayResult {
	poster_path: Nullable<string>;
	popularity: number;
	id: number;
	backdrop_path: Nullable<string>;
	vote_average: number;
	overview: string;
	first_air_date: string;
	origin_country: string[];
	genre_ids: number[];
	original_language: string;
	vote_count: number;
	name: string;
	original_name: string;
}

export interface tvAiringToday {
	page: number;
	results: AiringTodayResult[];
	total_results: number;
	total_pages: number;
}

export interface PopularTvShowResult {
	poster_path: Nullable<string>;
	popularity: number;
	id: number;
	backdrop_path: Nullable<string>;
	vote_average: number;
	overview: string;
	first_air_date: string;
	origin_country: string[];
	genre_ids: number[];
	original_language: string;
	vote_count: number;
	name: string;
	original_name: string;
}

export interface Populartv {
	page: number;
	results: PopularTvShowResult[];
	total_results: number;
	total_pages: number;
}

export interface TopRatedTvShowResult {
	poster_path: Nullable<string>;
	popularity: number;
	id: number;
	backdrop_path: Nullable<string>;
	vote_average: number;
	overview: string;
	first_air_date: string;
	origin_country: string[];
	genre_ids: number[];
	original_language: string;
	vote_count: number;
	name: string;
	original_name: string;
}

export interface TopRatedtv {
	page: number;
	results: TopRatedTvShowResult[];
	total_results: number;
	total_pages: number;
}

export interface TvShowChangeValue {
	season_id: number;
	season_number: number;
}

export interface TvShowImageOptions extends LanguageOption {
	/**
	 * a list of ISO-639-1 values to query
	 */
	include_image_language?: string[];
}

export interface TvShowVideoOptions extends LanguageOption {
	/**
	 * a list of ISO-639-1 values to query
	 */
	include_video_language?: string[];
}

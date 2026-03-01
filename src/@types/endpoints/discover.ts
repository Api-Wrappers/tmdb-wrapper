import type { Movie, TV } from "..";

export type MovieSortOption =
	| "original_title.asc"
	| "original_title.desc"
	| "popularity.asc"
	| "popularity.desc"
	| "revenue.asc"
	| "revenue.desc"
	| "primary_release_date.asc"
	| "primary_release_date.desc"
	| "title.asc"
	| "title.desc"
	| "vote_average.asc"
	| "vote_average.desc"
	| "vote_count.asc"
	| "vote_count.desc";

export type TvSortOption =
	| "first_air_date.asc"
	| "first_air_date.desc"
	| "name.asc"
	| "name.desc"
	| "original_name.asc"
	| "original_name.desc"
	| "popularity.asc"
	| "popularity.desc"
	| "vote_average.asc"
	| "vote_average.desc"
	| "vote_count.asc"
	| "vote_count.desc";

export interface MovieDiscoverResult {
	page: number;
	results: Movie[];
	total_results: number;
	total_pages: number;
}

export interface TvShowDiscoverResult {
	page: number;
	results: TV[];
	total_results: number;
	total_pages: number;
}

export type WatchMonetizationType =
	| "flatrate"
	| "free"
	| "ads"
	| "rent"
	| "buy";

export interface DiscoverQueryOptions {
	language?: string;
	page?: number;

	"vote_average.gte"?: number;
	"vote_average.lte"?: number;
	"vote_count.gte"?: number;
	"vote_count.lte"?: number;

	with_watch_providers?: string;
	without_watch_providers?: string;
	watch_region?: string;
	with_watch_monetization_types?: WatchMonetizationType | string;

	"with_runtime.gte"?: number;
	"with_runtime.lte"?: number;

	with_genres?: string;
	without_genres?: string;

	with_keywords?: string;
	without_keywords?: string;

	with_companies?: string;
	without_companies?: string;

	with_original_language?: string;

	with_text_query?: string;
}

export interface MovieQueryOptions
	extends Omit<DiscoverQueryOptions, "with_text_query"> {
	sort_by?: MovieSortOption;

	region?: string;

	certification_country?: string;
	certification?: string;
	"certification.lte"?: string;
	"certification.gte"?: string;

	include_adult?: boolean;
	include_video?: boolean;

	primary_release_year?: number;
	"primary_release_date.gte"?: string;
	"primary_release_date.lte"?: string;

	"release_date.gte"?: string;
	"release_date.lte"?: string;

	with_release_type?: number | string;

	year?: number;

	with_cast?: string;
	with_crew?: string;
	with_people?: string;
}

export interface TvShowQueryOptions extends DiscoverQueryOptions {
	sort_by?: TvSortOption;

	"air_date.gte"?: string;
	"air_date.lte"?: string;

	"first_air_date.gte"?: string;
	"first_air_date.lte"?: string;
	first_air_date_year?: number;

	include_adult?: boolean;
	include_null_first_air_dates?: boolean;

	screened_theatrically?: boolean;

	timezone?: string;

	with_networks?: number | string;

	with_origin_country?: string;

	with_status?: string;

	with_type?: string;
}

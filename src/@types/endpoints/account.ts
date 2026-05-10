import type {
	Episode,
	LanguageOption,
	Movie,
	PageOption,
	SessionIdOption,
	StatusResponse,
	TV,
} from "..";
import type { Nullable } from "../wire";

export interface Gravatar {
	hash: string;
}

export interface Avatar {
	gravatar: Gravatar;
	tmdb?: {
		avatar_path: Nullable<string>;
	};
}

export interface AccountDetails {
	avatar: Avatar;
	id: number;
	include_adult: boolean;
	iso_3166_1: string;
	iso_639_1: string;
	name: string;
	username: string;
}

export type AccountSortBy = "created_at.asc" | "created_at.desc";

export interface AccountMediaListOptions
	extends LanguageOption,
		PageOption,
		SessionIdOption {
	sort_by?: AccountSortBy;
}

export interface AccountListOptions extends PageOption, SessionIdOption {}

export interface AccountMarkFavoriteRequest {
	media_type: "movie" | "tv";
	media_id: number;
	favorite: boolean;
}

export interface AccountWatchlistRequest {
	media_type: "movie" | "tv";
	media_id: number;
	watchlist: boolean;
}

export interface AccountMovie extends Movie {
	rating?: number;
}

export interface AccountTvShow extends TV {
	rating?: number;
}

export interface AccountTvEpisode extends Episode {
	rating?: number;
}

export interface AccountMediaList<T> {
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
}

export interface AccountList {
	description: string;
	favorite_count: number;
	id: number;
	item_count: number;
	iso_639_1: string;
	list_type: string;
	name: string;
	poster_path: Nullable<string>;
}

export type AccountLists = AccountMediaList<AccountList>;

export type AccountMovies = AccountMediaList<AccountMovie>;
export type AccountTvShows = AccountMediaList<AccountTvShow>;
export type AccountTvEpisodes = AccountMediaList<AccountTvEpisode>;
export type AccountStatusResponse = StatusResponse;

import type {
	AccountMediaList,
	AccountMovie,
	AccountSortBy,
	AccountTvEpisode,
	AccountTvShow,
	LanguageOption,
	PageOption,
} from "..";

export interface GuestSessionRatedOptions extends LanguageOption, PageOption {
	sort_by?: AccountSortBy;
}

export type GuestSessionRatedMovies = AccountMediaList<AccountMovie>;
export type GuestSessionRatedTvShows = AccountMediaList<AccountTvShow>;
export type GuestSessionRatedTvEpisodes = AccountMediaList<AccountTvEpisode>;

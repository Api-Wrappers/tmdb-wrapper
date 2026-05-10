import type {
	Episode,
	LanguageOption,
	RatingState,
	SessionOrGuestSessionOption,
	WatchProviders,
} from "..";
import type { Nullable } from "../wire";

export interface SeasonSelection {
	tvShowID: number;
	seasonNumber: number;
}

export interface SeasonDetails {
	air_date: string;
	episodes: Episode[];
	name: string;
	overview: string;
	id: number;
	poster_path: Nullable<string>;
	season_number: number;
}

export interface TvSeasonAccountStateEpisode {
	id: number;
	episode_number: number;
	rated: RatingState;
}

export interface TvSeasonAccountStates {
	id: number;
	results: TvSeasonAccountStateEpisode[];
}

export type TvSeasonAccountStateOptions = SessionOrGuestSessionOption;
export type TvSeasonWatchProviders = WatchProviders;

export type TvSeasonChangeValue =
	| string
	| {
			episode_id: number;
			episode_number: number;
	  };

export interface TvSeasonImageSearchOptions extends LanguageOption {
	/**
	 * a list of ISO-639-1 values to query
	 */
	include_image_language?: string[];
}

export interface TvSeasonVideoSearchOptions extends LanguageOption {
	/**
	 * a list of ISO-639-1 values to query
	 */
	include_video_language?: string[];
}

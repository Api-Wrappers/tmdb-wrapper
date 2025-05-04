import { Episode, LanguageOption } from "..";

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
	poster_path: string | null;
	season_number: number;
}

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

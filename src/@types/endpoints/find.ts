import type { Episode, Movie, Person, Season, TV } from "..";

export type ExternalSource =
	| "imdb_id"
	| "freebase_mid"
	| "freebase_id"
	| "tvdb_id"
	| "tvrage_id"
	| "facebook_id"
	| "twitter_id"
	| "instagram_id";

export interface ExternalIdOptions {
	external_source: ExternalSource;
	language?: string;
}

type MediaTagged<T, TMediaType extends string> = T & {
	media_type: TMediaType;
};

export interface FindResult {
	movie_results: MediaTagged<Movie, "movie">[];
	person_results: MediaTagged<Person, "person">[];
	tv_results: MediaTagged<TV, "tv">[];
	tv_episode_results: MediaTagged<Episode, "tv_episode">[];
	tv_season_results: MediaTagged<Season & { show_id: number }, "tv_season">[];
}

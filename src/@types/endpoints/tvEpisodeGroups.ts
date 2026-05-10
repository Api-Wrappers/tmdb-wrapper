import type { Episode } from "..";

export interface TvEpisodeGroupEpisode extends Episode {
	order: number;
}

export interface TvEpisodeGroup {
	id: string;
	name: string;
	order: number;
	episodes: TvEpisodeGroupEpisode[];
}

export interface TvEpisodeGroupDetails {
	description: string;
	episode_count: number;
	group_count: number;
	groups: TvEpisodeGroup[];
	id: string;
	name: string;
	network: {
		id: number;
		logo_path: string | null;
		name: string;
		origin_country: string;
	};
	type: number;
}

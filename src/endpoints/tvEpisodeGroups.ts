import {
	BaseEndpoint,
	type TokenType,
	type TvEpisodeGroupDetails,
} from "../@types";
import type { RequestConfig } from "../utils";

const BASE_TV_EPISODE_GROUP = "/tv/episode_group";

/**
 * Represents TMDB v3 TV episode group endpoints.
 */
export class TvEpisodeGroupsEndpoint extends BaseEndpoint {
	constructor(protected readonly auth: TokenType) {
		super(auth);
	}

	/**
	 * Retrieves TV episode group details.
	 */
	details(
		tvEpisodeGroupId: string,
		request?: RequestConfig,
	): Promise<TvEpisodeGroupDetails> {
		return this.api.get<TvEpisodeGroupDetails>(
			`${BASE_TV_EPISODE_GROUP}/${tvEpisodeGroupId}`,
			request,
		);
	}
}

import {
	BaseEndpoint,
	type ExternalIdOptions,
	type FindResult,
} from "../@types";
import { type RequestConfig, withQuery } from "../utils";

/**
 * Represents an endpoint for finding media by external ID.
 */
export class FindEndpoint extends BaseEndpoint {
	/**
	 * Retrieves media by external ID asynchronously.
	 *
	 * @param {string} externalId - The external ID of the media.
	 * @param {ExternalIdOptions} options - Options for finding media by external
	 * ID.
	 * @returns {Promise<FindResult>} A Promise that resolves with the result of
	 * the find operation.
	 */
	byId(
		externalId: string,
		options: ExternalIdOptions,
		request?: RequestConfig,
	): Promise<FindResult> {
		return this.api.get<FindResult>(
			`/find/${externalId}`,
			withQuery(options, request),
		);
	}
}

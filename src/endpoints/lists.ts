import {
	BaseEndpoint,
	type ClearListOptions,
	type CreateListRequest,
	type CreateListResponse,
	type ListDetails,
	type ListDetailsOptions,
	type ListItemRequest,
	type ListItemStatus,
	type ListItemStatusOptions,
	type ListStatusResponse,
} from "../@types";
import { type RequestConfig, withQuery } from "../utils";

const BASE_LIST = "/list";

/**
 * Represents TMDB v3 list management endpoints.
 */
export class ListsEndpoint extends BaseEndpoint {
	/**
	 * Retrieves list details.
	 */
	details(
		listId: number,
		options?: ListDetailsOptions,
		request?: RequestConfig,
	): Promise<ListDetails> {
		return this.api.get<ListDetails>(
			`${BASE_LIST}/${listId}`,
			withQuery(options, request),
		);
	}

	/**
	 * Checks whether a movie is present in a list.
	 */
	itemStatus(
		listId: number,
		options?: ListItemStatusOptions,
		request?: RequestConfig,
	): Promise<ListItemStatus> {
		return this.api.get<ListItemStatus>(
			`${BASE_LIST}/${listId}/item_status`,
			withQuery(options, request),
		);
	}

	/**
	 * Creates a list for the authenticated session.
	 */
	create(
		body: CreateListRequest,
		sessionId: string,
		request?: RequestConfig,
	): Promise<CreateListResponse> {
		return this.api.post<CreateListResponse>(BASE_LIST, body, {
			...request,
			query: { ...request?.query, session_id: sessionId },
		});
	}

	/**
	 * Adds a movie to a list.
	 */
	addMovie(
		listId: number,
		input: number | ListItemRequest,
		sessionId: string,
		request?: RequestConfig,
	): Promise<ListStatusResponse> {
		const body = typeof input === "number" ? { media_id: input } : input;

		return this.api.post<ListStatusResponse>(
			`${BASE_LIST}/${listId}/add_item`,
			body,
			{
				...request,
				query: { ...request?.query, session_id: sessionId },
			},
		);
	}

	/**
	 * Removes a movie from a list.
	 */
	removeMovie(
		listId: number,
		input: number | ListItemRequest,
		sessionId: string,
		request?: RequestConfig,
	): Promise<ListStatusResponse> {
		const body = typeof input === "number" ? { media_id: input } : input;

		return this.api.post<ListStatusResponse>(
			`${BASE_LIST}/${listId}/remove_item`,
			body,
			{
				...request,
				query: { ...request?.query, session_id: sessionId },
			},
		);
	}

	/**
	 * Clears all movies from a list.
	 */
	clear(
		listId: number,
		options: ClearListOptions,
		request?: RequestConfig,
	): Promise<ListStatusResponse> {
		return this.api.post<ListStatusResponse>(
			`${BASE_LIST}/${listId}/clear`,
			undefined,
			{
				...request,
				query: {
					...request?.query,
					session_id: options.session_id,
					confirm: options.confirm,
				},
			},
		);
	}

	/**
	 * Deletes a list.
	 */
	delete(
		listId: number,
		sessionId: string,
		request?: RequestConfig,
	): Promise<ListStatusResponse> {
		return this.api.delete<ListStatusResponse>(`${BASE_LIST}/${listId}`, {
			...request,
			query: { ...request?.query, session_id: sessionId },
		});
	}
}

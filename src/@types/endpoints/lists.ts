import type { LanguageOption, Movie, PageOption, StatusResponse } from "..";
import type { Nullable } from "../wire";

export interface ListDetailsOptions extends LanguageOption, PageOption {}

export interface ListDetails {
	created_by: string;
	description: string;
	favorite_count: number;
	id: string;
	items: Movie[];
	item_count: number;
	iso_639_1: string;
	name: string;
	poster_path: Nullable<string>;
}

export interface CreateListRequest {
	name: string;
	description: string;
	language: string;
}

export interface CreateListResponse extends StatusResponse {
	list_id: number;
	success: boolean;
}

export interface ListItemRequest {
	media_id: number;
}

export interface ListItemStatusOptions extends LanguageOption {
	movie_id?: number;
}

export interface ListItemStatus {
	id: string;
	item_present: boolean;
}

export interface ClearListOptions {
	session_id: string;
	confirm: boolean;
}

export type ListStatusResponse = StatusResponse;

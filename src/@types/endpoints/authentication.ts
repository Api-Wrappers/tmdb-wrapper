import type { StatusResponse } from "../types";

export interface ValidateKeyResponse {
	success: boolean;
	status_code: number;
	status_message: string;
}

export interface GuestSessionResponse extends StatusResponse {
	guest_session_id: string;
	expires_at: string;
	success: boolean;
}

export interface RequestTokenResponse extends StatusResponse {
	request_token: string;
	expires_at: string;
	success: boolean;
}

export interface SessionResponse extends StatusResponse {
	session_id: string;
	success: boolean;
}

export interface CreateSessionRequest {
	request_token: string;
}

export interface CreateSessionFromV4TokenRequest {
	access_token: string;
}

export interface CreateSessionWithLoginRequest {
	username: string;
	password: string;
	request_token: string;
}

export interface DeleteSessionRequest {
	session_id: string;
}

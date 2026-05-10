import {
	BaseEndpoint,
	type CreateSessionFromV4TokenRequest,
	type CreateSessionRequest,
	type CreateSessionWithLoginRequest,
	type DeleteSessionRequest,
	type GuestSessionResponse,
	type RequestTokenResponse,
	type SessionResponse,
	type StatusResponse,
	type TokenType,
	type ValidateKeyResponse,
} from "../@types";
import type { RequestConfig } from "../utils";

const BASE_AUTHENTICATION = "/authentication";

/**
 * Represents TMDB v3 authentication and session endpoints.
 */
export class AuthenticationEndpoint extends BaseEndpoint {
	constructor(protected readonly auth: TokenType) {
		super(auth);
	}

	/**
	 * Validates the configured TMDB API key or read access token.
	 */
	validateKey(request?: RequestConfig): Promise<ValidateKeyResponse> {
		return this.api.get<ValidateKeyResponse>(BASE_AUTHENTICATION, request);
	}

	/**
	 * Creates a temporary guest session.
	 */
	createGuestSession(request?: RequestConfig): Promise<GuestSessionResponse> {
		return this.api.get<GuestSessionResponse>(
			`${BASE_AUTHENTICATION}/guest_session/new`,
			request,
		);
	}

	/**
	 * Creates a request token for the classic TMDB login flow.
	 */
	createRequestToken(request?: RequestConfig): Promise<RequestTokenResponse> {
		return this.api.get<RequestTokenResponse>(
			`${BASE_AUTHENTICATION}/token/new`,
			request,
		);
	}

	/**
	 * Creates a session from an approved request token.
	 */
	createSession(
		input: string | CreateSessionRequest,
		request?: RequestConfig,
	): Promise<SessionResponse> {
		const body = typeof input === "string" ? { request_token: input } : input;

		return this.api.post<SessionResponse>(
			`${BASE_AUTHENTICATION}/session/new`,
			body,
			request,
		);
	}

	/**
	 * Creates a v3 session from a v4 access token.
	 */
	createSessionFromV4Token(
		input: string | CreateSessionFromV4TokenRequest,
		request?: RequestConfig,
	): Promise<SessionResponse> {
		const body = typeof input === "string" ? { access_token: input } : input;

		return this.api.post<SessionResponse>(
			`${BASE_AUTHENTICATION}/session/convert/4`,
			body,
			request,
		);
	}

	/**
	 * Creates a session by validating a request token with username/password.
	 */
	createSessionWithLogin(
		body: CreateSessionWithLoginRequest,
		request?: RequestConfig,
	): Promise<RequestTokenResponse> {
		return this.api.post<RequestTokenResponse>(
			`${BASE_AUTHENTICATION}/token/validate_with_login`,
			body,
			request,
		);
	}

	/**
	 * Deletes an existing v3 session.
	 */
	deleteSession(
		input: string | DeleteSessionRequest,
		request?: RequestConfig,
	): Promise<StatusResponse> {
		const body = typeof input === "string" ? { session_id: input } : input;

		return this.api.request<StatusResponse>(`${BASE_AUTHENTICATION}/session`, {
			...request,
			method: "DELETE",
			body,
		});
	}
}

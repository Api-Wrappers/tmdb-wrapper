import type { ErrorResponse, TokenType } from "../@types";

const BASE_URL_V3 = "https://api.themoviedb.org/3";

/**
 * Lightweight TMDB v3 API client.
 *
 * - Sends requests to `https://api.themoviedb.org/3`.
 * - Supports authentication via:
 *   - v4 API Read Access Token (Bearer), and/or
 *   - v3 API key via `api_key` query parameter.
 *
 * Notes:
 * - Many endpoints accept either method depending on your TMDB settings.
 * - When an API key is present, it is appended as `api_key` in the query string.
 */
export class API {
	/**
	 * Optional v3 API key (sent as `api_key` query param).
	 */
	private apiKey?: string;

	/**
	 * Optional v4 read access token (sent as `Authorization: Bearer ...`).
	 */
	private accessToken?: string;

	/**
	 * Create a new API client.
	 *
	 * @param {TokenType} auth - Authentication information.
	 */
	constructor(auth: TokenType) {
		if (typeof auth === "string") {
			this.accessToken = auth;
		} else {
			this.apiKey = auth.apiKey;
			this.accessToken = auth.accessToken;
		}
	}

	/**
	 * Generic HTTP GET request.
	 *
	 * @template T - Response JSON type.
	 * @template O - Query options (query params) type.
	 *
	 * @param {string} path - The TMDB path beginning with `/`, e.g. `/movie/550`.
	 * @param {O} [options] - Query parameters to serialize.
	 *
	 * @returns {Promise<T>} Resolves with parsed JSON typed as `T`.
	 * @throws {ErrorResponse} Rejects with parsed TMDB error payload when `response.ok` is false.
	 */
	async get<T, O extends Record<string, unknown> = Record<string, unknown>>(
		path: string,
		options?: O,
	): Promise<T> {
		const rawOptions = {
			...(options ?? {}),
			...(this.apiKey ? { api_key: this.apiKey } : {}),
		};

		const params = parseOptions(rawOptions);

		const response = await fetch(`${BASE_URL_V3}${path}?${params}`, {
			method: "GET",
			headers: {
				...(this.accessToken
					? { Authorization: `Bearer ${this.accessToken}` }
					: {}),
				"Content-Type": "application/json;charset=utf-8",
			},
		});

		if (!response.ok) {
			const error = (await response.json()) as ErrorResponse;
			return Promise.reject(error);
		}

		return (await response.json()) as T;
	}
}

/**
 * Serializes an options object into a query string.
 *
 * - Skips `undefined` and `null`.
 * - Arrays are expanded into repeated keys:
 *   `{ with_genres: ["12", "16"] }` -> `with_genres=12&with_genres=16`
 *
 * @param {Record<string, unknown>} [options] - Options to serialize.
 * @returns {string} Query string without the leading `?`.
 */
export const parseOptions = (options?: Record<string, unknown>): string => {
	if (!options) return "";

	const entries: [string, string][] = [];

	for (const [key, value] of Object.entries(options)) {
		if (value === undefined || value === null) continue;

		if (Array.isArray(value)) {
			for (const item of value) {
				entries.push([key, String(item)]);
			}
		} else {
			entries.push([key, String(value)]);
		}
	}

	return new URLSearchParams(entries).toString();
};

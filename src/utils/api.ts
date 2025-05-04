import { ErrorResponse, TokenType } from "../@types";

const BASE_URL_V3 = "https://api.themoviedb.org/3";

export class API {
	private apiKey?: string;
	private accessToken?: string;

	constructor(auth: TokenType) {
		if (typeof auth === "string") {
			this.accessToken = auth;
		} else {
			this.apiKey = auth.apiKey;
			this.accessToken = auth.accessToken;
		}
	}

	/**
	 * Generic GET:
	 * @template T — response type
	 * @template O — options (query params) type
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

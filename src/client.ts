import {
	ApiError,
	type ApiResponse,
	BaseHttpClient,
	type ClientConfig,
	type QueryParams,
	type RequestOptions,
} from "@api-wrappers/api-core";
import type { TMDBClientConfig, TokenType } from "./@types/types";

const BASE_URL_V3 = "https://api.themoviedb.org/3";

interface TMDBRequestOptions extends Omit<RequestOptions, "query"> {
	query?: object;
}

interface NormalizedAuth {
	apiKey?: string;
	accessToken?: string;
	client?: TMDBClientConfig;
}

export class TMDBApiClient extends BaseHttpClient {
	private readonly apiKey?: string;
	private readonly accessToken?: string;

	constructor(auth: TokenType) {
		const normalized = normalizeAuth(auth);
		const defaultHeaders: Record<string, string> = {
			Accept: "application/json",
			...normalized.client?.defaultHeaders,
		};

		if (normalized.accessToken) {
			defaultHeaders.Authorization = `Bearer ${normalized.accessToken}`;
		}

		const clientConfig: ClientConfig = {
			...normalized.client,
			baseUrl: normalized.client?.baseUrl ?? BASE_URL_V3,
			defaultHeaders,
			fetch: normalized.client?.fetch,
			retry: normalized.client?.retry ?? {
				maxAttempts: 3,
				delayMs: 300,
				jitter: false,
				retriableStatusCodes: [429, 502, 503, 504],
			},
		};

		super(clientConfig);

		this.apiKey = normalized.apiKey;
		this.accessToken = normalized.accessToken;
	}

	override requestWithResponse<T = unknown>(
		path: string,
		options: TMDBRequestOptions = {},
	): Promise<ApiResponse<T>> {
		if (!this.apiKey && !this.accessToken) {
			throw new ApiError("No TMDB authentication provided", 0);
		}

		return super.requestWithResponse<T>(path, this.withAuthQuery(options));
	}

	override get<T = unknown>(
		path: string,
		options?: Omit<TMDBRequestOptions, "method">,
	): Promise<T> {
		return this.request<T>(path, {
			...options,
			method: "GET",
		} as RequestOptions);
	}

	private withAuthQuery(options: TMDBRequestOptions): RequestOptions {
		if (!this.apiKey) return options as RequestOptions;

		return {
			...options,
			query: {
				...((options.query as QueryParams | undefined) ?? {}),
				api_key: this.apiKey,
			},
		};
	}
}

function normalizeAuth(auth: TokenType): NormalizedAuth {
	if (typeof auth === "string") {
		return { accessToken: auth || undefined };
	}

	return {
		apiKey: auth.apiKey,
		accessToken: auth.accessToken,
		client: auth.client,
	};
}

export type { QueryParams, RequestOptions };

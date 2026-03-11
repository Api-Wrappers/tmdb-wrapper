import type { ErrorResponse, TokenType } from "../@types";

const BASE_URL_V3 = "https://api.themoviedb.org/3";

export type Primitive = string | number | boolean;

export type QueryValue =
	| Primitive
	| null
	| undefined
	| Array<Primitive | null | undefined>;

export type Query = Record<string, QueryValue>;

export interface RequestOptions<Q extends object = object> {
	query?: Q;
	signal?: AbortSignal;
	timeoutMs?: number;
	retries?: number;
	retryDelayMs?: number;
}

export interface RequestConfig {
	signal?: AbortSignal;
	timeoutMs?: number;
	retries?: number;
	retryDelayMs?: number;
}

export class TMDBError extends Error {
	constructor(
		message: string,
		public readonly status: number,
		public readonly url: string,
		public readonly payload?: unknown,
	) {
		super(message);
		this.name = "TMDBError";
	}
}

export const parseOptions = (options?: Query): string => {
	if (!options) return "";

	const entries: [string, string][] = [];

	for (const [key, value] of Object.entries(options)) {
		if (value === undefined || value === null) continue;

		if (Array.isArray(value)) {
			for (const item of value) {
				if (item === undefined || item === null) continue;
				entries.push([key, String(item)]);
			}
		} else {
			entries.push([key, String(value)]);
		}
	}

	return new URLSearchParams(entries).toString();
};

export const csv = (
	values?: ReadonlyArray<Primitive | null | undefined>,
): string | undefined => {
	if (!values) return undefined;

	const normalized = values
		.filter(
			(value): value is Primitive => value !== undefined && value !== null,
		)
		.map(String);

	return normalized.length > 0 ? normalized.join(",") : undefined;
};

export const withQuery = <Q extends object>(
	query?: Q,
	config?: RequestConfig,
): RequestOptions<Q> => ({
	...config,
	query,
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const shouldRetry = (status: number) =>
	status === 429 || status === 502 || status === 503 || status === 504;

const readRetryAfterMs = (res: Response): number | undefined => {
	const raw = res.headers.get("retry-after");
	if (!raw) return undefined;

	const asSeconds = Number(raw);
	if (Number.isFinite(asSeconds)) return Math.max(0, asSeconds * 1000);

	const asDate = Date.parse(raw);
	if (!Number.isNaN(asDate)) return Math.max(0, asDate - Date.now());

	return undefined;
};

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

	async get<T, Q extends object = object>(
		path: string,
		opts: RequestOptions<Q> = {},
	): Promise<T> {
		if (!this.apiKey && !this.accessToken) {
			throw new TMDBError(
				"No TMDB authentication provided",
				0,
				`${BASE_URL_V3}${path}`,
			);
		}

		const query: Query = {
			...(opts.query
				? (opts.query as unknown as Record<string, QueryValue>)
				: {}),
			...(this.apiKey ? { api_key: this.apiKey } : {}),
		};

		const qs = parseOptions(query);
		const url = `${BASE_URL_V3}${path}${qs ? `?${qs}` : ""}`;

		const retries = opts.retries ?? 2;
		const retryDelayMs = opts.retryDelayMs ?? 300;
		const timeoutMs = opts.timeoutMs ?? 30_000;

		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), timeoutMs);

		const abortFromSignal = () => controller.abort();

		if (opts.signal) {
			if (opts.signal.aborted) {
				controller.abort();
			} else {
				opts.signal.addEventListener("abort", abortFromSignal, {
					once: true,
				});
			}
		}

		try {
			for (let attempt = 0; attempt <= retries; attempt++) {
				const res = await fetch(url, {
					method: "GET",
					signal: controller.signal,
					headers: {
						...(this.accessToken
							? { Authorization: `Bearer ${this.accessToken}` }
							: {}),
						Accept: "application/json",
					},
				});

				if (res.ok) {
					return (await res.json()) as T;
				}

				let payload: unknown;
				let message = `${res.status} ${res.statusText}`;

				try {
					payload = (await res.json()) as ErrorResponse;
					if (
						payload &&
						typeof payload === "object" &&
						"status_message" in payload
					) {
						message = String((payload as ErrorResponse).status_message);
					}
				} catch {
					try {
						payload = await res.text();
					} catch {
						// ignore
					}
				}

				if (attempt < retries && shouldRetry(res.status)) {
					const retryAfter = readRetryAfterMs(res);
					const delay = retryAfter ?? retryDelayMs * 2 ** attempt;
					await sleep(delay);
					continue;
				}

				throw new TMDBError(message, res.status, url, payload);
			}

			throw new TMDBError("Request failed", 0, url);
		} finally {
			clearTimeout(timeout);

			if (opts.signal) {
				opts.signal.removeEventListener("abort", abortFromSignal);
			}
		}
	}
}

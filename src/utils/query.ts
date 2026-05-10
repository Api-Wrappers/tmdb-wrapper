import type {
	QueryParams,
	QueryPrimitive,
	RequestOptions,
} from "@api-wrappers/api-core";

export type Primitive = QueryPrimitive;
export type Query = QueryParams;
export type RequestConfig = Omit<RequestOptions, "method">;

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
): RequestConfig => ({
	...config,
	query: query as QueryParams | undefined,
});

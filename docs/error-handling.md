# Error Handling

Requests use `@api-wrappers/api-core` for transport, retries, timeouts, and errors.
Failed HTTP responses throw `ApiError` or one of its subclasses.

## Basic Usage

```typescript
import { ApiError } from "@api-wrappers/api-core";
import { TMDB } from "@api-wrappers/tmdb-wrapper";

const tmdb = new TMDB(process.env.TMDB_ACCESS_TOKEN!);

try {
	await tmdb.movies.details(99999999);
} catch (err) {
	if (err instanceof ApiError) {
		console.error(`TMDB error ${err.status}: ${err.message}`);
		console.error(err.responseBody);
	}
}
```

## Automatic Retries

The client automatically retries on transient errors before throwing:

| Status | Retried? |
|--------|----------|
| 429 Too Many Requests | Yes — respects `Retry-After` header |
| 502 Bad Gateway | Yes |
| 503 Service Unavailable | Yes |
| 504 Gateway Timeout | Yes |
| 4xx (other) | No |

The wrapper configures TMDB clients with `maxAttempts: 3`, `delayMs: 300`, `jitter: false`, and retriable status codes `[429, 502, 503, 504]`. `maxAttempts` includes the first request, so this means up to two retries after the initial attempt.

Override retries globally via the constructor `client.retry` option. Override timeouts globally with `client.timeoutMs` or per request via [RequestConfig](./request-config.md).

## No Authentication

If no API key or access token is provided, `ApiError` is thrown immediately with `status: 0` before any network request is made.

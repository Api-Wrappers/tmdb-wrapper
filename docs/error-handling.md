# Error Handling

Requests use `@api-wrappers/api-core` for transport, retries, timeouts, and errors.
Failed HTTP responses throw `ApiError` or one of its subclasses.

## Basic Usage

```typescript
import { ApiError } from '@api-wrappers/api-core';
import { TMDB } from '@api-wrappers/tmdb-wrapper';

const tmdb = new TMDB(process.env.TMDB_ACCESS_TOKEN!);

try {
  const movie = await tmdb.movies.details(99999999);
} catch (err) {
  if (err instanceof ApiError) {
    console.error(`TMDB error ${err.status}: ${err.message}`);
    // err.responseBody contains the raw TMDB error body, e.g.:
    // { status_code: 34, status_message: 'The resource you requested could not be found.', success: false }
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

Default retry settings: **2 retries**, **300 ms base delay** (exponential backoff), **30 s timeout**.

Override retries globally via the constructor `client.retry` option. Override timeouts per request via [RequestConfig](./request-config.md).

## No Authentication

If no API key or access token is provided, `ApiError` is thrown immediately with `status: 0` before any network request is made.

# Error Handling

All failed requests throw a `TMDBError`.

## TMDBError

```typescript
class TMDBError extends Error {
  name: 'TMDBError';
  status: number;   // HTTP status code (0 if the request never completed)
  url: string;      // Full request URL
  payload?: unknown; // Parsed JSON body, raw text, or undefined
}
```

## Basic Usage

```typescript
import { TMDB, TMDBError } from '@api-wrappers/tmdb-wrapper';

const tmdb = new TMDB(process.env.TMDB_ACCESS_TOKEN!);

try {
  const movie = await tmdb.movies.details(99999999);
} catch (err) {
  if (err instanceof TMDBError) {
    console.error(`TMDB error ${err.status}: ${err.message}`);
    // err.payload contains the raw TMDB error body, e.g.:
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

Override per-request via [RequestConfig](./request-config.md).

## No Authentication

If no API key or access token is provided, `TMDBError` is thrown immediately with `status: 0` before any network request is made.

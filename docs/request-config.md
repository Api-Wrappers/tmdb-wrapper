# Request Config

All endpoint methods accept an optional `RequestConfig` as their last parameter. Use it to override per-request behaviour.

## Interface

```typescript
interface RequestConfig {
  headers?: Record<string, string>; // Extra request headers
  signal?: AbortSignal;             // Cancel the request
  timeoutMs?: number;               // Request timeout in milliseconds
  cacheKey?: string;                // Explicit api-core cache key
  tags?: string[];                  // Request metadata for plugins
}
```

## Timeout

```typescript
const movie = await tmdb.movies.details(550, undefined, undefined, {
  timeoutMs: 5000, // abort after 5 seconds
});
```

## Cancellation with AbortSignal

```typescript
const controller = new AbortController();

setTimeout(() => controller.abort(), 2000);

const results = await tmdb.search.movies(
  { query: 'Inception' },
  { signal: controller.signal },
);
```

## Retry Behaviour

Retries happen on status codes 429, 502, 503, and 504. For 429 responses the client reads the `Retry-After` header and waits that duration.

The default retry policy is configured on the underlying api-core client:

```typescript
const tmdb = new TMDB({
  accessToken: process.env.TMDB_ACCESS_TOKEN,
  client: {
    retry: {
      maxAttempts: 3,
      delayMs: 300,
      jitter: false,
      retriableStatusCodes: [429, 502, 503, 504],
    },
  },
});
```

Set `maxAttempts` to `1` to disable retries:

```typescript
const tmdb = new TMDB({
  accessToken: process.env.TMDB_ACCESS_TOKEN,
  client: {
    retry: { maxAttempts: 1 },
  },
});
```

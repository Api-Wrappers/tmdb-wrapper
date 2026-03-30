# Request Config

Most endpoint methods accept an optional `RequestConfig` as their last parameter. Use it to override per-request behaviour.

## Interface

```typescript
interface RequestConfig {
  signal?: AbortSignal;   // Cancel the request
  timeoutMs?: number;     // Request timeout in milliseconds (default: 30000)
  retries?: number;       // Number of retry attempts on transient errors (default: 2)
  retryDelayMs?: number;  // Base delay between retries in ms (default: 300, exponential)
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

## Disabling Retries

```typescript
const movie = await tmdb.movies.details(550, undefined, undefined, {
  retries: 0,
});
```

## Custom Retry Delay

```typescript
// 1 second base delay, doubles each attempt: 1s, 2s
const data = await tmdb.movies.popular(undefined, {
  retries: 2,
  retryDelayMs: 1000,
});
```

## Retry Behaviour

Retries happen on status codes 429, 502, 503, and 504. For 429 responses the client reads the `Retry-After` header and waits that duration instead of using `retryDelayMs`.

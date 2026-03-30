# Configuration — `tmdb.configuration`

Access via `tmdb.configuration` (instance of `ConfigurationEndpoint`).

## Method

### `getCurrent`

```typescript
tmdb.configuration.getCurrent(): Promise<Configuration>
```

Returns the API system configuration, including image base URLs and supported sizes.

```typescript
const config = await tmdb.configuration.getCurrent();

config.images.base_url;        // "http://image.tmdb.org/t/p/"
config.images.secure_base_url; // "https://image.tmdb.org/t/p/"
config.images.backdrop_sizes;  // string[]
config.images.logo_sizes;      // string[]
config.images.poster_sizes;    // string[]
config.images.profile_sizes;   // string[]
config.images.still_sizes;     // string[]
config.change_keys;            // string[]
```

In most cases you do not need to call this directly — the [image utilities](../image-utilities.md) use the standard `https://image.tmdb.org/t/p/` base URL by default.

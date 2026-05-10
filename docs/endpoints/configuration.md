# Configuration — `tmdb.configuration`

Access via `tmdb.configuration` (instance of `ConfigurationEndpoint`).

## Methods

### `getCurrent`

```typescript
tmdb.configuration.getCurrent(request?: RequestConfig): Promise<Configuration>
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

---

### `countries`

```typescript
tmdb.configuration.countries(
  options?: { language?: string },
  request?: RequestConfig,
): Promise<ConfigurationCountry[]>
```

---

### `jobs`

```typescript
tmdb.configuration.jobs(request?: RequestConfig): Promise<ConfigurationJob[]>
```

---

### `languages`

```typescript
tmdb.configuration.languages(
  request?: RequestConfig,
): Promise<ConfigurationLanguage[]>
```

---

### `primaryTranslations`

```typescript
tmdb.configuration.primaryTranslations(
  request?: RequestConfig,
): Promise<string[]>
```

---

### `timezones`

```typescript
tmdb.configuration.timezones(
  request?: RequestConfig,
): Promise<ConfigurationTimezone[]>
```

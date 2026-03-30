# Authentication

TMDB supports two authentication methods. Pass either directly to the `TMDB` constructor.

## Read Access Token (recommended)

Obtain a **read access token** from [TMDB API Settings](https://www.themoviedb.org/settings/api) under "API Read Access Token".

```typescript
import { TMDB } from '@api-wrappers/tmdb-wrapper';

const tmdb = new TMDB('YOUR_READ_ACCESS_TOKEN');
```

The token is sent as a `Bearer` token in the `Authorization` header on every request.

## API Key

```typescript
const tmdb = new TMDB({ apiKey: 'YOUR_API_KEY' });
```

The API key is appended as the `api_key` query parameter.

## Combined Config

You can provide both. The access token takes precedence for the `Authorization` header; the API key is added as a query parameter only when present.

```typescript
const tmdb = new TMDB({
  accessToken: 'YOUR_READ_ACCESS_TOKEN',
  apiKey: 'YOUR_API_KEY',
});
```

## Using Environment Variables

Never commit credentials to source control. Use environment variables:

```typescript
const tmdb = new TMDB(process.env.TMDB_ACCESS_TOKEN!);
```

## Type Reference

```typescript
type TMDBConfig =
  | { accessToken: string; apiKey?: string }
  | { apiKey: string; accessToken?: string };

type TokenType = string | TMDBConfig;
```

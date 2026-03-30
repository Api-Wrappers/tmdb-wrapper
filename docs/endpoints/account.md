# Account — `tmdb.account`

Access via `tmdb.account` (instance of `AccountEndpoint`).

## Method

### `details`

```typescript
tmdb.account.details(accountId: number): Promise<AccountDetails>
```

```typescript
const account = await tmdb.account.details(12345);
account.id;
account.name;
account.username;
account.iso_3166_1; // country code
account.iso_639_1;  // language code
account.include_adult;
```

## Types

```typescript
interface AccountDetails {
  avatar: {
    gravatar: { hash: string };
    tmdb: { avatar_path: string | null };
  };
  id: number;
  include_adult: boolean;
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  username: string;
}
```

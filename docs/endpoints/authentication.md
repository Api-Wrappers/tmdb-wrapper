# Authentication — `tmdb.authentication`

Access via `tmdb.authentication` (instance of `AuthenticationEndpoint`).

## Methods

```typescript
tmdb.authentication.validateKey();
tmdb.authentication.createGuestSession();
tmdb.authentication.createRequestToken();
tmdb.authentication.createSession("REQUEST_TOKEN");
tmdb.authentication.createSessionFromV4Token("V4_ACCESS_TOKEN");
tmdb.authentication.createSessionWithLogin({
  username: "username",
  password: "password",
  request_token: "REQUEST_TOKEN",
});
tmdb.authentication.deleteSession("SESSION_ID");
```

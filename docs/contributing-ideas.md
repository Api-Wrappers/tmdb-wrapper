# Beginner-Friendly Contribution Ideas

These ideas are intentionally small and reviewable. Pick one, open an issue or comment on an existing one, and keep the PR focused.

1. Add a README example for TV show details with appended credits and videos.
2. Add a docs example for account watchlists using `tmdb.account.watchlistMovies`.
3. Add a docs example for `tmdb.people.details` and `tmdb.people.movieCredits`.
4. Improve an endpoint docs page by adding missing option descriptions.
5. Add a test that verifies a documented endpoint method uses the expected TMDB path.
6. Add a troubleshooting note for invalid access tokens or API keys.
7. Add a troubleshooting note for missing poster or backdrop paths.
8. Improve image helper docs with examples for poster, backdrop, and provider logos.
9. Add examples for TV season and TV episode lookups.
10. Add examples for `tmdb.discover.tvShow` filters.
11. Check docs for stale method names after source changes.
12. Add a small example that shows per-request `timeoutMs` and `AbortController`.
13. Improve issue labels or issue template wording for first-time contributors.
14. Add tests for query serialization in endpoints that accept arrays or comma-separated options.
15. Add docs for choosing between TMDB API key auth and read access token auth.

## A Good First PR Shape

- One topic.
- One or two files changed if possible.
- A short explanation of what was unclear before.
- A before/after code example for documentation changes.
- Tests when behavior changes.

## Things To Avoid In First PRs

- Large endpoint rewrites.
- Public API redesigns.
- Generated files without a clear review plan.
- Claims that the wrapper supports all TMDB endpoints unless coverage is proven in source and tests.

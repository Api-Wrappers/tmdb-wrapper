# Roadmap

This roadmap describes likely areas of improvement for `@api-wrappers/tmdb-wrapper`. It is not a promise of full TMDB endpoint coverage or a release schedule.

## Current Priorities

- Keep the README focused on what the wrapper does, who it helps, and why it is easier than repeated raw fetch calls.
- Keep examples copy-pasteable for common app workflows: search, details, trending, images, watch providers, and pagination.
- Keep endpoint docs aligned with the source so users can trust method names and argument order.
- Improve test coverage for endpoint path, query, body, and request config behavior.
- Preserve the current public API shape unless a clear bug requires a change.

## Endpoint Coverage

- Fill gaps in implemented TMDB v3 resource areas as issues identify them.
- Add missing option fields when TMDB supports them and the wrapper has a clear type-safe mapping.
- Keep append-to-response keys typed for details methods that support them.
- Prefer small endpoint PRs with tests and docs over large unreviewable coverage drops.

## Developer Experience

- Expand examples for real-world use cases such as watchlists, TV trackers, recommendations, and dashboards.
- Improve troubleshooting docs for authentication, rate limits, invalid IDs, and missing image paths.
- Keep Bun and Node usage documented and verified through package tests.
- Add more beginner-friendly issues that improve docs, types, and endpoint examples.

## Quality Bar

- Strict TypeScript.
- No `any`.
- Biome-clean formatting.
- Tests for behavior changes.
- Source-verified documentation claims.
- No invented features or unsupported TMDB coverage claims.

## Good Future Issues

- Add examples for account watchlists and favorites.
- Add examples for TV season and episode lookups.
- Add a troubleshooting page for common TMDB auth errors.
- Audit endpoint docs for missing request options.
- Add tests for per-request timeout and abort signal plumbing.
- Improve docs around API key versus read access token authentication.

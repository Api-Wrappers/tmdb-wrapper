---
type: executor-prompt
title: Implement TMDB Wrapper Transport and Request Config Improvements
slug: api-wrapper-improvements
created: 2026-06-25
status: ready
target: "@api-wrappers/tmdb-wrapper API client, endpoint classes, docs, and tests"
related:
  - audit.html
---

# Task

Implement the following plan exactly. Do not redesign the approach unless you find a real blocker.

# Context

This repository is `@api-wrappers/tmdb-wrapper`, a strict TypeScript package for TMDB API v3. It uses Bun scripts, `tsdown` for ESM/CJS/declaration builds, Biome checks, and `@api-wrappers/api-core` for transport.

The public facade is `TMDB` in `src/index.ts`. It exposes endpoint groups such as `movies`, `tvShows`, `search`, `account`, `configuration`, and others. The current implementation constructs every endpoint group separately, and `BaseEndpoint` creates a fresh `TMDBApiClient` for each endpoint. Newer endpoints support a final `RequestConfig`, but older endpoints still pass raw `{ query: options }` objects and do not consistently support timeout, abort signal, custom headers, cache keys, or tags.

The goal is to improve the wrapper without changing the public `new TMDB(...)` facade or endpoint-group names.

# Implementation Plan

1. Characterize current behavior. Run the existing targeted checks before editing: `bun run typecheck`, `bun run check`, and `bun test tests/client.test.ts tests/tmdb-client.test.ts tests/endpoint-coverage.test.ts`. Do not run write-format commands before making source changes.

2. Share the transport client. In `src/index.ts`, create one `TMDBApiClient` in the `TMDB` constructor. Update `src/@types/models/baseEndpoint.ts` so endpoint classes receive that client instead of constructing their own. Preserve endpoint class property names and public `new TMDB(auth)` usage.

3. Keep endpoint constructors boring and compatible. Update endpoint constructors in `src/endpoints/*.ts` to call `super(api)` or use a small constructor helper pattern. Avoid per-endpoint custom transport logic.

4. Add a shared-client regression test. In `tests/tmdb-client.test.ts` or `tests/client.test.ts`, inject a custom `fetch` through `client.fetch`, call methods on multiple endpoint groups, and assert the same fetch configuration is honored across those groups. If direct identity checks require exposing internals, avoid exposing internals and verify behavior through calls.

5. Standardize request-config signatures incrementally. Sweep `src/endpoints/*.ts` for methods that call `this.api.get`, `post`, `delete`, or similar without a final `request?: RequestConfig`. Add `request?: RequestConfig` as the last parameter and pass it through with `withQuery` or directly when no query exists.

6. Use `withQuery` consistently. Replace raw `{ query: options }` with `withQuery(options, request)` once the method accepts request config. For computed query objects such as append-to-response or image-language arrays, keep the existing `csv` behavior.

7. Protect public compatibility. For methods where adding a final optional argument could conflict with an existing positional API, preserve current parameter order and only append the request argument. Do not reorder existing options, IDs, session IDs, or bodies.

8. Tighten query typing only if it stays small. If the casts in `src/utils/query.ts` can be reduced with a local endpoint-query type compatible with `api-core`, do that in the same pass. If it becomes invasive, leave it for a second task and document why.

9. Expand endpoint coverage tests for request config. Add focused tests that call representative methods across older and newer endpoint groups with request config. At minimum verify custom headers or abort signal pass to fetch for movies, TV shows, genre, changes, and account/search-style query endpoints.

10. Update docs after tests pass. Update `docs/request-config.md` and README snippets only if examples need changed argument placement or if request-config support becomes materially broader. Keep docs source-verified.

11. Run final validation. Run `bun run typecheck`, `bun run check`, `bun test`, and `bun run build`. If preparing a release or changing package exports, run `bun pm pack --dry-run` or `bun run verify`.

# Constraints

- Follow existing project patterns.
- Keep the change focused.
- Do not perform unrelated refactors.
- Preserve existing behavior unless explicitly changed by the plan.
- Reuse existing types, schemas, utilities, services, and components before creating new ones.
- Avoid adding dependencies unless explicitly allowed.
- Do not generate a TMDB client or redesign the endpoint model.
- Do not remove the root `TMDB` class or rename endpoint groups.
- Do not add new TMDB endpoint coverage in the same task unless needed for tests.
- Do not change auth semantics beyond preserving current API key and bearer-token behavior.

# TypeScript Rules

- Do not use `any`.
- Prefer the existing project style.
- Prefer const functions where consistent with the codebase.
- Avoid weakening type safety.
- Preserve strict TypeScript behavior.

# Validation

Before finishing:

- Run `bun run typecheck`.
- Run `bun run check`.
- Run `bun test`.
- Run `bun run build`.
- Run `bun pm pack --dry-run` if package exports or publish files are changed.

# Acceptance Criteria

- A `TMDB` instance uses one shared configured `TMDBApiClient` across all endpoint groups.
- Existing examples such as `new TMDB(token)`, `tmdb.movies.details(...)`, and `tmdb.search.movies(...)` continue to compile.
- Endpoint methods consistently support final-argument `RequestConfig` unless there is a documented exception.
- Raw query-object call sites are replaced with the shared query helper where request config is involved.
- Tests cover shared transport behavior and representative request-config pass-through across multiple endpoint groups.
- `bun run typecheck`, `bun run check`, `bun test`, and `bun run build` pass.
- Docs remain accurate and do not claim unsupported endpoint coverage.

# Final Response

When done, respond with:

1. Summary of changes
2. Files changed
3. Commands run
4. Tests/checks completed
5. Any blockers, assumptions, or follow-up recommendations

# Contributing

Thank you for helping improve `@api-wrappers/tmdb-wrapper`.

This project is a TypeScript wrapper around TMDB API v3. Contributions should keep the public API predictable, documented, and easy to use from Bun or Node projects.

## Before You Start

- Check existing issues and pull requests to avoid duplicate work.
- For new endpoint coverage, link to the relevant TMDB API documentation in the issue or PR.
- Do not make broad coverage claims unless the source and tests prove them.
- Avoid public API changes unless they fix a clear bug or are discussed first.

## Local Setup

```bash
bun install
```

Run the full local validation before opening a PR:

```bash
bun run verify
```

`bun run verify` runs `check`, `typecheck`, `test`, `build`, and a Bun package dry run.

## Development Workflow

1. Create a focused branch.
2. Make the smallest useful change.
3. Add or update tests when behavior changes.
4. Update README or docs when usage, options, endpoint coverage, or examples change.
5. Run the validation commands above.
6. Open a pull request and fill out the template.

## Code Style

- Keep TypeScript strict.
- Do not use `any`; prefer existing exported types, `unknown`, generics, or narrower local interfaces.
- Prefer `const` functions for new local helpers.
- Keep endpoint methods grouped by TMDB resource area.
- Keep request options as the last argument when adding endpoint methods.
- Reuse `withQuery`, `csv`, and existing endpoint patterns instead of hand-rolling query serialization.
- Keep formatting compatible with Biome by running `bun run check:write` when needed.

## Endpoint Contributions

When adding or fixing an endpoint:

- Add or update response and option types in `src/@types`.
- Add the endpoint method in the matching `src/endpoints/*` file.
- Export new types from the existing barrel files if needed.
- Add a test that proves the method maps to the expected TMDB path, method, query, and body.
- Add or update endpoint docs under `docs/endpoints`.
- Include a short README or docs example if the endpoint unlocks a common workflow.

## Documentation Contributions

Documentation changes are welcome on their own. Useful docs PRs include:

- clearer README examples,
- endpoint docs with missing option details,
- error-handling examples,
- image helper examples,
- migration notes,
- troubleshooting notes,
- copy-paste app snippets.

See [docs/contributing-ideas.md](./docs/contributing-ideas.md) for beginner-friendly ideas.

## Reporting Bugs

Use the **Bug Report** issue template and include:

- package version,
- runtime and version,
- minimal code sample,
- expected behavior,
- actual behavior,
- relevant TMDB endpoint or docs link.

Do not include private TMDB tokens, API keys, or session IDs.

## Requesting Features

Use the **Feature Request** template for endpoint coverage, helper APIs, or behavior improvements. Include a proposed usage example and a TMDB docs link when the request maps to a TMDB endpoint.

## Documentation Requests

Use the **Documentation Request** template when the source works but the docs are unclear, incomplete, or missing examples.

## Security

Please read [SECURITY.md](./SECURITY.md) before reporting security-sensitive issues.

## Changelog

User-facing fixes, docs improvements, and package trust changes should be noted in [CHANGELOG.md](./CHANGELOG.md) under `Unreleased`.

For package releases, add a changeset with `bun run changeset`. The release workflow turns merged changesets into a version PR, npm publish, and GitHub release notes.

## Code Of Conduct

Please read and follow [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

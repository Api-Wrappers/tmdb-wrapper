# Contributing

Thank you for your interest in contributing to `@api-wrappers/tmdb-wrapper`!

## Getting Started

1. Fork the repository and clone it locally.
2. Install dependencies:
   ```bash
   bun install
   ```
3. Run the tests to make sure everything works:
   ```bash
   bun test
   ```

## Development Workflow

- **Tests:** `bun test`
- **Build:** `bun run build`
- **Lint / format:** `bun run check` (read-only) or `bun run check:write` (auto-fix)

## Submitting Changes

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes, adding tests where appropriate.
3. Ensure all checks pass (`bun test`, `bun run check`, `bun run build`).
4. Open a pull request against `main` and fill out the PR template.

## Reporting Bugs

Open an issue using the **Bug Report** template. Please include a minimal reproduction.

## Suggesting Features

Open an issue using the **Feature Request** template.

## Good First Issues

Issues labelled [`good first issue`](https://github.com/Api-Wrappers/tmdb-wrapper/issues?q=is%3Aopen+label%3A%22good+first+issue%22) are a great starting point.

## Code Style

This project uses [Biome](https://biomejs.dev/) for linting and formatting. Run `bun run check:write` before committing to auto-fix any style issues.

## Commit Messages

Use short, imperative commit messages (e.g. `fix: handle null poster_path`, `feat: add getLatest endpoint`).

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

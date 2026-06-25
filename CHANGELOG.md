# Changelog

## 2.2.0

### Minor Changes

- Add universal RequestConfig support across all endpoint methods. Every endpoint method now accepts an optional `request` parameter for per-call overrides (headers, timeout, etc.). Shared transport client is now created once in the TMDB facade and injected into all endpoint groups.

All notable changes to `@api-wrappers/tmdb-wrapper` will be documented in this file.

This project aims to follow [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) style sections and uses package versions from `package.json`.

## Unreleased

### Added

- Added open-source trust documentation for roadmap, contribution ideas, copy-paste examples, and issue reporting.
- Added GitHub issue forms for bugs, feature requests, and documentation requests.
- Added a repository verification script that runs formatting checks, typechecking, tests, build, and a Bun package dry run.
- Added Changesets-based release automation with npm provenance and GitHub release notes.

### Changed

- Improved README positioning, practical examples, runtime support notes, and contribution links.
- Expanded package metadata and published file includes for docs, examples, license, and changelog.
- Standardized CI and release workflows around Bun validation.

## 2.1.2

Current published package version when this changelog was introduced. Earlier release notes were not maintained in this file.

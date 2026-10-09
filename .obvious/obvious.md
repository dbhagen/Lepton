# Autobuild orientation — dbhagen/Lepton

Lepton is an Electron desktop app for managing GitHub gists and code snippets (search, tagging, markdown preview, OAuth login). This repository is dbhagen's community-maintenance fork of the active upstream project [hackjutsu/Lepton](https://github.com/hackjutsu/Lepton): it preserves upstream's product intent and exists for maintenance work (dependency, toolchain, CI, documentation), not fork-specific features. Its users are individual developers running the packaged desktop app on macOS, Windows, or Linux.

## Where to look first

Maintenance and orientation docs live in `.obvious/`:

- [`.obvious/orientation.md`](orientation.md) — repo purpose, fork status, architecture tour
- [`.obvious/codebase-map.md`](codebase-map.md) — directory-by-directory map of the Electron codebase
- [`.obvious/local-dev.md`](local-dev.md) — verified setup, commands, Electron 8 constraints, gotchas
- [`.obvious/QA.md`](QA.md) — what quality assurance can and cannot prove in this environment

`.obvious/config.yml` sets the Autobuild workflow policy for this repo (default base, merge method, automated-review routing, QA paths).

## Verified entry commands

- **Node.js 20** and **classic Yarn 1.x** (`yarn.lock` is v1 format; CI pins `yarn@1.22.22`).
- `yarn install` — install dependencies (CI runs `yarn install --frozen-lockfile`).
- `yarn lint` — `eslint app`.
- `yarn test` — `jest`, the behavior-test suite for the pure-logic utilities (2 suites, 16 tests: 12 parser, 4 search) under `app/utilities/**/__tests__/`.
- `yarn build` — webpack development bundle into `bundle/`. The scripts wrap `NODE_OPTIONS=--openssl-legacy-provider` via `cross-env`; on Node ≥ 17 do not invoke bare `webpack` directly.

These are the exact steps `.github/workflows/ci.yml` runs on every PR to `master` — install, lint, build, and the Jest step — so they are exercised continuously on every PR. (History: before PR #3 merged, the `test` script aliased the dev webpack build; it now runs Jest.)

## Highest-priority constraints for automated work

1. **Preserve fork intent and upstream compatibility.** No fork-only product features — new features stay proposals.
2. **Electron 8 vintage.** The renderer assumes `nodeIntegration: true`, the `remote` module, and pre-Electron-14 IPC; do not modernize those APIs without a porting plan (see `.obvious/local-dev.md`).
3. **Honest QA boundary.** On Linux, lint/build/unit tests are the only provable gates. GUI runtime behavior, macOS/Windows packaging, and OAuth-gated flows cannot be verified in this environment — do not claim runtime verification for them (see `.obvious/QA.md`).

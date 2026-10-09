# QA — dbhagen/Lepton

Quality gates for this fork, verified 2026-10-09 at `master` (`2573318`) plus the lead-verified toolchain/test PR state (PR #1 `chore/node20-build-ci`; Jest behavior tests under `app/utilities/**/__tests__`).

## Gates

| Gate | Command | Covers |
|---|---|---|
| Lint | `yarn lint` | `eslint app` — standard config + react plugin (`app/` only; `.eslintignore` excludes dist, node_modules, webpack configs). |
| Build | `yarn build` / `yarn webpack-prod` | webpack 4 + babel 6 compile of the full renderer; SCSS via sass-loader (Dart Sass post-PR #1). |
| Unit tests | `npm test` | Jest behavior tests for the pure-logic modules (`app/utilities/**/__tests__`, currently parser and search) using synthetic data — post-test-PR; see note below. |

Run all three locally (Node 20, classic Yarn):

```bash
yarn lint
yarn build
npm test
```

Session evidence (Node 20.20.2, yarn 1.22.22):

- `yarn lint` → exit 0, clean.
- `npx webpack --mode production` without the legacy-provider flag → exit 1 with `ERR_OSSL_EVP_UNSUPPORTED` (`digital envelope routines::unsupported`) — reproduced this session; this is why the scripts must keep the `cross-env NODE_OPTIONS=--openssl-legacy-provider` wrapper.

Script-history note: at the base commit the `test` script aliases the dev webpack build; the test-unit PR repoints it at Jest and adds the `__tests__` directories. This page documents the merged post-PR state; until that PR lands, `npm test` runs the webpack dev build instead of Jest.

## CI coverage

`.github/workflows/ci.yml` (added by the toolchain PR):

- Workflow name **CI**, job **lint-and-build**, `ubuntu-latest`, Node 20.
- Steps: checkout → setup-node 20 → `npm i -g yarn@1.22.22` → `yarn install --frozen-lockfile` → `yarn lint` → `yarn build`.
- Triggers: `push` and `pull_request` on `master`.

Unit tests are intended to be added as an additive CI step by the test-unit PR. README's status badge points at this workflow (`.github/workflows/ci.yml/badge.svg`).

## What these gates prove — and what they do not

**Proven on the Linux sandbox:** ESLint passes, the webpack bundle compiles on Node 20 (with the openssl-legacy wrapper), and the Jest unit tests pass over synthetic fixtures. That is the complete boundary of automated proof for this repo.

**Not proven here, and not claimable:**

- **GUI/runtime behavior.** Electron 8 window lifecycle, login page, snippet editing, search overlay, theming, notifications — none are exercised by lint/build/unit tests. No GUI runtime verification has been performed.
- **Platform packaging.** macOS/Windows/Linux installer builds (`yarn dist -- -m/-w/-l`) are untested; macOS codesigning and the Windows nsis/7z targets cannot be validated on Linux. The Linux sandbox proves nothing about release artifacts.
- **OAuth-gated GitHub behavior.** Token exchange, gist sync, profile fetch, and create/edit/delete flows hit `api.github.com` with real credentials; they are untestable here and all unit-test data is synthetic. Fixture proofs do not establish live GitHub API behavior, proxy, or GitHub Enterprise paths.
- **Auto-update, proxy, enterprise.** Runtime-only paths behind `electron-updater` and `.leptonrc` settings.

## Merge-state caveat (403)

Branch-protection state on this repository could not be verified via the API (403 on the available tokens). Consequences:

- Green checks on a PR do **not** by themselves prove the merge landed — confirm the commit is actually on `master` after merging (e.g. `git fetch && git log origin/master`).
- Required-status expectations may differ from what the UI shows; re-check after any base change.

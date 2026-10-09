# Local development — dbhagen/Lepton

Verified 2026-10-09 against `package.json` at `master` (`2573318`) plus the lead-verified post-toolchain state (PR #1, branch `chore/node20-build-ci`). Every command below is real: it either matches the scripts in `package.json` at the base or the post-PR #1 script set quoted there. Nothing on this page is invented.

## Requirements

- **Node.js 20** (verified locally: v20.20.2; CI pins `node-version: 20`).
- **Classic Yarn 1.x** — the project predates Yarn Berry and uses `yarn.lock` v1 (CI pins `yarn@1.22.22`; verified locally with 1.22.22).
- On Node ≥ 17, webpack 4's md4 hashing fails against OpenSSL 3 (`ERR_OSSL_EVP_UNSUPPORTED`, reproduced this session on v20.20.2). The toolchain PR wires `NODE_OPTIONS=--openssl-legacy-provider` into the webpack scripts via `cross-env`, so you do **not** set it manually.
- Styles compile with **Dart Sass** (`sass`) after the toolchain PR; the legacy native `node-sass` module could not build against Node 20's ABI and was replaced (no manual build tools needed).

## Setup

```bash
git clone https://github.com/dbhagen/Lepton.git   # or your fork's remote
cd Lepton
yarn install                 # CI uses: yarn install --frozen-lockfile
```

Optional, for GitHub login at runtime: duplicate `configs/accountDummy.js` to `configs/account.js` and put a real GitHub OAuth app `client_id`/`client_secret` in it. `configs/account.js` is git-ignored — never commit credentials. Without it the app falls back to the dummy config and the OAuth exchange will not succeed.

## Commands

| Command | What it runs (post-PR #1) |
|---|---|
| `yarn lint` | `eslint app` — no openssl flag needed. Verified: exit 0 on Node 20.20.2. |
| `yarn build` | `cross-env NODE_OPTIONS=--openssl-legacy-provider npm run webpack-dev` — dev bundle into `bundle/`. |
| `yarn webpack-prod` | `cross-env NODE_OPTIONS=--openssl-legacy-provider webpack --mode production`. |
| `yarn webpack-watch` | Same as webpack-prod's env but `webpack --watch`. |
| `npm test` | `jest` — runs the Jest behavior suite under `app/utilities/**/__tests__/` (repointed from a legacy webpack-dev alias by PR #3). |
| `yarn start` | `electron ./main.js` — run after `yarn build` so `bundle/app.bundle.js` exists. |
| `yarn license` | `license-checker --production ...` — regenerates `license.json`. |

Dev loop:

```bash
yarn build && yarn start
```

## Packaging

Commands as defined in `package.json` (`dist`/`pack`/`release` all invoke `electron-builder`; the README documents the target flags):

```bash
yarn dist -- -m     # macOS
yarn dist -- -w     # Windows
yarn dist -- -l     # Linux (snap target needs a running Docker daemon)
yarn dist -- -wml   # macOS + Windows + Linux
yarn dist           # current OS, current arch
yarn pack           # unpackaged app directory (electron-builder --dir)
```

Electron-builder targets live in the `build` section of `package.json`: `mac` (zip via `publish: github`, darkModeSupport), `win` (nsis + 7z, x64/ia32), `linux` (AppImage + snap). See the electron-builder docs linked from the README before building installers.

## Electron 8 constraints

- Classic two-process model: the renderer runs with `nodeIntegration: true` and uses the `remote` module heavily (`app/index.js`, `app/utilities/githubApi/index.js`, `app/utilities/notifier/index.js`). Code assumes the pre-Electron-14 `remote`/IPC world — do not "modernize" without a porting plan.
- The renderer is webpack-bundled (`target: 'electron-renderer'`), the main process is plain CommonJS.
- Node-side APIs in the renderer (fs, path) come from Electron 8's bundled Node; keep renderer code compatible with that vintage when touching `app/`.
- Auto-update (`electron-updater`) only checks in production builds and is driven by GitHub releases — this fork publishes no releases, so updater behavior is effectively dormant here.

## Gotchas

- `.gitignore` ignores any path named `test` — put Jest tests under `app/utilities/**/__tests__/`, not in a top-level `test/` directory.
- `yarn.lock` is v1 format; Yarn Berry will not read it. Use classic Yarn.
- If a webpack build still fails with `ERR_OSSL_EVP_UNSUPPORTED`, you invoked the underlying `webpack` binary directly instead of the `cross-env`-wrapped scripts.

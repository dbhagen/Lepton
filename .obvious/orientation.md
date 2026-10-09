# Orientation — dbhagen/Lepton

Verified 2026-10-09 against the source at this fork's `master` (commit `2573318`). Every claim below was checked against the named files; this is a community maintenance fork of [hackjutsu/Lepton](https://github.com/hackjutsu/Lepton) (which remains the active upstream), based on upstream v1.9.1 from September 2020.

## What the app is

Lepton is a cross-platform (macOS/Windows/Linux) desktop code snippet manager backed by GitHub Gists, built with Electron 8 + React 16 + Redux. It syncs a user's gists, groups them by language tag and custom `#tags:` metadata, provides fuzzy search, markdown/Jupyter notebook preview, theming, and proxy/GitHub Enterprise support. (`README.md`, `package.json`, `app/index.js`.)

## Process model

Two processes, per the classic Electron split:

### Main process — `main.js`

`main.js` is the Electron main process entry (`package.json` `main` field). It:

- Creates the `BrowserWindow` (default 1100×800, min 636×609) with `nodeIntegration: true`, restoring saved window size/position via `electron-window-state` (`main.js`).
- Layers configuration with `nconf`: CLI args → environment → `~/.leptonrc` file → defaults from `configs/defaultConfig.js`; exposes it process-wide as `global.conf` (`main.js`, `initGlobalConfigs`).
- Sets up a `winston` logger written to `<userData>/logs/<timestamp>.log`, exposed as `global.logger` (`main.js`, `initGlobalLogger`).
- Runs `electron-updater` auto-update checks in production builds only (skipped in dev and for `alpha` versions); on update availability it notifies the renderer via IPC `update-available` (`main.js`).
- Builds the application menu from `app/utilities/menu/mainMenu.js` plus a Gist menu whose items send renderer IPC events (`new-gist`, `edit-gist`, `delete-gist-check`, `submit-gist`, `sync-gists`, `exit-editor`, `immersive-mode`, `back-to-normal-mode`, `dashboard`, `about-page`, `search-gist`) (`main.js`, `setUpApplicationMenu`).
- Adds a macOS TouchBar with buttons that send the same IPC events (`main.js`, `setUpTouchBar`), and hides-to-tray behavior on macOS window close.
- Forces external navigation out to the system browser via `shell.openExternal` (`main.js`, `will-navigate` handler).

### Renderer bootstrap — `app/index.js`

`app/index.js` is the webpack entry (`webpack.config.js` → `./app/index.js`, target `electron-renderer`, output `bundle/app.bundle.js` loaded by the root `index.html`). It:

- Creates the Redux store (`redux` + `redux-thunk`) and mounts `AppContainer` from `app/containers/appContainer` into `#container` (`app/index.js`).
- **OAuth login**: if no cached token, opens a child `BrowserWindow` (with `nodeIntegration: false`) at `github.com/login/oauth/authorize` using `client_id`/`client_secret` from `configs/account.js` (falls back to `configs/accountDummy.js` when absent), intercepts the redirect `code`, and exchanges it for an access token via `EXCHANGE_ACCESS_TOKEN` in `app/utilities/githubApi/index.js` (`app/index.js`, `launchAuthWindow`). This flow requires a real GitHub OAuth app at runtime; it cannot be exercised without real credentials.
- **Sync**: `updateUserGists` fetches all gists via `GET_ALL_GISTS`, builds the language tag index (gists bucketed per `lang@`-prefixed language), extracts custom tags from each gist description with `app/utilities/parser/index.js` (`descriptionParser` + `parseCustomTags`), rebuilds the fuzzy search index via `app/utilities/search/index.js`, preserves cached gist details when `updated_at` is unchanged, and dispatches the results into Redux (`app/index.js`, `updateUserGists`).
- **Caching**: stores token/profile in `electron-json-storage-sync`, downloads the avatar to `<userData>/profile/`, and keeps per-user pinned tags in a JSON file managed by `app/utilities/store/index.js` (`app/index.js`, `updateLocalStorage`, `syncLocalPref`).
- **IPC handling**: listens for the menu/TouchBar events listed above and toggles the corresponding Redux status flags, guarding so modal/dialog states exclude each other (`app/index.js`, "Response to main process events" section).

## Redux layer

- `app/actions/index.js` — all action-type constants (e.g. `UPDATE_GISTS`, `SELECT_GIST_TAG`) and thunk creators, including `fetchSingleGist` which pulls a gist's full content through the GitHub API.
- `app/reducers/index.js` — `combineReducers` over ~24 small per-concern reducers (active gist/tag, sync status, modal/window statuses, pinned tags, session/token, update info).

## UI surfaces — `app/containers/`

One directory per screen/panel, each with `index.js` (React component, redux-connected) plus SCSS: `appContainer` (root layout), `loginPage`, `navigationPanel`/`navigationPanelDetails` (tag sidebar), `snippetPanel`/`snippet` (list + item), `gistEditor`/`gistEditorForm` (create/edit), `codeArea` (CodeMirror editor + markdown/Jupyter preview), `searchPage`, `dashboard` (chart.js usage stats), `aboutPage`, `userPanel`.

## Utilities — `app/utilities/`

| Module | Purpose (verified from source) |
|---|---|
| `parser/index.js` | Snippet description metadata parser: `[title]` extraction; custom tags in legacy style (`#tags: a, b, c`, split on ASCII/Chinese commas and `、`) or Twitter style (`#a #b` via `twitter-text`); `lang@` language-tag prefix round-trip (`addLangPrefix`/`parseLangName`). |
| `search/index.js` | Fuzzy search index over `id`/`description`/`language`/`filename` backed by fuse.js (threshold 0.2, tokenized); `fuseSearch` returns `[]` for patterns ≤ 1 character. |
| `githubApi/index.js` | All GitHub REST calls with `request-promise`: OAuth token exchange, user profile, single/all gists (paginated V2 using the `Link` header, with a sequential V1 fallback for 2FA clients), create/edit/delete gist; optional `proxy-agent` and GitHub Enterprise host (`<host>/api/v3`); `getGitHubApi(selection)` dispatches by operation constant. |
| `store/index.js` | Minimal synchronous JSON file store (get/set) under the Electron `userData` path, used for user preferences such as pinned tags. |
| `themeManager/index.js` | Light/dark theme switcher applying CSS custom properties to `:root` from `themes/lightTheme.json` / `themes/darkTheme.json`. |
| `markdown/index.js` | `markdown-it` renderer with highlight.js, task lists, and KaTeX plugins. |
| `jupyterNotebook/index.js` | `notebookjs` renderer with Prism highlighting for `.ipynb` previews. |
| `notifier/index.js` | Desktop notifications, gated by `notifications:success`/`failure` config flags. |
| `menu/mainMenu.js` | Base application menu template (Edit/View/Window/Help roles) consumed by `main.js`. |
| `octodex/` | Octocat avatar images used by the login page. |
| `vendor/` | Bundled third-party assets: Bootstrap CSS, highlight.js and Prism distributions. |

## Configuration model

- `configs/defaultConfig.js` — defaults for theme, autoUpdate, logger level, proxy, snippet sorting, editor, enterprise, notifications, and keyboard shortcuts.
- `~/.leptonrc` (user home) — optional user overrides, resolved by `nconf` in `main.js`.
- `configs/account.js` — GitHub OAuth app `client_id`/`client_secret`; git-ignored (see `.gitignore`), created by copying `configs/accountDummy.js`. Keep real credentials out of git.

## Maintenance notes

- This fork is in maintenance mode: compatible toolchain fixes (Node 20, Dart Sass), docs, and tests; product features remain upstream. See `.obvious/local-dev.md` and `.obvious/QA.md`.
- `.gitignore` ignores any path named `test`, so Jest tests live under `app/utilities/**/__tests__/` (post-U2 layout).

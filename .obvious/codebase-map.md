# Codebase map — dbhagen/Lepton

Verified 2026-10-09 by listing directories (depth ≤ 2) and reading key files at `master` (`2573318`). `node_modules/`, `dist/`, and webpack build output (`bundle/`) are not mapped. Depth is capped at 2 levels.

```
.                        repo root
├── main.js              Electron main process: window, menu, TouchBar, config, logging, auto-update
├── index.html           Renderer shell; loads ./bundle/app.bundle.js
├── package.json         Scripts, dependencies, electron-builder targets (repo URL points upstream by intent)
├── webpack.config.js    webpack 4 config: entry app/index.js, target electron-renderer, output bundle/
├── .eslintrc.js         ESLint: standard config + react plugin, babel-eslint parser
├── .eslintignore        Ignores dist, node_modules, webpack*.config.js
├── .travis.yml          Legacy Travis CI (Node 10) — dead service; removed by the toolchain PR
├── .all-contributorsrc  Contributor registry backing the README ALL-CONTRIBUTORS table
├── configs/
│   ├── accountDummy.js  Placeholder OAuth client_id/client_secret used when account.js is absent
│   └── defaultConfig.js Default nconf settings (theme, logger, proxy, editor, shortcuts, ...)
├── app/
│   ├── index.js         Renderer bootstrap: Redux store, OAuth window, gist sync, IPC handling
│   ├── actions/
│   │   └── index.js     Action-type constants and thunk creators
│   ├── reducers/
│   │   └── index.js     combineReducers over ~24 per-concern reducers (reducer_*.js)
│   ├── containers/
│   │   ├── appContainer/      Root layout component
│   │   ├── loginPage/         GitHub login screen
│   │   ├── navigationPanel/   Left sidebar: language/custom tags, gist list entry
│   │   ├── navigationPanelDetails/  Tag details row in the sidebar
│   │   ├── snippetPanel/      Snippet list for the active tag
│   │   ├── snippet/           Single snippet row and raw-view
│   │   ├── gistEditor/        Snippet editor shell
│   │   ├── gistEditorForm/    Create/edit form (redux-form)
│   │   ├── codeArea/          CodeMirror editor + markdown/Jupyter preview
│   │   ├── searchPage/        Search overlay (uses app/utilities/search)
│   │   ├── dashboard/         Usage charts (chart.js)
│   │   ├── aboutPage/         About dialog (version, config path)
│   │   └── userPanel/         Profile/logout panel
│   └── utilities/
│       ├── parser/           Description/tag/language-prefix parsing (pure logic)
│       ├── search/           fuse.js search-index wrapper (pure logic)
│       ├── githubApi/        GitHub REST client: token exchange, gists CRUD, proxy/enterprise
│       ├── store/            Synchronous JSON file store (user preferences)
│       ├── themeManager/     Light/dark theme via CSS custom properties
│       ├── markdown/         markdown-it renderer (highlight.js, task lists, KaTeX)
│       ├── jupyterNotebook/  notebookjs renderer with Prism highlighting
│       ├── notifier/         Desktop notifications (config-gated)
│       ├── menu/             Application menu template (mainMenu.js)
│       ├── octodex/          Login-page octocat images
│       └── vendor/           Bootstrap/highlight.js/Prism assets
├── build/               electron-builder/packaging assets (app icons, TouchBar icons) — not deep-mapped
├── docs/                Static GitHub Pages landing site (index.html, css/, js/, img/, vendor/)
├── .github/
│   └── ISSUE_TEMPLATE.md  Issue template (workflows/ci.yml added by the toolchain PR)
└── .obvious/            Maintenance-wave orientation docs (this directory)
```

Notes:

- `app/utilities/parser` and `app/utilities/search` are the pure-logic surfaces covered by the Jest behavior tests (post-U2: `app/utilities/**/__tests__/`).
- The webpack build emits `bundle/app.bundle.js`; the root `index.html` references it at `/bundle/` (`webpack.config.js` `output.publicPath`).

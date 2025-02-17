> **To Lepton users around the world in more than 130 countries**: We hope you all stay **safe, healthy, and strong** as we get through the COVID-19 pandemic. Lepton will continue to be free, as always. If you find this app helpful, we encourage you to make a donation to a local or global charity of your choice to help fight against the pandemic. Together, we can make the world a better place. ❤️
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-23-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

![](./docs/img/new_logo.png)

[![Build Status](https://travis-ci.org/hackjutsu/Lepton.svg?branch=master)](https://travis-ci.org/hackjutsu/Lepton)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
[![Dependency Status](https://david-dm.org/hackjutsu/Lepton.svg?style=flat-square)](https://david-dm.org/hackjutsu/Lepton)
[![MIT Licensed](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](https://opensource.org/licenses/MIT)

**Lepton** is a lean code snippet manager based on *GitHub Gist*. [Check out its latest release.](https://github.com/hackjutsu/Lepton/releases)

- Unlimited public/private snippets
- Unlimited tags
- Language groups
- Markdown/JupyterNotebook support
- GitHub Enterprise support
- Immersive mode
- Customizable
- Light/Dark theme
- macOS/Win/Linux
- Dashboard
- Search
- Proxy
- Free

![Screenshot](./docs/img/portfolio/stay_organized.png)

| [Light Theme](https://github.com/hackjutsu/Lepton#customization)     | [Dark Theme](https://github.com/hackjutsu/Lepton#customization)    |
| :-------------:| :-----:|
|![Screenshot](./docs/img/portfolio/lepton-light.png)|![Screenshot](./docs/img/portfolio/lepton-dark.png)|

|      Organize         |  Markdown | Jupyter Notebook |
| :-------------:| :-----:| :-----: |
| ![Screenshot](./docs/img/portfolio/stay_organized.png) | ![Screenshot](./docs/img/portfolio/markdown.png) | ![Screenshot](./docs/img/portfolio/jupyterNotebook.png)

|      Search (*⇧ + Space*)         |    Immersive Mode *(⌘/Ctrl + i)*    | Dashboard *(⌘/Ctrl + d)* |
| :-------------:| :-----:| :-----: |
| ![Screenshot](./docs/img/portfolio/search_bar.png) | ![Screenshot](./docs/img/portfolio/immersive.png) | ![Screenshot](./docs/img/portfolio/dashboard.png)


## Shortcuts
| Function       | Shortcut       |  Note     |
| :------------: |:-------------: |:-----:|
| New Snippet    | `Cmd/Ctrl + N` | Create a snippet      |
| Edit Snippet   | `Cmd/Ctrl + E` | Edit a snippet      |
| Delete Snippet   | `Cmd/Ctrl + Del` | Delete selected snippet      |
| Submit         | `Cmd/Ctrl + S` | Submit the changes from the editor      |
| Cancel         | `Cmd/Ctrl + ESC` | Exit the editor without saving   |
| Sync           | `Cmd/Ctrl + R` | Sync with remote Gist server   |
| Immersive Mode | `Cmd/Ctrl + I` |  Toggle the [Immersive mode](https://github.com/hackjutsu/Lepton/blob/master/docs/img/portfolio/immersive.png)    |
| Dashboard      | `Cmd/Ctrl + D` |  Toggle the [dashboard](https://github.com/hackjutsu/Lepton/blob/master/docs/img/portfolio/dashboard.png)     |
| About Page     | `Cmd/Ctrl + ,` |  Toggle the [About page](https://github.com/hackjutsu/Lepton/blob/dev/docs/img/portfolio/about.png)    |
| Search         | `Shift + Space`|  Toggle the [search bar](https://github.com/hackjutsu/Lepton/blob/master/docs/img/portfolio/search_bar.png)    |

## Customization
Lepton's can be customized by `<home_dir>/.leptonrc`! You can find its exact path in the About page by `Command/Ctrl + ,`. Create the file if it does not exist.

- Theme (light/dark)
- Snippet
- Editor
- Logger
- Proxy
- Shortcuts
- Enterprise
- Notifications

Check out the [configuration docs](https://github.com/hackjutsu/Lepton/wiki/Configuration) to explore different customization options.

## Tech Stack
![Based on](./docs/img/erb-logo.png)

1. Framework: [Electron](http://electron.atom.io/)
2. Bundler: [Webpack](http://webpack.github.io/docs/), [Babel](https://babeljs.io), [electron-builder](https://github.com/electron-userland/electron-builder)
3. Language: [ES6](https://babeljs.io/docs/learn-es2015/), [Sass](http://sass-lang.com/)
4. Library: [React](https://facebook.github.io/react/), [Redux](https://github.com/reactjs/redux), [Redux Thunk](https://github.com/gaearon/redux-thunk), [Redux Form](http://redux-form.com/)
5. Lint: [ESLint](http://eslint.org/)

## Installation
- Download released binaries(macOS/Windows/Linux) [here](https://github.com/hackjutsu/Lepton/releases).
- Install via Homebrew (macOS)
```bash
brew cask install lepton
```
- Install via SnapCraft (Linux)

[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-white.svg)](https://snapcraft.io/lepton)

## Development


### Install dependencies

```bash
$ git clone https://github.com/hackjutsu/Lepton.git
$ cd Lepton && yarn install
```

### Client ID/Secret
[Register your application](https://github.com/settings/applications/new), duplicate the `./configs/accountDummy.js` into a `./configs/account.js` file and place your client id and client secret from the GitHub account registration in `./configs/account.js`.
```js
module.exports = {
  client_id: <your_client_id>,
  client_secret: <your_client_secret>
}
```

### Run
```bash
$ yarn build && yarn start
```

## Build Installer App
>Read [electron-builder docs](https://github.com/electron-userland/electron-builder#readme) and check out the [code signing wiki](https://github.com/electron-userland/electron-builder#code-signing) before building the installer app.

Build apps for macOS.
```bash
$ yarn dist -- -m
```
Build apps for Windows.
```bash
$ yarn dist -- -w
```
Build apps for Linux. 

>Need a running [Docker](https://www.docker.com/) daemon to build a `snap` package.
```bash
$ yarn dist -- -l
```
Build apps for macOS, Windows and Linux.
```bash
$ yarn dist -- -wml
```
Build apps for the current OS with the current arch.
```bash
$ yarn dist
```

## FAQ
[--> Wiki FAQ](https://github.com/hackjutsu/Lepton/wiki/FAQ)

## Contributors
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://airbnb.io/"><img src="https://avatars3.githubusercontent.com/u/7756581?v=4" width="100px;" alt=""/><br /><sub><b>CosmoX</b></sub></a><br /><a href="https://github.com/hackjutsu/Lepton/commits?author=hackjutsu" title="Code">💻</a> <a href="#design-hackjutsu" title="Design">🎨</a> <a href="https://github.com/hackjutsu/Lepton/commits?author=hackjutsu" title="Tests">⚠️</a> <a href="#maintenance-hackjutsu" title="Maintenance">🚧</a> <a href="#platform-hackjutsu" title="Packaging/porting to new platform">📦</a> <a href="#ideas-hackjutsu" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://loveac.cn"><img src="https://avatars1.githubusercontent.com/u/5550402?v=4" width="100px;" alt=""/><br /><sub><b>Jiaye Wu</b></sub></a><br /><a href="https://github.com/hackjutsu/Lepton/commits?author=wujysh" title="Code">💻</a> <a href="#maintenance-wujysh" title="Maintenance">🚧</a> <a href="#ideas-wujysh" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/DNLHC"><img src="https://avatars1.githubusercontent.com/u/14959483?v=4" width="100px;" alt=""/><br /><sub><b>Danila</b></sub></a><br /><a href="https://github.com/hackjutsu/Lepton/commits?author=DNLHC" title="Code">💻</a> <a href="#design-DNLHC" title="Design">🎨</a> <a href="#maintenance-DNLHC" title="Maintenance">🚧</a></td>
    <td align="center"><a href="http://www.meilinzhan.com/"><img src="https://avatars2.githubusercontent.com/u/13786673?v=4" width="100px;" alt=""/><br /><sub><b>Meilin Zhan</b></sub></a><br /><a href="https://github.com/hackjutsu/Lepton/commits?author=meilinz" title="Code">💻</a> <a href="#ideas-meilinz" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-meilinz" title="Maintenance">🚧</a></td>
    <td align="center"><a href="http://www.linkedin.com/in/liuchenguang"><img src="https://avatars1.githubusercontent.com/u/5697293?v=4" width="100px;" alt=""/><br /><sub><b>lcgforever</b></sub></a><br /><a href="https://github.com/hackjutsu/Lepton/commits?author=lcgforever" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/passerbyid"><img src="https://avatars1.githubusercontent.com/u/2075566?v=4" width="100px;" alt=""/><br /><sub><b>Yuer Lee</b></sub></a><br /><a href="https://github.com/hackjutsu/Lepton/commits?author=passerbyid" title="Documentation">📖</a> <a href="#platform-passerbyid" title="Packaging/porting to new platform">📦</a></td>
    <td align="center"><a href="http://yysu.github.io/About-me"><img src="https://avatars3.githubusercontent.com/u/12994810?v=4" width="100px;" alt=""/><br /><sub><b>Su,Yen-Yun</b></sub></a><br /><a href="https://github.com/hackjutsu/Lepton/commits?author=YYSU" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://cixuuz.github.io/"><img src="https://avatars3.githubusercontent.com/u/26782336?v=4" width="100px;" alt=""/><br /><sub><b>Chen Tong</b></sub></a><br /><a href="https://github.com/hackjutsu/Lepton/commits?author=cixuuz" title="Code">💻</a> <a href="#ideas-cixuuz" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-cixuuz" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/Gisonrg"><img src="https://avatars0.githubusercontent.com/u/4332224?v=4" width="100px;" alt=""/><br /><sub><b>Jason Jiang</b></sub></a><br /><a href="https://github.com/hackjutsu/Lepton/commits?author=Gisonrg" title="Code">💻</a></td>
    <td align="center"><a href="http://popey.com/"><img src="https://avatars0.githubusercontent.com/u/1841272?v=4" width="100px;" alt=""/><br /><sub><b>Alan Pope</b></sub></a><br /><a href="#platform-popey" title="Packaging/porting to new platform">📦</a></td>
    <td align="center"><a href="https://tonyxu.io"><img src="https://avatars3.githubusercontent.com/u/6280136?v=4" width="100px;" alt=""/><br /><sub><b>Tony Xu</b></sub></a><br /><a href="#platform-tonyxu-io" title="Packaging/porting to new platform">📦</a></td>
    <td align="center"><a href="https://tegan.lol"><img src="https://avatars0.githubusercontent.com/u/13814048?v=4" width="100px;" alt=""/><br /><sub><b>Tegan Churchill</b></sub></a><br /><a href="https://github.com/hackjutsu/Lepton/commits?author=rawrmonstar" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/AngieW0908"><img src="https://avatars3.githubusercontent.com/u/26016229?v=4" width="100px;" alt=""/><br /><sub><b>Angie Wang</b></sub></a><br /><a href="#design-AngieW0908" title="Design">🎨</a></td>
    <td align="center"><a href="http://batuhanbayrakci.com"><img src="https://avatars0.githubusercontent.com/u/965804?v=4" width="100px;" alt=""/><br /><sub><b>Batuhan Bayrakci</b></sub></a><br /><a href="https://github.com/hackjutsu/Lepton/commits?author=baybatu" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://samuelmeuli.com"><img src="https://avatars0.githubusercontent.com/u/22477950?v=4" width="100px;" alt=""/><br /><sub><b>Samuel Meuli</b></sub></a><br /><a href="https://github.com/hackjutsu/Lepton/commits?author=samuelmeuli" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/alexandreamadocastro"><img src="https://avatars2.githubusercontent.com/u/5918765?v=4" width="100px;" alt=""/><br /><sub><b>Alexandre Amado de Castro</b></sub></a><br /><a href="https://github.com/hackjutsu/Lepton/commits?author=alexandreamadocastro" title="Code">💻</a></td>
    <td align="center"><a href="http://abner.space/"><img src="https://avatars2.githubusercontent.com/u/1998649?v=4" width="100px;" alt=""/><br /><sub><b>Abner Soares Alves Junior</b></sub></a><br /><a href="https://github.com/hackjutsu/Lepton/commits?author=abnersajr" title="Code">💻</a></td>
    <td align="center"><a href="http://seanz.me"><img src="https://avatars0.githubusercontent.com/u/5442563?v=4" width="100px;" alt=""/><br /><sub><b>Sean</b></sub></a><br /><a href="https://github.com/hackjutsu/Lepton/commits?author=seancheung" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/moia-sven-ole"><img src="https://avatars0.githubusercontent.com/u/32508538?v=4" width="100px;" alt=""/><br /><sub><b>Ole</b></sub></a><br /><a href="https://github.com/hackjutsu/Lepton/commits?author=moia-sven-ole" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/GabrielNicolasAvellaneda/"><img src="https://avatars3.githubusercontent.com/u/1248101?v=4" width="100px;" alt=""/><br /><sub><b>Gabriel Nicolas Avellaneda</b></sub></a><br /><a href="https://github.com/hackjutsu/Lepton/commits?author=GabrielNicolasAvellaneda" title="Code">💻</a> <a href="https://github.com/hackjutsu/Lepton/commits?author=GabrielNicolasAvellaneda" title="Documentation">📖</a></td>
    <td align="center"><a href="https://dideler.github.io"><img src="https://avatars2.githubusercontent.com/u/497458?v=4" width="100px;" alt=""/><br /><sub><b>Dennis Ideler</b></sub></a><br /><a href="https://github.com/hackjutsu/Lepton/commits?author=dideler" title="Code">💻</a> <a href="#ideas-dideler" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/hackjutsu/Lepton/commits?author=dideler" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://AnthonyAttard.com"><img src="https://avatars0.githubusercontent.com/u/8838135?v=4" width="100px;" alt=""/><br /><sub><b>Anthony Attard</b></sub></a><br /><a href="https://github.com/hackjutsu/Lepton/commits?author=anthonyattard" title="Code">💻</a></td>
    <td align="center"><a href="https://ArLEquiN64.github.io/"><img src="https://avatars1.githubusercontent.com/u/7821318?v=4" width="100px;" alt=""/><br /><sub><b>ArLE</b></sub></a><br /><a href="https://github.com/hackjutsu/Lepton/commits?author=ArLEquiN64" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License
MIT © [hackjutsu](https://github.com/hackjutsu)

<img src="https://github.com/AlexeyArno/Day-Routine/blob/master/final/res/images/routinelogo@small.png?raw=true" align="right"/>

# [Day-Routine](https://github.com/AlexeyArno/Day-Routine)

![](https://img.shields.io/badge/price-free-%235F2FE1.svg)
![](https://img.shields.io/badge/version-1.0.0-green.svg)
[![CircleCI](https://circleci.com/gh/AlexeyArno/Day-Routine/tree/master.svg?style=shield)](https://circleci.com/gh/AlexeyArno/Day-Routine/tree/master)

> Desktop application is planning routine tasks 

Application build day's plan according to your free time and needs

## Capabilities
- Create tasks (Routines)
- Create free time (Dead Zones) 
- Auto produce day's plan
- Auto open links/files when task will have began
- Support electron notifications and tray

<img src="https://i.imgur.com/WXHdX2T.png"/>

## Built With
* [Typescript](http://www.typescriptlang.org/)
* [Vue](https://vuejs.org/) 
* [Electron](https://electronjs.org/)
* [SASS](https://sass-lang.com/)
* [JEST](https://jestjs.io/)
* [Webpack](https://github.com/webpack)


## Installation and Run

Day-Routine requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/AlexeyArno/Day-Routine
cd Day-Routine
yarn
electron .
```
For automatic open devTools and hot-realod change variable `prodEnv` in `main.js` file.

For auto rebuild source files by [Webpack](https://github.com/webpack) execute `watch.dev.sh` 

## Build 

Build available by [electron-builder](https://github.com/electron-userland/electron-builder)

You can execute `build.sh` to build for current 

```
./build.sh
```
or for certain [arch](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#arch) and [platform](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#platform)
```
./build.sh -p win32 -a x64
```
Result will appear in `dist` folder

> If you want change some build params for [electron-builder](https://github.com/electron-userland/electron-builder), change them in [final/package.json](https://github.com/AlexeyArno/Day-Routine/blob/master/final/package.json)

## Screens
<img src="https://i.imgur.com/dueRhix.png"/>
<img src="https://i.imgur.com/CRe9CMR.png"/>
<img src="https://i.imgur.com/IwqQGww.png"/>
<img src="https://i.imgur.com/NXpTsEi.png"/>
<img src="https://i.imgur.com/uzkimBz.png"/>
<img src="https://i.imgur.com/UHJNl36.png"/>

License
----
MIT

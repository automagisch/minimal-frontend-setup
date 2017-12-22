# Minimal frontend setup

## Features:
- node in ES6 (with babel-cli), with ability to transpile to production-safe js.
- supports scss (libsass)
- supports client es6 (babel & browserify)
- bare minimum clean setup

## Getting started
1. Download the package and run `npm install` in the roo
2. After installing, run `npm start` to start the development branch
3. To build for production Nodejs run `npm run build`. That will output
   babelified javascript to `build/`.
4. To serve for production, run: `npm run prod`. It will first transpile the
   source code, and then run the output `build/index.js`.

## What's happening where
| Feature | Location | Process |
| ------- |--------- | ------- |
| ES6 Node | `/src` | `/index.js` |
| Express config | `/src/app.js` | `/src/lib/Server.js` |
| Client ES6 | `/frontend/scripts` | `/src/lib/FrontendScripts.js` |
| Sass | `/frontend/styles` | `/src/lib/FrontendStyles.js` |
| HTML | `/templates` | - |

| File | Function |
| ---- | -------- |
| `.babelrc` | node-babel configuration |
| `nodemon.json` | nodemon (auto-reload utility) configuration |
| `package.json` | package instructions |

| Folder | Contains |
| ------ | -------- |
| `/build` | Built source code from `/src` (build with `npm run build`) |
| `/frontend` | Client asset sources |
| `/frontend/scripts` | Source babel code |
| `/frontend/styles` | Source sass code |
| `/node_modules` | Module package folder |
| `/src` | Node source code (babel) |
| `/static` | Compiled files from `/frontend` and other frontend assets (like fonts, images etc.) |
| `/templates` | Contains the templates served by express (in `src/routes.js`) |

## Why dis
Mainly because setting this up every time for a new project is a pain-in-the-ass
for me, and takes a lot of time which you can't lose sometimes. This packages enables
all of this, only 1 `npm install` away!

## Plans
To eventually over-simplify generating this boilerplate with a cli generator.

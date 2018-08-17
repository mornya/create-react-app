# mornya-react-scripts

> This package includes scripts and configuration used by [Create React App](https://github.com/facebookincubator/create-react-app).<br>
> Please refer to its documentation:
> * [Getting Started](https://github.com/facebookincubator/create-react-app/blob/master/README.md#getting-started) – How to create a new app.
> * [User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React App.

## Setup

##### Generate "test" React App
```bash
npm install -g create-react-app
create-react-app test --scripts-version mornya-react-scripts
```
##### Serve with hot reload at localhost:8080
```bash
npm start
```
##### Run all tests
```bash
npm test
```
##### Build for production with minification
```bash
npm run build
```
##### Build for production and view the bundle analyzer report
```bash
npm run build --report
```
##### Build bundle only for publishing production with minification
```bash
npm run bundle
npm publish build
```
##### Transpile to ES5 sources in src/* to output-directory (default <output-directory> is "build" when blank).
```bash
npm run transpile <output-directory>
npm run transpile
npm run transpile dist
```
##### Clear production build directory
```bash
npm run clean
```
##### Run Lint
```bash
npm run lint
```
##### Flow Type Check
```bash
npm run flow
```
##### Start Flow Type server
```bash
npm run flow:start
```
##### Stop Flow Type server
```bash
npm run flow:stop
```
##### Eject all CRA configuration
* Removes this tool and copies build dependencies, configuration files
and scripts into the app directory. If you do this, you can’t go back!
```bash
npm run eject
```

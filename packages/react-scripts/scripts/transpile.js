// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end
'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const babel = require('babel-core');
const paths = require('../config/paths');
const getDirectoryFiles = require('./utils/directoryFiles');

const argv = process.argv.slice(2);
const targetDir = argv[0] ? path.resolve(argv[0]) : paths.appBuild;
const jsExtNames = ['.js', '.jsx', '.mjs'];
const sourceFiles = [];
let succeed = 0;

async function transform(file, src, dest, callback = {}) {
  const filename = path.join(src, file);
  const content = await fs.readFile(filename);
  const destpath = path.join(dest, file);
  const { code } = babel.transform(content.toString(), {
    extends: path.resolve('.babelrc'),
    filename,
    comments: false,
    minified: process.env.NODE_ENV === 'production',
  });
  return fs.outputFile(destpath, code).then(() => callback(file));
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
  });
}

// Get source files in directory
getDirectoryFiles(paths.appSrc, (isDir, relPath, currDir, file = '') => {
  if (!isDir) {
    const extName = file.substr(file.lastIndexOf('.'));
    if (jsExtNames.indexOf(extName)) {
      sourceFiles.push(relPath);
    }
  }
});

// Remove all content but keep the directory so that
// if you're in it, you don't end up in Trash
fs.emptyDirSync(targetDir);
// Merge with the public folder
copyPublicFolder();
// Start transpiling sources
console.log(`Transpiling in ${process.env.BABEL_ENV} mode...`);
Promise.all(
  sourceFiles.map(file =>
    transform(file, paths.appSrc, targetDir, () => succeed++)
  )
).then(() => {
  console.log(chalk.green(`${succeed} files successfully transpiled.\n`));
});

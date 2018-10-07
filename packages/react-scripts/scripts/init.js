// @remove-file-on-eject
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const spawn = require('react-dev-utils/crossSpawn');

module.exports = function(
  appPath,
  appName,
  verbose,
  originalDirectory,
  template
) {
  const ownPackageName = require(path.join(__dirname, '..', 'package.json'))
    .name;
  const ownPath = path.join(appPath, 'node_modules', ownPackageName);
  const appPackage = require(path.join(appPath, 'package.json'));
  const useYarn = fs.existsSync(path.join(appPath, 'yarn.lock'));

  // Copy over some of the devDependencies
  appPackage.dependencies = appPackage.dependencies || {};

  // Setup the script rules
  appPackage.scripts = {
    start: 'react-scripts start',
    build: 'react-scripts build',
    bundle: 'react-scripts bundle',
    transpile: 'react-scripts transpile src out',
    lint:
      'eslint src --cache --ignore-pattern .gitignore --ext js,jsx,mjs --max-warnings 100',
    test: 'react-scripts test --env=jsdom',
    eject: 'react-scripts eject',
    flow: 'node_modules/.bin/flow check',
    'flow:start': 'node_modules/.bin/flow',
    'flow:stop': 'node_modules/.bin/flow stop',
  };

  // Setup values to make bundle (added by mornya)
  appPackage.private = true; // not publish original bundle project if bundling
  appPackage.license = 'MIT';

  fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackage, null, 2)
  );

  const readmeExists = fs.existsSync(path.join(appPath, 'README.md'));
  if (readmeExists) {
    fs.renameSync(
      path.join(appPath, 'README.md'),
      path.join(appPath, 'README.old.md')
    );
  }

  // Copy the files for the user
  const templatePath = template
    ? path.resolve(originalDirectory, template)
    : path.join(ownPath, 'template');
  if (fs.existsSync(templatePath)) {
    fs.copySync(templatePath, appPath);
  } else {
    console.error(
      `Could not locate supplied template: ${chalk.green(templatePath)}`
    );
    return;
  }

  // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
  // See: https://github.com/npm/npm/issues/1862
  [
    { from: 'babelrc', to: '.babelrc' },
    { from: 'editorconfig', to: '.editorconfig' },
    { from: 'eslintignore', to: '.eslintignore' },
    { from: 'eslintrc', to: '.eslintrc' },
    { from: 'flowconfig', to: '.flowconfig' },
    { from: 'gitignore', to: '.gitignore' },
    { from: 'scsslint.yml', to: '.scsslint.yml' },
  ].forEach(item => {
    fs.move(
      path.join(appPath, item.from),
      path.join(appPath, item.to),
      [],
      err => {
        if (err) {
          // Append if there's already file there
          if (err.code === 'EEXIST') {
            const data = fs.readFileSync(path.join(appPath, item.from));
            fs.appendFileSync(path.join(appPath, item.to), data);
            fs.unlinkSync(path.join(appPath, item.from));
          } else {
            throw err;
          }
        }
      }
    );
  });

  let command;
  let args, argsDev, argsPeer, argsOpt;

  if (useYarn) {
    command = 'yarnpkg';
    args = ['add', verbose && '--verbose'].filter(e => e);
    argsDev = [...args, '-D'];
    argsPeer = [...args, '-P'];
    argsOpt = [...args, '-O'];
  } else {
    command = 'npm';
    args = ['install', verbose && '--verbose'].filter(e => e);
    argsDev = [...args, '--save-dev'];
    argsPeer = [...args, '--save-prod']; // not supported (npm v6.4.1)
    argsOpt = [...args, '--save-optional'];
    args.push('--save');
  }
  args.push('react', 'react-dom', 'prop-types');

  // Install additional template dependencies, if present
  const templateDependenciesPath = path.join(
    appPath,
    '.template.dependencies.json'
  );
  if (fs.existsSync(templateDependenciesPath)) {
    const templateDependencies = require(templateDependenciesPath);
    const prodDependencies = Object.entries(
      templateDependencies.dependencies || {}
    );
    const devDependencies = Object.entries(
      templateDependencies.devDependencies || {}
    );
    const peerDependencies = Object.entries(
      templateDependencies.peerDependencies || {}
    );
    const optDependencies = Object.entries(
      templateDependencies.optionalDependencies || {}
    );

    prodDependencies.length &&
      prodDependencies.forEach(([k, v]) => args.push(`${k}@${v}`));
    devDependencies.length &&
      devDependencies.forEach(([k, v]) => argsDev.push(`${k}@${v}`));
    peerDependencies.length &&
      peerDependencies.forEach(([k, v]) => argsPeer.push(`${k}@${v}`));
    optDependencies.length &&
      optDependencies.forEach(([k, v]) => argsOpt.push(`${k}@${v}`));

    fs.unlinkSync(templateDependenciesPath);

    // Install react and react-dom for backward compatibility with old CRA cli
    // which doesn't install react and react-dom along with react-scripts
    // or template is presetend (via --internal-testing-template)
    // if (!isReactInstalled(appPackage) || template) {
    console.log();
    console.log(`Installing dependencies using ${command}...`);

    if (prodDependencies.length) {
      // install PROD-dependencies from template dependencies
      console.log();
      console.log(
        chalk.green(`⚑ ${prodDependencies.length} production dependencies...`)
      );
      const proc = spawn.sync(command, args, { stdio: 'inherit' });
      if (proc.status !== 0) {
        console.error(`\`${command} ${args.join(' ')}\` failed`);
        return;
      }
    }
    if (devDependencies.length) {
      // install DEV-dependencies from template dependencies
      console.log();
      console.log(
        chalk.green(`⚑ ${devDependencies.length} development dependencies...`)
      );
      const proc = spawn.sync(command, argsDev, { stdio: 'inherit' });
      if (proc.status !== 0) {
        console.error(`\`${command} ${argsDev.join(' ')}\` failed`);
        return;
      }
    }
    if (peerDependencies.length) {
      // install PEER-dependencies from template dependencies
      console.log();
      console.log(
        chalk.green(`⚑ ${peerDependencies.length} peer dependencies...`)
      );
      const proc = spawn.sync(command, argsPeer, { stdio: 'inherit' });
      if (proc.status !== 0) {
        console.error(`\`${command} ${argsPeer.join(' ')}\` failed`);
        return;
      }
    }
    if (optDependencies.length) {
      // install OPTIONAL-dependencies from template dependencies
      console.log();
      console.log(
        chalk.green(`⚑ ${optDependencies.length} optional dependencies...`)
      );
      const proc = spawn.sync(command, argsOpt, { stdio: 'inherit' });
      if (proc.status !== 0) {
        console.error(`\`${command} ${argsOpt.join(' ')}\` failed`);
        return;
      }
    }
    // }
  }

  // Display the most elegant way to cd.
  // This needs to handle an undefined originalDirectory for
  // backward compatibility with old global-cli's.
  let cdpath;
  if (originalDirectory && path.join(originalDirectory, appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  }

  // Change displayed command to yarn instead of yarnpkg
  const displayedCommand = useYarn ? 'yarn' : 'npm';

  console.log();
  console.log(`Success! Created ${appName} at ${appPath}`);
  console.log('Inside that directory, you can run several commands:');
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} start`));
  console.log('    Starts the development server.');
  console.log();
  console.log(
    chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}build`)
  );
  console.log('    Bundles the app into static files for production.');
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} test`));
  console.log('    Starts the test runner.');
  console.log();
  console.log(
    chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}eject`)
  );
  console.log(
    '    Removes this tool and copies build dependencies, configuration files'
  );
  console.log(
    '    and scripts into the app directory. If you do this, you can’t go back!'
  );
  console.log();
  console.log('We suggest that you begin by typing:');
  console.log();
  console.log(chalk.cyan('  cd'), cdpath);
  console.log(`  ${chalk.cyan(`${displayedCommand} start`)}`);
  if (readmeExists) {
    console.log();
    console.log(
      chalk.yellow(
        'You had a `README.md` file, we renamed it to `README.old.md`'
      )
    );
  }
  console.log();
  console.log('Happy hacking!');
};

function isReactInstalled(appPackage) {
  const dependencies = appPackage.dependencies || {};

  return (
    typeof dependencies.react !== 'undefined' &&
    typeof dependencies['react-dom'] !== 'undefined'
  );
}

'use strict';

const fs = require('fs');

const fromJSON = function(filepath) {
  return JSON.parse(fs.readFileSync(filepath, 'utf8'));
};

module.exports = fromJSON;

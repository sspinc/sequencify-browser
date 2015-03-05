/*jshint node:true */

'use strict';

/**
 * Module dependencies.
 */

var indexOf = require('lodash-compat/array/indexOf');
var forEach = require('lodash-compat/collection/forEach');

/**
 * Sequencify tasks
 */
var sequence = function (tasks, names, results, missing, recursive, nest) {
  forEach(names, function (name) {
    if (indexOf(results, name) !== -1) {
      return; // de-dup results
    }
    var node = tasks[name];
    if (!node) {
      missing.push(name);
    } else if (indexOf(nest, name) > -1) {
      nest.push(name);
      recursive.push(nest.slice(0));
      nest.pop(name);
    } else if (node.dep.length) {
      nest.push(name);
      sequence(tasks, node.dep, results, missing, recursive, nest); // recurse
      nest.pop(name);
    }
    results.push(name);
  });
};

/**
 * Return sequencified task arrays
 *
 * @param {Array} tasks
 * @param {Array} names
 *
 * @return {Object}
 * @api public
 */
module.exports = function (tasks, names) {
  var results = []; // the final sequence
  var missing = []; // missing tasks
  var recursive = []; // recursive task dependencies

  sequence(tasks, names, results, missing, recursive, []);

  if (missing.length || recursive.length) {
    results = []; // results are incomplete at best, completely wrong at worst, remove them to avoid confusion
  }

  return {
    sequence: results,
    missingTasks: missing,
    recursiveDependencies: recursive
  };
};

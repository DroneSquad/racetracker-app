'use strict';

/**
 * Adds mark check symbol
 */
function addCheckMark(callback) {
  process.stdout.write(' ✓');
  if (callback) callback();
}

module.exports = addCheckMark;

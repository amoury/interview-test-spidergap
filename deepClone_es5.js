/**
 * Using ES5
 * Returns an independent copy/clone of an object
 * @param {Object} obj - Object to be cloned
 * @returns {Object}
 */

function oldDeepClone(obj) {
  'use strict';
  return Object.assign({}, obj);
}
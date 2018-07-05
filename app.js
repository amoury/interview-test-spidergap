
/**
 * Using ES6
 * Returns an independent copy/clone of an object
 * @param {Object} obj - Object to be cloned
 * @returns {Object}
 */
const deepClone = ( obj => Object.assign( {}, obj ));


/**
 * Using ES5
 */
function deepClone(obj) {
  'use strict';
  return Object.assign( {}, obj );
}



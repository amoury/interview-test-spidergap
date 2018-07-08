/* 
Question 1:
Write a function called deepClone which takes an object and creates a copy of it. e.g. {name: "Paddy", address: {town: "Lerum", country: "Sweden"}} -> {name: "Paddy", address: {town: "Lerum", country: "Sweden"}}
*/



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
function oldDeepClone(obj) {
  'use strict';
  return Object.assign( {}, obj );
}
  


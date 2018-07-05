
var partners = require('./partners.json');

const CENTRAL_LONDON_LAT = convertDegToRad(51.515419);
const CENTRAL_LONDON_LNG = convertDegToRad(-0.141099);
const RADIUS_OF_EARTH = 6371;

// Initializing an empty Array to form the list of Partners with offices with 100 KM
var invitationList = [];

// Loop over all the partners in the list
for(partner of partners) {
  for(location of partner.offices) {
    var newArr = location.coordinates.split(',').map( degrees => {
      return degrees * Math.PI / 180;
    });
    
    var distance = getDistance(newArr[0], newArr[1]);

    if (distance <= 100) {
      invitationList.push({ organization: partner.organization, location: location.coordinates });
    }   
  }
}


console.log(getCleanList(invitationList));



/**
 * Returns the clean list of partners, sorted by company name of partners and eliminates any duplicates
 * @param arr - Array of objects
 * @returns {Array}
 */
function getCleanList( arr ) {
  return removeDuplicates( getSortedList( arr ), 'organization');
}

/**
 * Sort the list of partners by company name in ascending
 * @param arr - Array of objects
 * @returns {Array}
 */
function getSortedList( arr ) {
  return arr.sort((first, second) => {
    if (first.organization < second.organization) return -1;
    if (first.organization > second.organization) return 1;
    return 0;
  });
}


/**
 * Calculate distance between two locations using latitude and longitude of partner companies
 * @param {number} lat - Latitude in Radian
 * @param {number} lng - Longitude in Radian
 * @returns {number}
 */
function getDistance(lat, lng) {
  var centralAngle = getCentralAngle(lat, lng); 
  return RADIUS_OF_EARTH * centralAngle;
}

/**
 * Calculate central Angle using latitude and longitude of partner companies
 * @param {number} lat - Latitude in Radian
 * @param {number} lng - Longitude in Radian
 * @returns {number}
 */
function getCentralAngle(lat, lng) {
  return Math.acos(
    (Math.sin(CENTRAL_LONDON_LAT) * Math.sin(newArr[0])) +
    (Math.cos(CENTRAL_LONDON_LAT) * Math.cos(newArr[0]) * Math.cos(CENTRAL_LONDON_LNG - newArr[1]))
  )
}

/**
 * Remove duplicates from an array of objects in javascript
 * @param arr - Array of objects
 * @param prop - Property of each object to compare
 * @returns {Array}
 */
function removeDuplicates(arr, prop) {
  var obj = {};
  for (var i = 0, len = arr.length; i < len; i++) {
    if (!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i];
  }
  var newArr = [];
  for (var key in obj) newArr.push(obj[key]);
  return newArr;
}


/**
 * Converts degrees to radians
 * @param deg - Coordinate in deg
 * @returns {number}
 */
function convertDegToRad(deg) {
  return deg * (Math.PI / 180 );
}
/* 
Question 2:

We'd like to contact partners with offices within 100km of central London (coordinates 51.515419, -0.141099) to invite them out for a meal.
Write a NodeJS/JavaScript program that reads our list of partners (download partners.json here) and outputs the company names and addresses of matching partners (with offices within 100km) sorted by company name (ascending).
You can use the first formula from this Wikipedia article to calculate distance. Don't forget to convert degrees to radians! Your program should be fully tested too.

*/




const fs = require('fs');

const CENTRAL_LONDON_LAT = convertDegToRad(51.515419);
const CENTRAL_LONDON_LNG = convertDegToRad(-0.141099);
const RADIUS_OF_EARTH = 6371;


var invitationList = [], // Initializing an empty Array to form the list of Partners with offices with 100 KM
    partners,
    distance;


fs.readFile('partners.json', (err, data) => {
  if (err) throw err;
  
  // Convert JSON string to Javascript Object
  partners = JSON.parse(data);
  
  // Loop over all the partners in the list
  for (partner of partners) {
    for (location of partner.offices) {
      var newArr = location.coordinates.split(',');
      
      distance = getDistance(convertDegToRad(newArr[0]), convertDegToRad(newArr[1]));
      // Check if the distance is less than 100KM, then add it to the invitation list
      if (distance <= 100) {
        invitationList.push({ organization: partner.organization, location: location.address });
      }
    }
  }

  // Clean the list to sort and eliminate any duplicates then stringify it to convert to json format. 
  var data = JSON.stringify(getCleanList(invitationList), null, 2);

  fs.writeFile('invitationList.json', data, err => {
    if (err) throw err;
  });
});









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
function getDistance( lat, lng ) {
  var centralAngle = getCentralAngle( lat, lng ); 
  return RADIUS_OF_EARTH * centralAngle;
}

/**
 * Calculate central Angle using latitude and longitude of partner companies
 * @param {number} lat - Latitude in Radian
 * @param {number} lng - Longitude in Radian
 * @returns {number}
 */
function getCentralAngle( lat, lng ) {
  return Math.acos(
    (Math.sin(CENTRAL_LONDON_LAT) * Math.sin(lat)) +
    (Math.cos(CENTRAL_LONDON_LAT) * Math.cos(lat) * Math.cos(CENTRAL_LONDON_LNG - lng))
  )
}

/**
 * Remove duplicates from an array of objects in javascript
 * @param arr - Array of objects
 * @param prop - Property of each object to compare
 * @returns {Array}
 */
function removeDuplicates( arr, prop ) {
  var newObj = {};
  for (var i = 0, length = arr.length; i < length; i++) {
    if (!newObj[arr[i][prop]]) newObj[arr[i][prop]] = arr[i];
  }
  var newArr = [];
  for (var key in newObj) newArr.push(newObj[key]);
  return newArr;
}


/**
 * Converts degrees to radians
 * @param deg - Coordinate in degree
 * @returns {number}
 */
function convertDegToRad( deg ) {
  return parseFloat((deg * (Math.PI / 180 )).toFixed(10));
}

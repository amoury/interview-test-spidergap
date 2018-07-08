const functions = require('./app');

test('Converts Degrees to Radians', () => {
  expect(functions.convertDegToRad(90)).toBe(1.5707963268);
});
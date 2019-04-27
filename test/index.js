const assert = require('assert').strict;
const convert = require('../src');

assert.equal(convert('physical8', 'bcm'), 14);
assert.equal(convert('physical8', 'gpio'), 14);
assert.equal(convert('physical8', 'wiringPi'), 15);

assert.throws(() => convert('physical30', 'bcm'));
assert.throws(() => convert('gpio98', 'gpio'));

assert.equal(convert('bcm9', 'wiringPi'), 13);
assert.equal(convert('bcm9', 'gpio'), 9);

assert.equal(convert('wiringPi29', 'gpio'), 21);
assert.equal(convert('wiringPi29', 'physical'), 40);

console.log('Test successful.');

# @daisy-electronics/pin-converter

## Usage

```js
const convert = require('@daisy-electronics/pin-converter');

someLibraryRequiringWiringPiNumbering.doSomething(convert('gpio4', 'wiringPi')); // 7
someLibraryRequiringPhysicalNumbering.doSomething(convert('wiringPi21', 'physical')); // 29
// and so on and so forth...
```

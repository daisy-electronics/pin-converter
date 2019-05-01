const minimist = require('minimist');

const { namespaces, mapping } = require('../src/mapping');
const convert = require('../src');

const { iterations = 1000 } = minimist(process.argv.slice(2));
const keys = Object.keys(Object.values(mapping)[0]);

const begin = new Date;

for (let iteration = 0; iteration < iterations; iteration++) {
  for (const namespace of namespaces) {
    for (const key of keys) {
      try {
        const result = convert(key, namespace);
      } catch (error) {
        // ignore
      }
    }
  }
}

const end = new Date;
const diff = end - begin;

console.log(`Iterations: ${iterations}.`);
console.log(`Keys per iteration: ${keys.length * namespaces.length}.`);
console.log(`Time elapsed: ${diff}ms.`);

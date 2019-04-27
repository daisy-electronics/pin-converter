#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const namespaces = ['physical', 'bcm', 'wiringPi'];

const rows = [
  [1,,],
  [2,,],
  [3, 2, 8],
  [4,,],
  [5, 3, 9],
  [6,,],
  [7, 4, 7],
  [8, 14, 15],
  [9,,],
  [10, 15, 16],
  [11, 17, 0],
  [12, 18, 1],
  [13, 27, 2],
  [14,,],
  [15, 22, 3],
  [16, 23, 4],
  [17,,],
  [18, 24, 5],
  [19, 10, 12],
  [20,,],
  [21, 9, 13],
  [22, 25, 6],
  [23, 11, 14],
  [24, 8, 10],
  [25,,],
  [26, 7, 11],
  [27, 0, 30],
  [28, 1, 31],
  [29, 5, 21],
  [30,,],
  [31, 6, 22],
  [32, 12, 26],
  [33, 13, 23],
  [34,,],
  [35, 19, 24],
  [36, 16, 27],
  [37, 26, 25],
  [38, 20, 28],
  [39,,],
  [40, 21, 29]
];

const aliases = {
  bcm: ['gpio']
};

Object.keys(aliases).forEach(namespaceFrom => {
  const indexFrom = namespaces.indexOf(namespaceFrom);
  if (indexFrom === -1) {
    console.error(`WTF??? I guess you got a typo in ${namespaceFrom}`);
    process.exit(1);
  }

  aliases[namespaceFrom].forEach(namespaceTo => {
    namespaces.push(namespaceTo);
    rows.forEach(row => row.push(row[indexFrom]));
  });
});

let result = `const namespaces = [${namespaces.map(namespace => `'${namespace}'`).join(', ')}];\n\n`;
result += `const mapping = {\n`;

for (let indexTo = 0; indexTo < namespaces.length; indexTo++) {
  const namespaceTo = namespaces[indexTo];

  result += `  ${namespaceTo}: {\n`;

  for (let indexFrom = 0; indexFrom < namespaces.length; indexFrom++) {
    const namespaceFrom = namespaces[indexFrom];

    rows.forEach(row => {
      const valueFrom = row[indexFrom];
      const valueTo = row[indexTo];

      if (typeof valueFrom !== 'undefined' && typeof valueTo !== 'undefined') {
        result += `    ${namespaceFrom}${valueFrom}: ${valueTo},\n`;
      }
    });
  }

  result += `  },\n`;
}

result += `};\n\n`;

result += `module.exports = { namespaces, mapping };`;

fs.writeFileSync(path.resolve(__dirname, 'src', 'mapping.js'), result);

console.log('Done.');

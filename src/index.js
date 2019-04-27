try {
  require('./mapping');
} catch (error) {
  console.error(`Run 'npm run build' first!`);
  process.exit(1);
}

const { namespaces, mapping } = require('./mapping');

function convert(pin, namespace) {
  const namespaceMapping = mapping[namespace];
  if (!namespaceMapping) {
    throw new Error(`Invalid namespace: ${namespace}. Available: ${namespaces.join(', ')}.`);
  }

  const result = namespaceMapping[pin];
  if (typeof result === 'undefined') {
    throw new Error(`Invalid pin: ${pin}.`);
  }

  return result;
}

module.exports = convert;

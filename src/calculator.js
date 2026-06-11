#!/usr/bin/env node
'use strict';

/**
 * Node.js CLI Calculator
 * Supported operations:
 *  - add (addition)
 *  - subtract (subtraction)
 *  - multiply (multiplication)
 *  - divide (division)
 *
 * Usage examples:
 *   node src/calculator.js add 2 3        # 5
 *   node src/calculator.js subtract 5 2   # 3
 *   node src/calculator.js multiply 4 6   # 24
 *   node src/calculator.js divide 10 2    # 5
 *
 * The script validates numeric input and handles divide-by-zero.
 */

// Pure functions exported for unit testing
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
};

// CLI behaviour when run directly
if (require.main === module) {
  const [, , op, aRaw, bRaw, ...rest] = process.argv;

  function printHelp() {
    console.log('Usage: node src/calculator.js <operation> <num1> <num2>');
    console.log('Operations: add, subtract, multiply, divide');
    console.log('Example: node src/calculator.js add 2 3');
  }

  if (!op || op === '--help' || op === '-h') {
    printHelp();
    process.exit(0);
  }

  if (rest.length > 0) {
    console.error('Too many arguments. See --help for usage.');
    process.exit(1);
  }

  if (!aRaw || !bRaw) {
    console.error('Missing operands. See --help for usage.');
    process.exit(1);
  }

  const a = Number(aRaw);
  const b = Number(bRaw);

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    console.error('Operands must be valid numbers.');
    process.exit(1);
  }

  try {
    let result;
    switch (op.toLowerCase()) {
      case 'add':
        result = add(a, b);
        break;
      case 'subtract':
        result = subtract(a, b);
        break;
      case 'multiply':
        result = multiply(a, b);
        break;
      case 'divide':
        result = divide(a, b);
        break;
      default:
        console.error('Unsupported operation. Supported: add, subtract, multiply, divide');
        process.exit(1);
    }

    console.log(result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message || String(err));
    process.exit(1);
  }
}

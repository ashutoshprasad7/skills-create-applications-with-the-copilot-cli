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

function exitWithResult(value) {
  // Print result to stdout and exit 0
  console.log(value);
  process.exit(0);
}

function exitWithError(message) {
  console.error(message);
  process.exit(1);
}

switch (op.toLowerCase()) {
  case 'add':
    exitWithResult(a + b);
    break;
  case 'subtract':
    exitWithResult(a - b);
    break;
  case 'multiply':
    exitWithResult(a * b);
    break;
  case 'divide':
    if (b === 0) {
      exitWithError('Error: Division by zero');
    }
    exitWithResult(a / b);
    break;
  default:
    exitWithError('Unsupported operation. Supported: add, subtract, multiply, divide');
}

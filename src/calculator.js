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

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root of negative number');
  }
  return Math.sqrt(n);
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
};

// CLI behaviour when run directly
if (require.main === module) {
  const [, , op, aRaw, bRaw, ...rest] = process.argv;

  function printHelp() {
    console.log('Usage: node src/calculator.js <operation> <num1> <num2>');
    console.log('Operations: add, subtract, multiply, divide, mod, pow, sqrt');
    console.log('Examples:');
    console.log('  node src/calculator.js add 2 3');
    console.log('  node src/calculator.js mod 10 3');
    console.log('  node src/calculator.js pow 2 8');
    console.log('  node src/calculator.js sqrt 16');
  }

  if (!op || op === '--help' || op === '-h') {
    printHelp();
    process.exit(0);
  }

  if (rest.length > 0) {
    console.error('Too many arguments. See --help for usage.');
    process.exit(1);
  }

  const opLower = op.toLowerCase();
  try {
    let result;

    if (opLower === 'sqrt' || opLower === 'squareroot' || opLower === 'root') {
      // unary operation
      if (!aRaw) {
        console.error('Missing operand for sqrt. See --help for usage.');
        process.exit(1);
      }
      const n = Number(aRaw);
      if (!Number.isFinite(n)) {
        console.error('Operand must be a valid number.');
        process.exit(1);
      }
      result = squareRoot(n);
    } else {
      // binary operations
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

      switch (opLower) {
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
        case 'mod':
        case 'modulo':
          result = modulo(a, b);
          break;
        case 'pow':
        case 'power':
          result = power(a, b);
          break;
        default:
          console.error('Unsupported operation. Supported: add, subtract, multiply, divide, mod, pow, sqrt');
          process.exit(1);
      }
    }

    console.log(result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message || String(err));
    process.exit(1);
  }
}

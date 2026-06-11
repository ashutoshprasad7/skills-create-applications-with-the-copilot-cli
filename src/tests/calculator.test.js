const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../calculator');

describe('Calculator operations', () => {
  test('add 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtract 10 - 4 = 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('multiply 45 * 2 = 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('divide 20 / 5 = 4', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => divide(1, 0)).toThrow('Division by zero');
  });

  test('modulo 5 % 2 = 1', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('modulo by zero throws', () => {
    expect(() => modulo(5, 0)).toThrow('Division by zero');
  });

  test('power 2 ^ 3 = 8', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('squareRoot 16 = 4', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('squareRoot of negative number throws', () => {
    expect(() => squareRoot(-1)).toThrow('Square root of negative number');
  });

  test('floating point addition close to expected', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3, 10);
  });

  test('handles negative numbers', () => {
    expect(subtract(-5, -3)).toBe(-2);
    expect(multiply(-4, 2)).toBe(-8);
    expect(divide(-9, 3)).toBe(-3);
  });
});

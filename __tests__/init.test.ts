import { expect, test } from 'vitest';

function sum(a, b) {
  return a + b;
}

test('sum', () => {
  expect(sum(1, 2)).toBe(3);
});

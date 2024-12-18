import { describe, expect, it } from 'vitest';

describe('for loop', () => {
  it('should iterate over an array', () => {
    const arr: number[] = [1, 2, 3, 4, 5];
    let result: number = 0;
    for (let i: number = 0; i < arr.length; i++) {
      result += arr[i];
    }
    expect(result).toBe(15);
  });
});
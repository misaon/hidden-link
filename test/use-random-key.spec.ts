/* eslint-disable unicorn/escape-case,unicorn/no-hex-escape */
// noinspection JSConstantReassignment

import { describe, test, expect } from 'vitest';
import useRandomKey from '../composables/useRandomKey';

describe('Use random key', async () => {
  test('Should generate a random key as Uint8Array', async () => {
    const { generateRandomKey } = useRandomKey();

    const bytesLength = 10;
    const key = await generateRandomKey(bytesLength, true);

    expect(key).toBeInstanceOf(Uint8Array);
    expect(key).toHaveLength(bytesLength);
  });

  test('Should generate a random key as a string', async () => {
    const { generateRandomKey } = useRandomKey();

    const bytesLength = 10;
    const key = await generateRandomKey(bytesLength, false);

    expect(typeof key).toBe('string');
    expect(key).toHaveLength(bytesLength);

    for (const char of key) {
      expect('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_-').toContain(char);
    }
  });

  test('Should generate a random IV key as Uint8Array of specific length', async () => {
    const { generateRandomIVKey } = useRandomKey();

    const bytesLength = 12;
    const ivKey = await generateRandomIVKey(bytesLength);

    expect(ivKey).toBeInstanceOf(Uint8Array);
    expect(ivKey).toHaveLength(bytesLength);
  });

  test('Should throw an error for non-positive length', async () => {
    const { generateRandomKey } = useRandomKey();

    const bytesLength = 0;
    await expect(generateRandomKey(bytesLength, true)).rejects.toThrow(
      'The length of the key must be a positive number.'
    );
  });
});

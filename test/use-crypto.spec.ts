/* eslint-disable unicorn/escape-case,unicorn/no-hex-escape */
// noinspection JSConstantReassignment

import { describe, test, expect } from 'vitest';
import useCrypto from '../composables/useCrypto';

describe('Use crypto', async () => {
  test('Should return Crypto instance', async () => {
    const { crypto } = useCrypto();

    const result = await crypto();

    expect(typeof result).toBe('object');
    expect(typeof result.subtle).toBe('object');
  });
});

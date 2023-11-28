/* eslint-disable unicorn/escape-case,unicorn/no-hex-escape */
// noinspection JSConstantReassignment

import { describe, test, expect, vi } from 'vitest';
import useIdentifier from '../utils/useIdentifier';

describe('Use identifier', async () => {
  test('Should generate identifier', () => {
    const { generateIdentifier } = useIdentifier();

    const fakeDate = new Date('2024-01-01T00:00:00Z');
    vi.useFakeTimers();
    vi.setSystemTime(fakeDate);

    const id = 'abcdefgh-1234567890';
    const expireIn = 259_200; // 3 days

    const input = generateIdentifier({
      id,
      expireIn,
    });

    const output = `${id}:${new Date(fakeDate.getTime() + expireIn * 1000).getTime()}`;

    console.log(output);

    expect(input).toStrictEqual(output);

    vi.useRealTimers();
  });

  test('Should generate hash', () => {
    const { generateHash } = useIdentifier();

    const identifier = 'abcdefgh-1234567890:1704326400000';
    const key = '2MVZMhvBC1TDVqbwB4v4tA5eEmTJQ43m';

    const input = generateHash({
      identifier,
      key,
    });

    const output = `${identifier}:${key}`;

    expect(input).toStrictEqual(output);
  });

  test('Should parse hash', () => {
    const { parseHash } = useIdentifier();

    const id = 'abcdefgh-1234567890';
    const expireIn = '1704326400000';
    const key = '2MVZMhvBC1TDVqbwB4v4tA5eEmTJQ43m';

    const hash = `${id}:${expireIn}:${key}`;

    const input = parseHash(hash);
    const output = {
      id,
      expireIn,
      expireInDate: new Date(Number.parseInt(expireIn)),
      key,
    };

    expect(input).toStrictEqual(output);
  });
});

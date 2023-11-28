/* eslint-disable unicorn/escape-case,unicorn/no-hex-escape */
// noinspection JSConstantReassignment

import { describe, test, expect } from 'vitest';
import useRandomKey from '../utils/useRandomKey';
import useEncoder from '../utils/useEncoder';
import useAes, { ALGORITHM, ALGORITHM_LENGTH } from '../utils/useAes';

describe('Use AES-256 GCM', async () => {
  test(`Should generate a random ${ALGORITHM} key as Uint8Array`, async () => {
    const { generateAesKey } = useAes();

    const aesKey = await generateAesKey();

    expect(aesKey).toBeInstanceOf(CryptoKey);
    expect(aesKey.algorithm.name).toBe(ALGORITHM);
    // @ts-expect-error This is ok for test
    expect(aesKey.algorithm.length).toBe(ALGORITHM_LENGTH);
    expect(aesKey.usages).toContain('encrypt');
    expect(aesKey.usages).toContain('decrypt');
  });

  test(`Should encrypt data using ${ALGORITHM}`, async () => {
    const { generateAesKey, encryptAes } = useAes();
    const { generateRandomIVKey } = useRandomKey();
    const { stringToBuffer } = useEncoder();

    const [key, iv] = await Promise.all([generateAesKey(), generateRandomIVKey()]);

    const encryptedData = await encryptAes(
      iv,
      key,
      stringToBuffer('Test data. Shhht, top secret!')
    );

    expect(encryptedData).toBeInstanceOf(ArrayBuffer);
  });

  test(`Should decrypt ${ALGORITHM} encrypted data`, async () => {
    const { generateAesKey, encryptAes, decryptAes } = useAes();
    const { generateRandomIVKey } = useRandomKey();
    const { stringToBuffer } = useEncoder();

    const [key, iv] = await Promise.all([generateAesKey(), generateRandomIVKey()]);

    const plainData = stringToBuffer('Test data. Shhht, top secret again!');

    const encryptedData = await encryptAes(iv, key, plainData);
    const decryptedData = await decryptAes(iv, key, encryptedData);

    expect(new Uint8Array(decryptedData)).toEqual(new Uint8Array(plainData));
  });
});

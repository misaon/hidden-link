/* eslint-disable unicorn/escape-case,unicorn/no-hex-escape */
// noinspection JSConstantReassignment

import { describe, test, expect } from 'vitest';
import useAes256gcm from '../composables/useAes256gcm';
import useRandomKey from '../composables/useRandomKey';
import useEncoder from '../composables/useEncoder';
import { ALGORITHM, ALGORITHM_LENGTH } from '../composables/useAes256gcm';

describe('Use AES-256 GCM', async () => {
  test(`Should generate a random ${ALGORITHM} key as Uint8Array`, async () => {
    const { generateAesKey } = useAes256gcm();

    const aesKey = await generateAesKey();

    expect(aesKey).toBeInstanceOf(CryptoKey);
    expect(aesKey.algorithm.name).toBe(ALGORITHM);
    // @ts-expect-error This is ok for test
    expect(aesKey.algorithm.length).toBe(ALGORITHM_LENGTH);
    expect(aesKey.usages).toContain('encrypt');
    expect(aesKey.usages).toContain('decrypt');
  });

  test(`Should encrypt data using ${ALGORITHM}`, async () => {
    const { generateAesKey, encryptAes } = useAes256gcm();
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
    const { generateAesKey, encryptAes, decryptAes } = useAes256gcm();
    const { generateRandomIVKey } = useRandomKey();
    const { stringToBuffer } = useEncoder();

    const [key, iv] = await Promise.all([generateAesKey(), generateRandomIVKey()]);

    const plainData = stringToBuffer('Test data. Shhht, top secret again!');

    const encryptedData = await encryptAes(iv, key, plainData);
    const decryptedData = await decryptAes(iv, key, encryptedData);

    expect(new Uint8Array(decryptedData)).toEqual(new Uint8Array(plainData));
  });
});

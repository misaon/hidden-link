/* eslint-disable unicorn/escape-case,unicorn/no-hex-escape */
// noinspection JSConstantReassignment

import { describe, test, expect } from 'vitest';
import useEncoder from '../utils/useEncoder';
import { ALGORITHM } from '../utils/useAes';

const testString = {
  input: `We are ready to do some test => 1234567890 @#$%^&*{} <>.,-|_?!/\\; (čďěíĺňóßšřťúůüýž)`,
  output: {
    arrayBuffer: new Uint8Array([
      87, 101, 32, 97, 114, 101, 32, 114, 101, 97, 100, 121, 32, 116, 111, 32, 100, 111, 32, 115,
      111, 109, 101, 32, 116, 101, 115, 116, 32, 61, 62, 32, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48,
      32, 64, 35, 36, 37, 94, 38, 42, 123, 125, 32, 60, 62, 46, 44, 45, 124, 95, 63, 33, 47, 92, 59,
      32, 40, 196, 141, 196, 143, 196, 155, 195, 173, 196, 186, 197, 136, 195, 179, 195, 159, 197,
      161, 197, 153, 197, 165, 195, 186, 197, 175, 195, 188, 195, 189, 197, 190, 41,
    ]),
    base64:
      'V2UgYXJlIHJlYWR5IHRvIGRvIHNvbWUgdGVzdCA9PiAxMjM0NTY3ODkwIEAjJCVeJip7fSA8Pi4sLXxfPyEvXDsgKMSNxI/Em8OtxLrFiMOzw5/FocWZxaXDusWvw7zDvcW+KQ==',
  },
};

const testBinary = {
  input:
    '\x57\x03\x77\x35\x0d\x97\x2b\x36\xfc\x61\xf0\x76\x1d\x43\x0a\x96\xcd\xf3\x8d\x97\x2c\x56\xba\x42\xc2\x71\xb3\xd7\xaf\x5a\x1e\xb1\x3e\x37\xc2\x5b\x6a\x0d\xc2\xd6\x6b\xfb\x76\x5b\x20\xea\x21\xc7\x32\xe0',
  output: {
    arrayBuffer: new Uint8Array([
      87, 3, 119, 53, 13, 151, 43, 54, 252, 97, 240, 118, 29, 67, 10, 150, 205, 243, 141, 151, 44,
      86, 186, 66, 194, 113, 179, 215, 175, 90, 30, 177, 62, 55, 194, 91, 106, 13, 194, 214, 107,
      251, 118, 91, 32, 234, 33, 199, 50, 224,
    ]),
    base64: 'VwN3NQ2XKzb8YfB2HUMKls3zjZcsVrpCwnGz169aHrE+N8Jbag3C1mv7dlsg6iHHMuA=',
  },
};

describe('Use encoder', async () => {
  test('Should convert string to ArrayBuffer (utf-8)', () => {
    const { stringToBuffer } = useEncoder();

    expect(stringToBuffer(testString.input, false)).toStrictEqual(testString.output.arrayBuffer);
  });

  test('Should convert string to ArrayBuffer (binary)', () => {
    const { stringToBuffer } = useEncoder();

    expect(stringToBuffer(testBinary.input, true)).toStrictEqual(
      testBinary.output.arrayBuffer.buffer
    );
  });

  test('Should convert ArrayBuffer to string (utf-8)', () => {
    const { bufferToString } = useEncoder();

    expect(bufferToString(testString.output.arrayBuffer, false)).toStrictEqual(testString.input);
  });

  test('Should convert ArrayBuffer to string (binary)', () => {
    const { bufferToString } = useEncoder();

    expect(bufferToString(testBinary.output.arrayBuffer.buffer, true)).toStrictEqual(
      testBinary.input
    );
  });

  test('Should convert string to Base64 (utf-8)', () => {
    const { stringToBase64 } = useEncoder();

    expect(stringToBase64(testString.input, false)).toStrictEqual(testString.output.base64);
  });

  test('Should convert string to Base64 (binary)', () => {
    const { stringToBase64 } = useEncoder();

    expect(stringToBase64(testBinary.input, true)).toStrictEqual(testBinary.output.base64);
  });

  test('Should convert Base64 to string (utf-8)', () => {
    const { base64ToString } = useEncoder();

    expect(base64ToString(testString.output.base64, false)).toStrictEqual(testString.input);
  });

  test('Should convert Base64 to string (binary)', () => {
    const { base64ToString } = useEncoder();

    expect(base64ToString(testBinary.output.base64, true)).toStrictEqual(testBinary.input);
  });

  test('Should convert ArrayBuffer to Base64 string (utf-8)', () => {
    const { bufferToBase64 } = useEncoder();

    expect(bufferToBase64(testString.output.arrayBuffer.buffer, false)).toStrictEqual(
      testString.output.base64
    );
  });

  test('Should convert ArrayBuffer to Base64 string (binary)', () => {
    const { bufferToBase64 } = useEncoder();

    expect(bufferToBase64(testBinary.output.arrayBuffer.buffer, true)).toStrictEqual(
      testBinary.output.base64
    );
  });

  test('Should convert Base64 to ArrayBuffer (utf-8)', () => {
    const { base64ToBuffer } = useEncoder();

    const resultArrayBuffer = base64ToBuffer(testString.output.base64, false);

    const viewExpected = new Uint8Array(testString.output.arrayBuffer.buffer);
    const viewResult = new Uint8Array(resultArrayBuffer);

    expect([...viewResult]).toStrictEqual([...viewExpected]);
  });

  test('Should convert Base64 to ArrayBuffer (binary)', () => {
    const { base64ToBuffer } = useEncoder();

    const resultArrayBuffer = base64ToBuffer(testBinary.output.base64, true);

    const viewExpected = new Uint8Array(testBinary.output.arrayBuffer.buffer);
    const viewResult = new Uint8Array(resultArrayBuffer);

    expect([...viewResult]).toStrictEqual([...viewExpected]);
  });

  test(`Should convert ${ALGORITHM} CryptoKey to a Base64`, async () => {
    const { cryptoKeyToBase64, bufferToBase64 } = useEncoder();

    const keyBuffer = new Uint8Array(32).fill(42).buffer;

    const cryptoKey = await crypto.subtle.importKey('raw', keyBuffer, ALGORITHM, true, [
      'encrypt',
      'decrypt',
    ]);

    const base64Result = await cryptoKeyToBase64(cryptoKey);

    expect(base64Result).toStrictEqual(bufferToBase64(keyBuffer));
  });

  test(`Should convert Base64 to a ${ALGORITHM} CryptoKey`, async () => {
    const { base64ToCryptoKey, bufferToBase64 } = useEncoder();

    const keyBuffer = new Uint8Array(32).fill(42).buffer;
    const base64Key = bufferToBase64(keyBuffer);
    const cryptoKey = await base64ToCryptoKey(base64Key, ALGORITHM);
    const exportedKey = await crypto.subtle.exportKey('raw', cryptoKey);

    expect(bufferToBase64(exportedKey)).toStrictEqual(base64Key);
  });
});

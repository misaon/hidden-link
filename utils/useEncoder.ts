import useCrypto from './useCrypto';

const stringToBuffer = (value: string, isBinary = true): ArrayBuffer => {
  if (isBinary) {
    const bytes = new Uint8Array(value.length);

    for (let index = 0; index < value.length; index++) {
      bytes[index] = value.codePointAt(index) || 0;
    }

    return bytes.buffer;
  }

  const encoder = new TextEncoder();

  return encoder.encode(value);
};

const bufferToString = (buffer: ArrayBuffer, isBinary = true): string => {
  if (isBinary) {
    const bytes = new Uint8Array(buffer);

    // eslint-disable-next-line unicorn/prefer-code-point
    return String.fromCharCode(...bytes);
  }

  const decoder = new TextDecoder();

  return decoder.decode(buffer);
};

const stringToBase64 = (value: string, isBinary = true): string => {
  if (process.client) {
    return window.btoa(value);
  }

  return Buffer.from(value, isBinary ? 'binary' : undefined).toString('base64');
};

const base64ToString = (base64: string, isBinary = true): string => {
  if (process.client) {
    return window.atob(base64);
  }

  return Buffer.from(base64, 'base64').toString(isBinary ? 'binary' : 'utf8');
};

const bufferToBase64 = (buffer: ArrayBuffer, isBinary = true): string => {
  const binaryString = bufferToString(buffer, isBinary);

  return stringToBase64(binaryString, isBinary);
};

const base64ToBuffer = (base64: string, isBinary = true): ArrayBuffer => {
  const binaryString = base64ToString(base64, isBinary);

  return stringToBuffer(binaryString, isBinary);
};

export default function () {
  const { crypto } = useCrypto();

  const cryptoKeyToBase64 = async (cryptoKey: CryptoKey): Promise<string> => {
    const c = await crypto();

    const rawKey = await c.subtle.exportKey('raw', cryptoKey);

    return bufferToBase64(rawKey);
  };

  const base64ToCryptoKey = async (base64: string, algorithm: string): Promise<CryptoKey> => {
    const c = await crypto();

    const rawKey = base64ToBuffer(base64);

    return await c.subtle.importKey('raw', rawKey, algorithm, true, ['encrypt', 'decrypt']);
  };

  return {
    base64ToBuffer,
    base64ToCryptoKey,
    bufferToBase64,
    bufferToString,
    cryptoKeyToBase64,
    stringToBuffer,
    stringToBase64,
    base64ToString,
  };
}

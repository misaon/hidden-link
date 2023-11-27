import useCrypto from './useCrypto';

const stringToBuffer = async (value: string): Promise<ArrayBuffer> => {
  if (process.client) {
    const encoder = new TextEncoder();

    return encoder.encode(value);
  }

  return Buffer.from(value, 'utf8');
};

const bufferToString = (buffer: ArrayBuffer): string => {
  if (process.client) {
    const bytes = new Uint8Array(buffer);
    let result = '';

    for (let index = 0; index < bytes.byteLength; index++) {
      result += String.fromCodePoint(bytes[index]);
    }

    return result;
  }

  return (buffer as Buffer).toString('utf8');
};

const stringToBase64 = (value: string): string => {
  if (process.client) {
    return window.btoa(value);
  }

  return Buffer.from(value).toString('base64');
};

const base64ToString = (base64: string): string => {
  if (process.client) {
    return window.atob(base64);
  }

  return Buffer.from(base64, 'base64').toString('utf8');
};

const bufferToBase64 = (buffer: ArrayBuffer): string => {
  const binaryString = bufferToString(buffer);

  return stringToBase64(binaryString);
};

const base64ToBuffer = (base64: string): ArrayBuffer => {
  const binaryString = base64ToString(base64);
  const bytes = new Uint8Array(binaryString.length);

  for (let index = 0; index < binaryString.length; index++) {
    bytes[index] = binaryString.codePointAt(index) || 0;
  }

  return bytes.buffer;
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
  };
}

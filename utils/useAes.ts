import useCrypto from './useCrypto';

export const ALGORITHM = 'AES-GCM';
export const ALGORITHM_LENGTH = 256;

export default function () {
  const { crypto } = useCrypto();

  const generateAesKey = async (): Promise<CryptoKey> => {
    const c = await crypto();

    return c.subtle.generateKey(
      {
        name: ALGORITHM,
        length: ALGORITHM_LENGTH,
      },
      true,
      ['encrypt', 'decrypt']
    );
  };

  const encryptAes = async (
    iv: Uint8Array,
    key: CryptoKey,
    plainData: ArrayBuffer
  ): Promise<ArrayBuffer> => {
    const c = await crypto();

    return c.subtle.encrypt(
      {
        name: ALGORITHM,
        iv,
      },
      key,
      plainData
    );
  };

  const decryptAes = async (
    iv: ArrayBuffer,
    key: CryptoKey,
    encryptedData: ArrayBuffer
  ): Promise<ArrayBuffer> => {
    const c = await crypto();

    return c.subtle.decrypt(
      {
        name: ALGORITHM,
        iv,
      },
      key,
      encryptedData
    );
  };

  return {
    generateAesKey,
    encryptAes,
    decryptAes,
  };
}

import useCrypto from './useCrypto';
import useArrayBuffer from './useArrayBuffer';

const ALGORITHM = 'AES-GCM';
const ALGORITHM_LENGTH = 256;

export default function () {
  const { crypto } = useCrypto();
  const { fromArrayBuffer } = useArrayBuffer();

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
    data: Uint8Array
  ): Promise<ArrayBuffer> => {
    const c = await crypto();

    return c.subtle.encrypt(
      {
        name: ALGORITHM,
        iv,
      },
      key,
      data
    );
  };

  const decryptAes = async (iv: Uint8Array, key: CryptoKey, encryptedData: ArrayBuffer) => {
    const c = await crypto();

    const decryptedData = await c.subtle.decrypt(
      {
        name: ALGORITHM,
        iv,
      },
      key,
      encryptedData
    );

    return fromArrayBuffer(decryptedData);
  };

  return {
    generateAesKey,
    encryptAes,
    decryptAes,
  };
}

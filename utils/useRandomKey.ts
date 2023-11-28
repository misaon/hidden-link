import useCrypto from './useCrypto';

export default function () {
  const { crypto } = useCrypto();

  const generateRandomKey = async (
    bytesLength: number,
    getArrayBuffer = false,
    charactersList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_-'
  ): Promise<string | Uint8Array> => {
    if (bytesLength <= 0) {
      throw new Error('The length of the key must be a positive number.');
    }

    const c = await crypto();

    const randomValues = c.getRandomValues(new Uint8Array(bytesLength));

    if (getArrayBuffer) {
      return randomValues;
    }

    const charactersLength = charactersList.length;
    let result = '';

    for (let index = 0; index < bytesLength; index++) {
      const randomIndex = randomValues[index] % charactersLength;
      result += charactersList[randomIndex];
    }

    return result;
  };

  // 12 bytes is recommended size for key of AES-GCM algorithm
  const generateRandomIVKey = async (bytesLength = 12): Promise<Uint8Array> => {
    const key = await generateRandomKey(bytesLength, true);

    return key instanceof Uint8Array ? key : new Uint8Array();
  };

  return {
    generateRandomKey,
    generateRandomIVKey,
  };
}

import useCrypto from './useCrypto';

export default function () {
  const { crypto } = useCrypto();

  const generateRandomKey = async (length: number): Promise<string> => {
    if (length <= 0) {
      throw new Error('The length of the key must be a positive number.');
    }

    const c = await crypto();

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$-_.+!*'()";
    const charactersLength = characters.length;
    let result = '';

    const randomValues = new Uint8Array(length);

    c.getRandomValues(randomValues);

    for (let index = 0; index < length; index++) {
      const randomIndex = randomValues[index] % charactersLength;
      result += characters[randomIndex];
    }

    return result;
  };

  const generateRandomIVKey = async (bytesLength: number): Promise<Uint8Array> => {
    const c = await crypto();

    return c.getRandomValues(new Uint8Array(bytesLength));
  };

  return {
    generateRandomKey,
    generateRandomIVKey,
  };
}

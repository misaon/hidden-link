const generateRandomKey = async (length: number): Promise<string> => {
  if (length <= 0) {
    throw new Error('The length of the key must be a positive number.');
  }
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$-_.+!*'()";
  const charactersLength = characters.length;
  let result = '';

  const randomValues = new Uint8Array(length);
  window.crypto.getRandomValues(randomValues);

  for (let index = 0; index < length; index++) {
    const randomIndex = randomValues[index] % charactersLength;
    result += characters[randomIndex];
  }

  return result;
};

export default function () {
  return {
    generateRandomKey,
  };
}

const crypto = async (): Promise<Crypto> => {
  if (process.client) {
    return window.crypto;
  }

  const crypto = await import('node:crypto');

  return crypto.webcrypto as Crypto;
};

export default function () {
  return {
    crypto,
  };
}

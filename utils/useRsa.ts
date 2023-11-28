import useCrypto from './useCrypto';

export default function () {
  const { crypto } = useCrypto();

  const generateRsaKeyPair = async () => {
    const c = await crypto();

    const keyPair = await c.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256',
      },
      true,
      ['encrypt', 'decrypt']
    );

    const publicKey = await c.subtle.exportKey('spki', keyPair.publicKey);
    const privateKey = await c.subtle.exportKey('pkcs8', keyPair.privateKey);

    return {
      publicKey,
      privateKey,
    };
  };

  return {
    generateRsaKeyPair,
  };
}

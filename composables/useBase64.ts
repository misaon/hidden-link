const toBase64 = (value: string | number): string => {
  if (process.client) {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(String(value));

    return window.btoa(String.fromCodePoint(...encodedData));
  }

  return Buffer.from(String(value)).toString('base64');
};

const bufferToBase64 = (buffer: ArrayBuffer): string => {
  let binary = '';
  const bytes = new Uint8Array(buffer);

  for (let index = 0; index < bytes.byteLength; index++) {
    binary += String.fromCodePoint(bytes[index]);
  }

  return toBase64(binary);
};

export default function () {
  return {
    toBase64,
    bufferToBase64,
  };
}

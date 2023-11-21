const toArrayBuffer = (value: string): Uint8Array => {
  const encoder = new TextEncoder();

  return encoder.encode(value);
};

function fromArrayBuffer(buffer: ArrayBuffer): string {
  return new TextDecoder().decode(buffer);
}

export default function () {
  return {
    toArrayBuffer,
    fromArrayBuffer,
  };
}

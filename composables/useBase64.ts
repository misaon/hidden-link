const toBase64 = (value: string | number) => {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(String(value));

  return window.btoa(String.fromCodePoint(...encodedData));
};

export default function () {
  return {
    toBase64,
  };
}

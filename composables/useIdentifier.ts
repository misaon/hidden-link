export default function () {
  const { generateRandomKey } = useRandomKey();

  const generate = async () => {
    return await generateRandomKey(128);
  };

  return {
    generate,
  };
}

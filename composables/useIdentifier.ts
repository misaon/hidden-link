import useBase64 from './useBase64';
import useRandomKey from './useRandomKey';

type generateIdentifierOptions = {
  expireIn: number; // in seconds
};

export default function () {
  const { toBase64 } = useBase64();
  const { generateRandomKey } = useRandomKey();

  const generateIdentifier = async (options: generateIdentifierOptions): Promise<string> => {
    const randomKey = await generateRandomKey(128);
    const now = new Date();

    return `${randomKey}:${toBase64(now.toISOString())}:${toBase64(options.expireIn)}`;
  };

  return {
    generateIdentifier,
  };
}

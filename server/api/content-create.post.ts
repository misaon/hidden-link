import type { ContentCreateRequest } from '~/types';
import useRsa from '../../composables/useRsa';
import useBase64 from '../../composables/useBase64';

export default defineEventHandler(async (event) => {
  const { generateRsaKeyPair } = useRsa();
  const { bufferToBase64 } = useBase64();

  const { identifier, content } = await readBody<ContentCreateRequest>(event);

  const { publicKey } = await generateRsaKeyPair();

  const kv = useKv();

  console.log('envy', process.env);
  console.log('kv url', process.env.KV_URL);
  console.log('identifier', identifier);
  console.log('obsah', content);

  await kv.setItem(identifier, content);

  return {
    identifier,
    publicKey: bufferToBase64(publicKey),
  };
});

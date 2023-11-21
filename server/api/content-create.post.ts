import type { ContentCreateRequest } from '~/types';
import useRsa from '../../composables/useRsa';
import useBase64 from '../../composables/useBase64';

export default defineEventHandler(async (event) => {
  const { generateRsaKeyPair } = useRsa();
  const { bufferToBase64 } = useBase64();

  const { publicKey } = await generateRsaKeyPair();

  const body = await readBody<ContentCreateRequest>(event);

  // const kv = useStorage('redis');

  // await kv.setItem(body.identifier, body.content);

  return {
    identifier: body.identifier,
    publicKey: bufferToBase64(publicKey),
  };
});

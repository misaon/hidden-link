import type { ContentCreateRequest } from '~/types';

export default defineEventHandler(async (event) => {
  const { identifier, iv, content } = await readBody<ContentCreateRequest>(event);

  const kv = useKv();

  if (await kv.hasItem(identifier)) {
    // throw error
  }

  await kv.setItem(identifier, {
    iv,
    data: content,
  });

  return {
    identifier,
  };
});

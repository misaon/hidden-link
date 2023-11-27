import type { ContentItem, ContentCreateRequest, ContentCreateResponse } from '~/types';

export default defineEventHandler(async (event): Promise<ContentCreateResponse> => {
  const { identifier, iv, content } = await readBody<ContentCreateRequest>(event);

  const kv = useKv();

  if (await kv.hasItem(identifier)) {
    throw createError({
      fatal: true,
      statusCode: 409,
    });
  }

  await kv.setItem<ContentItem>(identifier, {
    iv,
    data: content,
  });

  return {
    identifier,
  };
});

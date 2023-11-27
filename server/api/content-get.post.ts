import type { ContentItem, ContentGetRequest, ContentGetResponse } from '~/types';

export default defineEventHandler(async (event): Promise<ContentGetResponse> => {
  const { identifier } = await readBody<ContentGetRequest>(event);

  const kv = useKv();

  const content = await kv.getItem<ContentItem>(identifier);

  if (!content) {
    throw createError({
      fatal: true,
      statusCode: 404,
    });
  }

  return {
    content: {
      iv: content.iv,
      data: content.data,
    },
  };
});

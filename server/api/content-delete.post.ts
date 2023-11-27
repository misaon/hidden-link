import type { ContentDeleteRequest } from '~/types';

export default defineEventHandler(async (event) => {
  const { identifier } = await readBody<ContentDeleteRequest>(event);

  const kv = useKv();

  if (!(await kv.hasItem(identifier))) {
    throw createError({
      fatal: true,
      statusCode: 404,
    });
  }

  await kv.removeItem(identifier);

  setResponseStatus(event, 204);
});

import type { ContentDeleteRequest } from '~/types';

export default defineEventHandler(async (event) => {
  const body = await readBody<ContentDeleteRequest>(event);

  const kv = useKv();

  await kv.removeItem(body.identifier);

  setResponseStatus(event, 204);
});

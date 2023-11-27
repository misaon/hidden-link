import type { ContentGetRequest } from '~/types';

export default defineEventHandler(async (event) => {
  const body = await readBody<ContentGetRequest>(event);

  const kv = useKv();

  const content = await kv.getItem(body.identifier);

  return {
    content,
  };
});

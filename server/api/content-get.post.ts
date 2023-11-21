// import type { ContentGetRequest } from '~/types';

export default defineEventHandler(async () => {
  // const body = await readBody<ContentGetRequest>(event);

  // const kv = useStorage('redis');

  // const content = await kv.getItem(body.identifier);
  const content = '';

  return { content };
});

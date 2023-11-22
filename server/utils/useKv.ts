export default () => useStorage(process.env.KV_URL ? 'data' : undefined);

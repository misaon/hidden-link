export default defineEventHandler(async (event) => {
  if (getRequestHeader(event, 'Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    throw createError({
      message: 'Unauthorized',
      statusCode: 401,
    });
  }

  return 'Hello Cron!';
});

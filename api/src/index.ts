import { createServer } from './server';
import config from './utils/config';

const server = createServer();

server.listen(config.PORT, () => {
  console.log(`Node connected on ${config.PORT} ✅`);
  console.log(
    config.NODE_ENV === 'development'
      ? config.DEV_GOOGLE_CALLBACK
      : config.PROD_GOOGLE_CALLBACK,
  );
  console.log(config.PROD_GOOGLE_CALLBACK);
  console.log(config.DEV_GOOGLE_CALLBACK);
});

import { createServer } from './server';
import config from './utils/config';

const server = createServer();

server.listen(config.PORT, () => {
  console.log(`Node connected on ${config.PORT} ✅`);
  console.log(
    config.NODE_ENV === 'development'
      ? 'Development Mode ON🔥'
      : 'Production Mode ON☠',
  );
});

import { createServer } from './server.ts';
import config from './utils/config.ts';

const server = createServer();

server.listen(config.PORT, () => {
  console.log(`api on ${config.PORT}`);
});

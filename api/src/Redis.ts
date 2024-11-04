import { createClient } from 'redis';
import type { RedisClientType } from 'redis';
import config from './utils/config';

export class Redis {
  private readonly client: RedisClientType;
  private static instance: Redis;

  constructor() {
    this.client = createClient({
      url: config.REDIS_URL,
    });
    this.client.connect().catch(console.error);

    this.client.on('error', (err) => console.error('Redis Client Error', err));
    this.client.on('connect', () => console.log('Redis Client Connected ✅'));
  }

  public static getInstance(): Redis {
    if (!this.instance) {
      this.instance = new Redis();
    }
    return this.instance;
  }

  /**
   * Can't use Redis.getInstance, coz connect-redis require a raw redis not a wrapped redis with class
   * @returns raw redis client
   */
  getClient() {
    return this.client;
  }

  async setSpaceFormInfo({
    spaceName,
    spaceData,
  }: {
    spaceName: string;
    spaceData: { customMessage: string; question: string };
  }) {
    await this.client.set(`SPACE:${spaceName}`, JSON.stringify(spaceData), {
      EX: 600,
    });
  }

  async getSpaceFormInfo(spaceName: string) {
    const space = await this.client.get(`SPACE:${spaceName}`);
    return space ? JSON.parse(space) : null;
  }
}

import { createClient } from 'redis';
import type { RedisClientType } from 'redis';
import config from './utils/config.ts';
import { BNewSpacesType } from './space/types.ts';

export class Redis {
  private client: RedisClientType;
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
   */
  getClient() {
    return this.client;
  }

  async setSpace(spaceData: BNewSpacesType[]) {
    await Promise.all(
      spaceData.map(async (space) => {
        await this.client.set(
          `USER:${space.userId}:SPACE:${space.spaceName}`,
          JSON.stringify(space),
          { EX: 600 },
        );
      }),
    );
  }

  async getSpace(userId: number, spaceName: string) {
    const space = await this.client.get(`USER:${userId}:SPACE:${spaceName}`);
    return space ? JSON.parse(space) : null;
  }
}

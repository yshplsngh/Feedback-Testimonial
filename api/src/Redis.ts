import { createClient } from 'redis';
import type { RedisClientType } from 'redis';
import config from './utils/config.ts';

export class Redis {
  private client: RedisClientType;
  private static instance: Redis;

  constructor() {
    this.client = createClient({
      url: config.REDIS_URL,
    });
    this.client.connect();
  }

  public static getInstance(): Redis {
    if (!this.instance) {
      this.instance = new Redis();
    }
    return this.instance;
  }
}

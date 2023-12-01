import { Injectable } from '@nestjs/common';
import { RedisClientType, createClient } from 'redis';
import { RedisDb } from 'src/prototypes/constants/redis_db';

@Injectable()
export class RedisService {
  private client: RedisClientType;
  constructor() {}

  async onModuleInit() {
    const config = {
      socket: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
      database: RedisDb.MAIL,
    };

    this.client = createClient(config);
    this.client.on('error', (err) => {
      console.log('Error when connect redis is: ', err);
    });
    await this.client.connect();
    console.log('Redis connected');
  }

  async set(key: string, value: any) {
    return this.client.set(key, JSON.stringify(value));
  }

  async get<T>(key: string) {
    const result = await this.client.get(key);
    if (!result) return null;
    return JSON.parse(result) as T;
  }
}

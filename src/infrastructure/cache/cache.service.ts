import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { Redis, KeyType, ValueType } from 'ioredis';
import { ExpiryModeEnum } from 'src/shared/interfaces/base_interface/RedisExpiryMode.enum';


@Injectable()
export class CacheService {
  client: Redis;
  constructor (private readonly redisService: RedisService) {
    this.client = redisService.getClient();
  }

  setRedisData (
    key: KeyType,
    value: ValueType,
    expiryMode: ExpiryModeEnum,
    expireTimeInSec: string | number,
  ) {
    return this.client.set(key, value, expiryMode, expireTimeInSec);
  }

  async getRedisData (key: KeyType) {
    return this.client.get(key).then(data => {
      return JSON.parse(data);
    });
  }
}

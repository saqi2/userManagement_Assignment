import { Logger, Module } from '@nestjs/common';
import { redisConfig } from 'config/app.config';
import { RedisModule } from 'nestjs-redis';
import { CacheService } from 'src/infrastructure/cache/cache.service';

@Module({
  imports: [
    RedisModule.register({
      host: redisConfig.host,
      port: redisConfig.port,
      db: redisConfig.db,
      onClientReady: (client) => {
        client.on('error', (err) => {
          Logger.error('Redis Error: ', err);
        });
      },
    }),
  ],
  providers: [ CacheService ],
  exports: [ CacheService ],
})
export class CacheModule {}

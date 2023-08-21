import { Module } from '@nestjs/common';

import { HealthModule } from 'src/shared/health/health.module';

@Module({
  imports: [ HealthModule ],
})
export class SharedModule {}

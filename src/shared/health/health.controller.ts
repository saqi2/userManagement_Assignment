import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  MemoryHealthIndicator,
  HealthCheck,
  HealthCheckService,
} from '@nestjs/terminus';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor (
    private readonly memoryCheck: MemoryHealthIndicator,
    private health: HealthCheckService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The Health Check is successful.',
  })
  @ApiOperation({
    summary: 'An api to check that the application is running well',
  })
  @HealthCheck()
  check () {
    return this.health.check([
      async () => this.memoryCheck.checkHeap('memory_heap', 200 * 1024 * 1024),
      async () => this.memoryCheck.checkRSS('memory_rss', 3000 * 1024 * 1024),
    ]);
  }
}

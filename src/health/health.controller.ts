import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  // Used by ops tools and load balancers to confirm the process is up.
  @Get()
  check() {
    return {
      status: 'ok',
      "version": "2.0",
      timestamp: new Date().toISOString(),
    };
  }
}

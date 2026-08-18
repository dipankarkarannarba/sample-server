import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
  constructor(private configService: ConfigService) {}

  // Used by ops tools and load balancers to confirm the process is up.
  @Get()
  check() {
    const dbHost = this.configService.get<string>('DATABASE_HOST', 'localhost');
    const envName = this.configService.get<string>('APP_ENV', 'development');

    return {
      status: 'ok',
      environment: envName,
      database: dbHost,
      version: '3.0',
      timestamp: new Date().toISOString(),
    };
  }
}

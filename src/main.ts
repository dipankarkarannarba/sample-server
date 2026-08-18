import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend clients
  app.enableCors();
  
  const port = process.env.PORT ?? 3000;
  // Bind on all interfaces so the EC2 public IP (not just localhost) can reach the API.
  await app.listen(port, '0.0.0.0');
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './logger/logger.service';
import { Connection } from 'mongoose';
import { getConnectionToken } from "@nestjs/mongoose";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const loggerService = app.get<LoggerService>(LoggerService);
  
  const configService = app.get(ConfigService);
  const corsOrigins = configService.get<string>('CORS_ORIGIN');
  const port = configService.get<string>('PORT');

  app.enableCors({
    origin: corsOrigins,  // Only allow requests from localhost:3001
    credentials: true,                // Allow credentials if needed (for cookies, authorization headers, etc.)
  });

  process.on('uncaughtException', (error: any) => {
    const message = error?.message || 'Unknown error';
    const stack = error?.stack ? error.stack.toString() : 'No stack trace available';
    loggerService.error(`Uncaught Exception: ${message}\n${stack}`);
    
  });

  process.on('unhandledRejection', (reason: any) => {
    const message = reason?.message || reason?.toString() || 'Unknown reason';
    const stack = reason?.stack ? reason.stack.toString() : 'No stack trace available';
    loggerService.error(`Unhandled Rejection: ${message}\n${stack}`);
    
  });

  const mongooseConnection = app.get<Connection>(getConnectionToken());

  try {
    if (mongooseConnection.readyState === 1) {
      loggerService.info("Mongoose connection is successfully established.");
    } else {
      loggerService.error(`Mongoose connection is failed, ready state ${mongooseConnection.readyState}`);
      throw new Error("Mongoose connection failed to initialize.");
    }
  } catch (error) {
    loggerService.error("Mongoose connection error:", error.message);
    process.exit(1);
  }
  
  await app.listen(port || 9000);
}
bootstrap();

import {
  MiddlewareConsumer,
  Module,
  OnModuleInit,
  ValidationPipe
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LoggerModule } from './logger/logger.module';
import { LoggerService } from './logger/logger.service';
import { UsersModule } from './users/users.module';
import { PokemonModule } from './pokemon/pokemon.module';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),
    LoggerModule,
    UsersModule,
    PokemonModule
  
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
    @InjectConnection() private readonly mongooseConnection: Connection,
  ) {}

  async onModuleInit() {
    try {
      await this.mongooseConnection.asPromise();
      this.loggerService.info('MongoDB connected successfully');
    } catch (error) {
      this.loggerService.error('MongoDB connection failed:', error.message);
      process.exit(1);
    }

    this.mongooseConnection.on('error', (error) => {
      this.loggerService.info('MongoDB connection error:', error.message);
    });
  }

  configure(consumer: MiddlewareConsumer) {
    const appSecretKey = this.configService.get<string>('APP_SECRET_KEY');
    consumer
      .apply(
        cookieSession({
          keys: [appSecretKey],
        }),
      )
      .forRoutes('*');
  }
}

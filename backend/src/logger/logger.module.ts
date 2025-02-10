import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerService } from './logger.service';
import { LogSchema } from './logger.schema'; // Import your log schema
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Log', schema: LogSchema }]), // Define the LogModel schema
    ConfigModule, // If needed for configuration like database URI
  ],
  providers: [LoggerService],
  exports: [LoggerService, MongooseModule.forFeature([{ name: 'Log', schema: LogSchema }])], // Export both LoggerService and LogModel
})
export class LoggerModule {}

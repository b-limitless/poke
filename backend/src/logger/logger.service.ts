import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import 'winston-mongodb'; // Import the MongoDB transport module
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from './logger.schema'; // Import the Log schema

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor(
    private configService: ConfigService,
    @InjectModel('Log') private logModel: Model<Log>, // Inject the Log model
  ) {
    console.log('mongo', this.configService.get<string>('MONGODB_URI'))
    const mongodbTransport = new winston.transports.MongoDB({
      db: this.configService.get<string>('MONGODB_URI'), // MongoDB URL
      collection: 'logs',
      level: 'info', // Allow all levels to be logged, starting from 'info'
      storeHost: true,
      options: { useUnifiedTopology: true },
    });

    

    // Initialize winston logger with MongoDB and Console transports
    this.logger = winston.createLogger({
      level: 'info', // Default level for all transports, set to 'info' for visibility
      transports: [
        new winston.transports.Console({
          level: 'info', // Display 'info' and above in console
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        mongodbTransport, // MongoDB will capture 'info' and above
      ],
    });
  }

  // Function to save the log to the database and console
  async log(level: string, message: string, metadata: Record<string, any> = {}) {
    const log = new this.logModel({
      level,
      message,
      timestamp: new Date(),
      ...metadata,
    });
    await log.save(); // Save the log to the MongoDB database

    this.logger.log(level, message, metadata); // Log to console and MongoDB
  }

  // Wrapper functions for different log levels
  info(message: string, metadata?: Record<string, any>) {
    this.log('info', message, metadata);
  }

  error(message: string, metadata?: Record<string, any>) {
    this.log('error', message, metadata);
  }

  warn(message: string, metadata?: Record<string, any>) {
    this.log('warn', message, metadata);
  }
}
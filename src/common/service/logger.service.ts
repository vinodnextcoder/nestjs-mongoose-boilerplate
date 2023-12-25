import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
          dirname: 'logs', // Specify the directory for log files
          filename: 'application-%DATE%.log', // Set the log file name pattern
          datePattern: 'YYYY-MM-DD', // Define the date pattern for rotation
          zippedArchive: true,
          maxSize: '20m', // Maximum size of a log file before rotation
          maxFiles: '14d', // Maximum days to keep log files
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  // Add other log level methods as needed (e.g., error, warn, debug)
}
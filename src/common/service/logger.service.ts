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
        winston.format.printf(({ level, message, timestamp, correlationId, filename, method }) => {
            return JSON.stringify(`{timestamp:${timestamp},level: ${level.toUpperCase()}, CorrelationID: ${correlationId}, Filename: ${filename}, Method: ${method}: ${message}}`);
        }),
      ),
      transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
          dirname: 'logs',
          filename: 'application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    });
  }

  log(message: string, correlationId?: string, filename?: string, method?: string) {
    this.logger.info(message, { correlationId, filename, method });
  }

  // Add other log level methods as needed (e.g., error, warn, debug)
}
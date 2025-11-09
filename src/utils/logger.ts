import { config } from '../config/index.js';

// Simple color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
} as const;

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = config.server.isDevelopment;
  }

  private formatMessage(level: LogLevel, message: string, meta?: unknown): string {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? `\n${JSON.stringify(meta, null, 2)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
  }

  private colorize(text: string, color: keyof typeof colors): string {
    if (!this.isDevelopment) return text;
    return `${colors[color]}${text}${colors.reset}`;
  }

  debug(message: string, meta?: unknown): void {
    if (this.isDevelopment) {
      console.log(this.colorize(this.formatMessage('debug', message, meta), 'cyan'));
    }
  }

  info(message: string, meta?: unknown): void {
    console.log(this.colorize(this.formatMessage('info', message, meta), 'green'));
  }

  warn(message: string, meta?: unknown): void {
    console.warn(this.colorize(this.formatMessage('warn', message, meta), 'yellow'));
  }

  error(message: string, error?: Error | unknown, meta?: unknown): void {
    const errorInfo = error instanceof Error
      ? { name: error.name, message: error.message, stack: error.stack }
      : error;

    console.error(
      this.colorize(
        this.formatMessage('error', message, { ...meta, error: errorInfo }),
        'red'
      )
    );
  }

  // Specialized logging methods
  lineWebhook(eventType: string, userId: string, groupId?: string): void {
    this.debug('LINE Webhook received', { eventType, userId, groupId });
  }

  commandExecuted(command: string, userId: string): void {
    this.info(`Command executed: ${command}`, { userId });
  }

  fileProcessing(messageId: string, fileType: string): void {
    this.info('Processing file', { messageId, fileType });
  }

  fileStored(fileName: string, driveUrl: string): void {
    this.info(`File stored: ${fileName}`, { driveUrl });
  }

  searchQuery(query: string, resultsCount: number): void {
    this.info('Search query', { query, resultsCount });
  }
}

export const logger = new Logger();

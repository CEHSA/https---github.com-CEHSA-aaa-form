interface LoggerOptions {
  level: 'debug' | 'info' | 'warn' | 'error';
  timestamp?: boolean;
}

class Logger {
  private options: LoggerOptions;

  constructor(options: LoggerOptions = { level: 'info', timestamp: true }) {
    this.options = options;
  }

  private formatMessage(level: string, message: string, meta?: Record<string, unknown>): string {
    const timestamp = this.options.timestamp ? `[${new Date().toISOString()}] ` : '';
    let metaString = '';
    if (meta) {
      metaString = ' {';
      const metaKeys = Object.keys(meta);
      for (let i = 0; i < metaKeys.length; i++) {
        const key = metaKeys[i];
        metaString += `${key}: ${meta[key]}`;
        if (i < metaKeys.length - 1) {
          metaString += ', ';
        }
      }
      metaString += '}';
    }
    return `${timestamp}[${level.toUpperCase()}] ${message}${metaString}`;
  }

  private shouldLog(level: LoggerOptions['level']): boolean {
    const levels: Record<LoggerOptions['level'], number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3
    };
    return levels[level] >= levels[this.options.level];
  }

  public debug(message: string, meta?: Record<string, unknown>): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message, meta));
    }
  }

  public info(message: string, meta?: Record<string, unknown>): void {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message, meta));
    }
  }

  public warn(message: string, meta?: Record<string, unknown>): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, meta));
    }
  }

  public error(message: string, meta?: Record<string, unknown>): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message, meta));
    }
  }
}

// Create and export the default logger instance
const LOG_LEVEL = typeof process !== 'undefined' ? (process.env.VITE_LOG_LEVEL as LoggerOptions['level'] || 'info') : 'info';
export const logger = new Logger({
  level: LOG_LEVEL,
  timestamp: true
});

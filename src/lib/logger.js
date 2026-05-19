/**
 * Simple logging utility
 * Provides formatted console logging with levels and timestamps
 */

const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

const logLevelName = {
  0: 'DEBUG',
  1: 'INFO',
  2: 'WARN',
  3: 'ERROR'
};

const colors = {
  DEBUG: '\x1b[36m', // Cyan
  INFO: '\x1b[32m',  // Green
  WARN: '\x1b[33m',  // Yellow
  ERROR: '\x1b[31m', // Red
  RESET: '\x1b[0m'
};

class Logger {
  constructor(label = 'SBCI') {
    this.label = label;
    this.minLevel = process.env.LOG_LEVEL 
      ? LogLevel[process.env.LOG_LEVEL] || LogLevel.INFO
      : LogLevel.INFO;
  }

  #formatMessage(level, message, data) {
      const timestamp = new Date().toISOString();
    const levelName = logLevelName[level];
    const color = colors[levelName];
    
    let formatted = `${color}[${timestamp}] [${this.label}] [${levelName}]${colors.RESET} ${message}`;
    
    if (data) {
      formatted += `\n${JSON.stringify(data, null, 2)}`;
    }
    
    return formatted;
  }

  debug(message, data) {
    if (this.minLevel <= LogLevel.DEBUG) {
      console.log(this.#formatMessage(LogLevel.DEBUG, message, data));
    }
  }

  info(message, data) {
    if (this.minLevel <= LogLevel.INFO) {
      console.log(this.#formatMessage(LogLevel.INFO, message, data));
    }
  }

  warn(message, data) {
    if (this.minLevel <= LogLevel.WARN) {
      console.warn(this.#formatMessage(LogLevel.WARN, message, data));
    }
  }

  error(message, data) {
    if (this.minLevel <= LogLevel.ERROR) {
      console.error(this.#formatMessage(LogLevel.ERROR, message, data));
    }
  }
}

export function getLogger(label) {
  return new Logger(label);
}

export default Logger;

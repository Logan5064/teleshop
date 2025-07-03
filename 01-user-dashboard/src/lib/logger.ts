/**
 * 📝 TeleShop Frontend Logger
 * Централизованная система логирования для замены console.log
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
  component?: string;
}

class FrontendLogger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private logs: LogEntry[] = [];
  private maxLogs = 1000; // Максимум логов в памяти

  private log(level: LogLevel, message: string, data?: any, component?: string) {
    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
      component
    };

    // В development показываем в консоли
    if (this.isDevelopment) {
      const prefix = this.getPrefix(level);
      const componentStr = component ? `[${component}] ` : '';
      
      if (data !== undefined) {
        console[level === 'debug' ? 'log' : level](`${prefix} ${componentStr}${message}`, data);
      } else {
        console[level === 'debug' ? 'log' : level](`${prefix} ${componentStr}${message}`);
      }
    }

    // Сохраняем в память (для отправки на сервер при ошибках)
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Критические ошибки отправляем на сервер
    if (level === 'error' && !this.isDevelopment) {
      this.sendErrorToServer(entry);
    }
  }

  private getPrefix(level: LogLevel): string {
    const prefixes = {
      debug: '🔍',
      info: '📝',
      warn: '⚠️',
      error: '❌'
    };
    return prefixes[level];
  }

  private async sendErrorToServer(entry: LogEntry) {
    try {
      // Отправляем ошибку на backend для мониторинга
      await fetch('/api/logs/error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
    } catch (e) {
      // Если не можем отправить на сервер, ничего не делаем
    }
  }

  // Публичные методы
  debug(message: string, data?: any, component?: string) {
    this.log('debug', message, data, component);
  }

  info(message: string, data?: any, component?: string) {
    this.log('info', message, data, component);
  }

  warn(message: string, data?: any, component?: string) {
    this.log('warn', message, data, component);
  }

  error(message: string, data?: any, component?: string) {
    this.log('error', message, data, component);
  }

  // Специальные методы для частых случаев
  apiRequest(url: string, method: string, component?: string) {
    this.debug(`API Request: ${method} ${url}`, undefined, component);
  }

  apiError(message: string, error: any, component?: string) {
    this.error(`API Error: ${message}`, error, component);
  }

  dragDrop(action: string, blockType?: string, component?: string) {
    this.debug(`Drag & Drop: ${action}${blockType ? ` - ${blockType}` : ''}`, undefined, component);
  }

  userAction(action: string, data?: any, component?: string) {
    this.info(`User Action: ${action}`, data, component);
  }

  // Получить последние логи (для отладки)
  getLogs(level?: LogLevel): LogEntry[] {
    return level ? this.logs.filter(log => log.level === level) : this.logs;
  }

  // Очистить логи
  clearLogs() {
    this.logs = [];
  }
}

// Экспортируем единственный инстанс
export const logger = new FrontendLogger();

// Удобные алиасы
export const log = logger;
export default logger; 
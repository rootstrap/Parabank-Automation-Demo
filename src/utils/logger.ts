/**
 * Structured logging utility
 * Following the rule: Use structured logging instead of console.log statements
 */

export enum LogLevel {
	DEBUG = "debug",
	INFO = "info",
	WARN = "warn",
	ERROR = "error",
}

export interface LogEntry {
	level: LogLevel;
	message: string;
	timestamp: string;
	context?: Record<string, unknown>;
}

/**
 * Logger class for structured logging
 */
export class Logger {
	private static instance: Logger;
	private logLevel: LogLevel = LogLevel.INFO;

	private constructor() {}

	public static getInstance(): Logger {
		if (!Logger.instance) {
			Logger.instance = new Logger();
		}
		return Logger.instance;
	}

	/**
	 * Set the minimum log level
	 * @param level - The minimum log level to display
	 */
	public setLogLevel(level: LogLevel): void {
		this.logLevel = level;
	}

	/**
	 * Log a debug message
	 * @param message - The message to log
	 * @param context - Optional context object
	 */
	public debug(message: string, context?: Record<string, unknown>): void {
		this.log(LogLevel.DEBUG, message, context);
	}

	/**
	 * Log an info message
	 * @param message - The message to log
	 * @param context - Optional context object
	 */
	public info(message: string, context?: Record<string, unknown>): void {
		this.log(LogLevel.INFO, message, context);
	}

	/**
	 * Log a warning message
	 * @param message - The message to log
	 * @param context - Optional context object
	 */
	public warn(message: string, context?: Record<string, unknown>): void {
		this.log(LogLevel.WARN, message, context);
	}

	/**
	 * Log an error message
	 * @param message - The message to log
	 * @param context - Optional context object
	 */
	public error(message: string, context?: Record<string, unknown>): void {
		this.log(LogLevel.ERROR, message, context);
	}

	private log(
		level: LogLevel,
		message: string,
		context?: Record<string, unknown>
	): void {
		if (this.shouldLog(level)) {
			const entry: LogEntry = {
				level,
				message,
				timestamp: new Date().toISOString(),
				...(context && { context }),
			};

			// In test environment, use console for now
			// In production, this would be replaced with proper logging service
			const logMessage = `[${entry.timestamp}] ${level.toUpperCase()}: ${message}`;
			if (context) {
				// eslint-disable-next-line no-console
				console.log(logMessage, context);
			} else {
				// eslint-disable-next-line no-console
				console.log(logMessage);
			}
		}
	}

	private shouldLog(level: LogLevel): boolean {
		const levels = [
			LogLevel.DEBUG,
			LogLevel.INFO,
			LogLevel.WARN,
			LogLevel.ERROR,
		];
		const currentLevelIndex = levels.indexOf(this.logLevel);
		const messageLevelIndex = levels.indexOf(level);
		return messageLevelIndex >= currentLevelIndex;
	}
}

// Export a singleton instance
export const logger = Logger.getInstance();

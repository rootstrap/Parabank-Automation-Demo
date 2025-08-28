/**
 * Timeout constants for Playwright operations
 * Following the rule: Avoid magic numbers or strings — use named constants
 */
export const TIMEOUTS = {
	/** Short timeout for quick operations (5 seconds) */
	SHORT: 5000,
	/** Medium timeout for standard operations (10 seconds) */
	MEDIUM: 10000,
	/** Long timeout for complex operations (15 seconds) */
	LONG: 15000,
	/** Very long timeout for slow operations (30 seconds) */
	VERY_LONG: 30000,
} as const;

/**
 * Test data constants
 */
export const TEST_DATA = {
	/** Default strong password pattern */
	STRONG_PASSWORD_PATTERN:
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
	/** Default password length */
	PASSWORD_LENGTH: 12,
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
	INVALID_LOGIN: "Invalid login credentials. Please try again.",
	ELEMENT_NOT_FOUND: "Element not found on page",
	TIMEOUT_EXCEEDED: "Operation timed out",
} as const;

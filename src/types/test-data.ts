/**
 * TypeScript interfaces for test data
 * Following the rule: Define clear interfaces or types for response models
 */

/**
 * User registration data interface
 */
export interface UserRegistrationData {
	/** User's first name */
	firstName: string;
	/** User's last name */
	lastName: string;
	/** User's email address */
	email: string;
	/** User's password */
	password: string;
}

/**
 * User login data interface
 */
export interface UserLoginData {
	/** User's email address */
	email: string;
	/** User's password */
	password: string;
}

/**
 * Test user data interface
 */
export interface TestUserData {
	/** User registration data */
	registration: UserRegistrationData;
	/** User login data */
	login: UserLoginData;
}

/**
 * Page element locator interface
 */
export interface PageElement {
	/** Element locator */
	locator: string;
	/** Element timeout */
	timeout?: number;
	/** Whether element is required */
	required?: boolean;
}

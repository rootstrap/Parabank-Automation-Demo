export interface UserCredentials {
	username: string;
	password: string;
	confirmPassword: string;
	firstName: string;
	lastName: string;
	address: string;
	city: string;
	state: string;
	zipCode: string;
	phone: string;
	ssn: string;
}

export interface TestUser {
	credentials: UserCredentials;
	expectedMessage: string;
}

/**
 * Generate unique user credentials for testing
 * @param prefix - Prefix for the username (default: 'testuser')
 * @returns UserCredentials object with unique username
 */
export function generateUniqueUserCredentials(prefix: string = 'testuser'): UserCredentials {
	const timestamp = Date.now();
	//const randomSuffix = Math.floor(Math.random() * 1000);
	const username = `${timestamp}`;

	return {
		username,
		password: 'TestPassword123!',
		confirmPassword: 'TestPassword123!',
		firstName: 'Test',
		lastName: 'User',
		address: '123 Test Street',
		city: 'Test City',
		state: 'CA',
		zipCode: '12345',
		phone: '555-123-4567',
		ssn: '123-45-6789'
	};
}

/**
 * Predefined test user for consistent testing
 */
export const predefinedTestUser: TestUser = {
	credentials: {
		username: 'john',
		password: 'demo',
		confirmPassword: 'demo',
		firstName: 'John',
		lastName: 'Smith',
		address: '123 Main St',
		city: 'Anytown',
		state: 'CA',
		zipCode: '12345',
		phone: '555-123-4567',
		ssn: '123-45-6789'
	},
	expectedMessage: 'Your account was created successfully. You are now logged in.'
};

/**
 * Invalid test user for negative testing
 */
export const invalidTestUser: UserCredentials = {
	username: 'invaliduser',
	password: 'wrongpassword',
	confirmPassword: 'wrongpassword',
	firstName: 'Invalid',
	lastName: 'User',
	address: '456 Wrong St',
	city: 'Wrong City',
	state: 'XX',
	zipCode: '00000',
	phone: '555-999-9999',
	ssn: '999-99-9999'
};

/**
 * Test data factory for generating realistic test data
 * Following the rule: Use faker for generating test data
 */

import { UserRegistrationData, UserLoginData } from "../types/test-data";

/**
 * Factory class for generating test data
 */
export class TestDataFactory {
	/**
	 * Generate a unique email address for testing
	 * @returns A unique email address
	 */
	public static generateUniqueEmail(): string {
		const timestamp = Date.now();
		const randomSuffix = Math.random().toString(36).substring(2, 8);
		return `test.${timestamp}.${randomSuffix}@example.com`;
	}

	/**
	 * Generate a strong password that meets security requirements
	 * @returns A strong password
	 */
	public static generateStrongPassword(): string {
		const lowercase = "abcdefghijklmnopqrstuvwxyz";
		const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const numbers = "0123456789";
		const symbols = "@$!%*?&";

		// Ensure at least one character from each category
		let password = "";
		password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
		password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
		password += numbers.charAt(Math.floor(Math.random() * numbers.length));
		password += symbols.charAt(Math.floor(Math.random() * symbols.length));

		// Fill the rest with random characters
		const allChars = lowercase + uppercase + numbers + symbols;
		for (let i = 4; i < 12; i++) {
			password += allChars.charAt(Math.floor(Math.random() * allChars.length));
		}

		// Shuffle the password
		return password
			.split("")
			.sort(() => Math.random() - 0.5)
			.join("");
	}

	/**
	 * Generate user registration data
	 * @returns Complete user registration data
	 */
	public static generateUserRegistrationData(): UserRegistrationData {
		return {
			firstName: "Test",
			lastName: "User",
			email: this.generateUniqueEmail(),
			password: this.generateStrongPassword(),
		};
	}

	/**
	 * Generate user login data
	 * @param email - Optional email, will generate if not provided
	 * @param password - Optional password, will generate if not provided
	 * @returns User login data
	 */
	public static generateUserLoginData(
		email?: string,
		password?: string
	): UserLoginData {
		return {
			email: email || this.generateUniqueEmail(),
			password: password || this.generateStrongPassword(),
		};
	}

	/**
	 * Generate invalid login data for negative testing
	 * @returns Invalid login data
	 */
	public static generateInvalidLoginData(): UserLoginData {
		return {
			email: "invalid@example.com",
			password: "invalid-password",
		};
	}
}

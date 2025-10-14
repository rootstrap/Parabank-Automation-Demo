import { Page, Locator } from "@playwright/test";

export class RegisterPage {
	readonly page: Page;
	
	// Header elements (same as homepage)
	readonly parabankLogo: Locator;
	readonly adminPageLink: Locator;
	
	// Navigation elements
	readonly aboutUsLink: Locator;
	readonly servicesLink: Locator;
	readonly productsLink: Locator;
	readonly locationsLink: Locator;
	readonly adminPageNavLink: Locator;
	
	// Secondary navigation
	readonly homeLink: Locator;
	readonly aboutLink: Locator;
	readonly contactLink: Locator;
	
	// Login form elements
	readonly usernameField: Locator;
	readonly passwordField: Locator;
	readonly loginButton: Locator;
	readonly forgotLoginInfoLink: Locator;
	readonly registerLink: Locator;
	
	// Registration form elements
	readonly firstNameField: Locator;
	readonly lastNameField: Locator;
	readonly addressField: Locator;
	readonly cityField: Locator;
	readonly stateField: Locator;
	readonly zipCodeField: Locator;
	readonly phoneField: Locator;
	readonly ssnField: Locator;
	readonly regUsernameField: Locator;
	readonly regPasswordField: Locator;
	readonly confirmPasswordField: Locator;
	readonly registerButton: Locator;
	
	// Footer elements
	readonly footerHomeLink: Locator;
	readonly footerAboutUsLink: Locator;
	readonly footerServicesLink: Locator;
	readonly footerProductsLink: Locator;
	readonly footerLocationsLink: Locator;
	readonly footerForumLink: Locator;
	readonly footerSiteMapLink: Locator;
	readonly footerContactUsLink: Locator;
	readonly parasoftWebsiteLink: Locator;

	constructor(page: Page) {
		this.page = page;
		
		// Header elements
		this.parabankLogo = page.getByRole("img", { name: "ParaBank" });
		this.adminPageLink = page.locator("#headerPanel a[href*='admin.htm']");
		
		// Navigation elements
		this.aboutUsLink = page.getByRole("link", { name: "About Us" });
		this.servicesLink = page.getByRole("link", { name: "Services" });
		this.productsLink = page.getByRole("link", { name: "Products" });
		this.locationsLink = page.getByRole("link", { name: "Locations" });
		this.adminPageNavLink = page.getByRole("link", { name: "Admin Page" });
		
		// Secondary navigation
		this.homeLink = page.getByRole("link", { name: "home", exact: true });
		this.aboutLink = page.getByRole("link", { name: "about", exact: true });
		this.contactLink = page.getByRole("link", { name: "contact", exact: true });
		
		// Login form elements
		this.usernameField = page.locator('input[name="username"]');
		this.passwordField = page.locator('input[name="password"]');
		this.loginButton = page.getByRole("button", { name: "Log In" });
		this.forgotLoginInfoLink = page.getByRole("link", { name: "Forgot login info?" });
		this.registerLink = page.getByRole("link", { name: "Register" });
		
		// Registration form elements - using table cell selectors since they're in a table
		this.firstNameField = page.locator("table tbody tr").filter({ hasText: "First Name:" }).locator("input");
		this.lastNameField = page.locator("table tbody tr").filter({ hasText: "Last Name:" }).locator("input");
		this.addressField = page.locator("table tbody tr").filter({ hasText: "Address:" }).locator("input");
		this.cityField = page.locator("table tbody tr").filter({ hasText: "City:" }).locator("input");
		this.stateField = page.locator("table tbody tr").filter({ hasText: "State:" }).locator("input");
		this.zipCodeField = page.locator("table tbody tr").filter({ hasText: "Zip Code:" }).locator("input");
		this.phoneField = page.locator("table tbody tr").filter({ hasText: "Phone #:" }).locator("input");
		this.ssnField = page.locator("table tbody tr").filter({ hasText: "SSN:" }).locator("input");
		this.regUsernameField = page.locator("table tbody tr").filter({ hasText: "Username:" }).locator("input");
		this.regPasswordField = page.locator("table tbody tr").filter({ hasText: "Password:" }).locator("input");
		this.confirmPasswordField = page.locator("table tbody tr").filter({ hasText: "Confirm:" }).locator("input");
		this.registerButton = page.getByRole("button", { name: "Register" });
		
		// Footer elements
		this.footerHomeLink = page.getByRole("link", { name: "Home", exact: true });
		this.footerAboutUsLink = page.getByRole("link", { name: "About Us" });
		this.footerServicesLink = page.getByRole("link", { name: "Services" });
		this.footerProductsLink = page.getByRole("link", { name: "Products" });
		this.footerLocationsLink = page.getByRole("link", { name: "Locations" });
		this.footerForumLink = page.getByRole("link", { name: "Forum" });
		this.footerSiteMapLink = page.getByRole("link", { name: "Site Map" });
		this.footerContactUsLink = page.getByRole("link", { name: "Contact Us" });
		this.parasoftWebsiteLink = page.getByRole("link", { name: "www.parasoft.com" });
	}

	/**
	 * Navigate to the registration page
	 */
	async goto(): Promise<void> {
		await this.page.goto("/register.htm");
	}

	/**
	 * Fill out the registration form with user details
	 * @param userData - Object containing user registration data
	 */
	async fillRegistrationForm(userData: {
		firstName: string;
		lastName: string;
		address: string;
		city: string;
		state: string;
		zipCode: string;
		phone: string;
		ssn: string;
		username: string;
		password: string;
		confirmPassword: string;
	}): Promise<void> {
		await this.firstNameField.fill(userData.firstName);
		await this.lastNameField.fill(userData.lastName);
		await this.addressField.fill(userData.address);
		await this.cityField.fill(userData.city);
		await this.stateField.fill(userData.state);
		await this.zipCodeField.fill(userData.zipCode);
		await this.phoneField.fill(userData.phone);
		await this.ssnField.fill(userData.ssn);
		await this.regUsernameField.fill(userData.username);
		await this.regPasswordField.fill(userData.password);
		await this.confirmPasswordField.fill(userData.confirmPassword);
	}

	/**
	 * Submit the registration form
	 */
	async submitRegistration(): Promise<void> {
		await this.registerButton.click();
	}

	/**
	 * Complete the full registration process
	 * @param userData - Object containing user registration data
	 */
	async register(userData: {
		firstName: string;
		lastName: string;
		address: string;
		city: string;
		state: string;
		zipCode: string;
		phone: string;
		ssn: string;
		username: string;
		password: string;
		confirmPassword: string;
	}): Promise<void> {
		await this.fillRegistrationForm(userData);
		await this.submitRegistration();
	}

	/**
	 * Navigate to About Us page
	 */
	async goToAboutUs(): Promise<void> {
		await this.aboutUsLink.click();
	}

	/**
	 * Navigate to Services page
	 */
	async goToServices(): Promise<void> {
		await this.servicesLink.click();
	}

	/**
	 * Navigate to Contact page
	 */
	async goToContact(): Promise<void> {
		await this.contactLink.click();
	}

	/**
	 * Click on ParaBank logo to go to homepage
	 */
	async clickLogo(): Promise<void> {
		await this.parabankLogo.click();
	}
}

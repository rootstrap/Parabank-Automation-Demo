import { Page, Locator } from "@playwright/test";

export class LookupPage {
	readonly page: Page;
	
	// Header elements
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
	
	// Lookup form elements
	readonly pageTitle: Locator;
	readonly lookupDescription: Locator;
	readonly firstNameField: Locator;
	readonly lastNameField: Locator;
	readonly addressField: Locator;
	readonly cityField: Locator;
	readonly stateField: Locator;
	readonly zipCodeField: Locator;
	readonly ssnField: Locator;
	readonly findMyLoginInfoButton: Locator;
	
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
		
		// Lookup form elements - using table cell selectors since they're in a table
		this.pageTitle = page.getByRole("heading", { name: "Customer Lookup" });
		this.lookupDescription = page.locator("p").filter({ hasText: "Please fill out the following information" });
		this.firstNameField = page.locator("table tbody tr").filter({ hasText: "First Name:" }).locator("input");
		this.lastNameField = page.locator("table tbody tr").filter({ hasText: "Last Name:" }).locator("input");
		this.addressField = page.locator("table tbody tr").filter({ hasText: "Address:" }).locator("input");
		this.cityField = page.locator("table tbody tr").filter({ hasText: "City:" }).locator("input");
		this.stateField = page.locator("table tbody tr").filter({ hasText: "State:" }).locator("input");
		this.zipCodeField = page.locator("table tbody tr").filter({ hasText: "Zip Code:" }).locator("input");
		this.ssnField = page.locator("table tbody tr").filter({ hasText: "SSN:" }).locator("input");
		this.findMyLoginInfoButton = page.getByRole("button", { name: "Find My Login Info" });
		
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
	 * Navigate to the Customer Lookup page
	 */
	async goto(): Promise<void> {
		await this.page.goto("/lookup.htm");
	}

	/**
	 * Fill out the lookup form with customer information
	 * @param customerData - Object containing customer lookup data
	 */
	async fillLookupForm(customerData: {
		firstName: string;
		lastName: string;
		address: string;
		city: string;
		state: string;
		zipCode: string;
		ssn: string;
	}): Promise<void> {
		await this.firstNameField.fill(customerData.firstName);
		await this.lastNameField.fill(customerData.lastName);
		await this.addressField.fill(customerData.address);
		await this.cityField.fill(customerData.city);
		await this.stateField.fill(customerData.state);
		await this.zipCodeField.fill(customerData.zipCode);
		await this.ssnField.fill(customerData.ssn);
	}

	/**
	 * Submit the lookup form
	 */
	async submitLookupForm(): Promise<void> {
		await this.findMyLoginInfoButton.click();
	}

	/**
	 * Complete the full lookup process
	 * @param customerData - Object containing customer lookup data
	 */
	async findLoginInfo(customerData: {
		firstName: string;
		lastName: string;
		address: string;
		city: string;
		state: string;
		zipCode: string;
		ssn: string;
	}): Promise<void> {
		await this.fillLookupForm(customerData);
		await this.submitLookupForm();
	}

	/**
	 * Get the page title text
	 */
	async getPageTitle(): Promise<string> {
		return await this.pageTitle.textContent() || "";
	}

	/**
	 * Get the lookup description text
	 */
	async getLookupDescription(): Promise<string> {
		return await this.lookupDescription.textContent() || "";
	}

	/**
	 * Navigate to Home page
	 */
	async goToHome(): Promise<void> {
		await this.homeLink.click();
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

	/**
	 * Perform login with username and password
	 * @param username - The username to login with
	 * @param password - The password to login with
	 */
	async login(username: string, password: string): Promise<void> {
		await this.usernameField.fill(username);
		await this.passwordField.fill(password);
		await this.loginButton.click();
	}
}

import { Page, Locator } from "@playwright/test";

export class ContactPage {
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
	
	// Contact form elements
	readonly pageTitle: Locator;
	readonly contactDescription: Locator;
	readonly nameField: Locator;
	readonly emailField: Locator;
	readonly phoneField: Locator;
	readonly messageField: Locator;
	readonly sendToCustomerCareButton: Locator;
	
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
		
		// Contact form elements - using table cell selectors since they're in a table
		this.pageTitle = page.getByRole("heading", { name: "Customer Care" });
		this.contactDescription = page.locator("p").filter({ hasText: "Email support is available" });
		this.nameField = page.locator("table tbody tr").filter({ hasText: "Name:" }).locator("input");
		this.emailField = page.locator("table tbody tr").filter({ hasText: "Email:" }).locator("input");
		this.phoneField = page.locator("table tbody tr").filter({ hasText: "Phone:" }).locator("input");
		this.messageField = page.locator("table tbody tr").filter({ hasText: "Message:" }).locator("input");
		this.sendToCustomerCareButton = page.getByRole("button", { name: "Send to Customer Care" });
		
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
	 * Navigate to the Contact page
	 */
	async goto(): Promise<void> {
		await this.page.goto("/contact.htm");
	}

	/**
	 * Fill out the contact form
	 * @param contactData - Object containing contact form data
	 */
	async fillContactForm(contactData: {
		name: string;
		email: string;
		phone: string;
		message: string;
	}): Promise<void> {
		await this.nameField.fill(contactData.name);
		await this.emailField.fill(contactData.email);
		await this.phoneField.fill(contactData.phone);
		await this.messageField.fill(contactData.message);
	}

	/**
	 * Submit the contact form
	 */
	async submitContactForm(): Promise<void> {
		await this.sendToCustomerCareButton.click();
	}

	/**
	 * Complete the full contact form submission
	 * @param contactData - Object containing contact form data
	 */
	async sendContactMessage(contactData: {
		name: string;
		email: string;
		phone: string;
		message: string;
	}): Promise<void> {
		await this.fillContactForm(contactData);
		await this.submitContactForm();
	}

	/**
	 * Get the page title text
	 */
	async getPageTitle(): Promise<string> {
		return await this.pageTitle.textContent() || "";
	}

	/**
	 * Get the contact description text
	 */
	async getContactDescription(): Promise<string> {
		return await this.contactDescription.textContent() || "";
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

import { Page, Locator } from "@playwright/test";

export class ServicesPage {
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
	
	// Services page specific elements
	readonly bookstoreServicesSection: Locator;
	readonly parabankServicesSection: Locator;
	readonly restfulServicesSection: Locator;
	
	// Bookstore service links
	readonly bookstoreServiceLinks: Locator;
	readonly bookstoreV2ServiceLinks: Locator;
	readonly bookstoreWssUsernameTokenLinks: Locator;
	readonly bookstoreWssSignatureLinks: Locator;
	readonly bookstoreWssEncryptionLinks: Locator;
	readonly bookstoreWssSignatureEncryptionLinks: Locator;
	
	// ParaBank service links
	readonly loanProcessorServiceLinks: Locator;
	readonly parabankServiceLinks: Locator;
	
	// RESTful service links
	readonly restfulServiceLinks: Locator;
	readonly wadlLink: Locator;
	readonly openApiLink: Locator;
	
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
		
		// Services page specific elements
		this.bookstoreServicesSection = page.locator("text=Available Bookstore SOAP services:");
		this.parabankServicesSection = page.locator("text=Available ParaBank SOAP services:");
		this.restfulServicesSection = page.locator("text=Available RESTful services:");
		
		// Bookstore service links - using more specific selectors
		this.bookstoreServiceLinks = page.locator('a[href*="store-01?wsdl"]');
		this.bookstoreV2ServiceLinks = page.locator('a[href*="store-01V2?wsdl"]');
		this.bookstoreWssUsernameTokenLinks = page.locator('a[href*="store-wss-01?wsdl"]');
		this.bookstoreWssSignatureLinks = page.locator('a[href*="store-wss-02?wsdl"]');
		this.bookstoreWssEncryptionLinks = page.locator('a[href*="store-wss-03?wsdl"]');
		this.bookstoreWssSignatureEncryptionLinks = page.locator('a[href*="store-wss-04?wsdl"]');
		
		// ParaBank service links
		this.loanProcessorServiceLinks = page.locator('a[href*="LoanProcessor?wsdl"]');
		this.parabankServiceLinks = page.locator('a[href*="ParaBank?wsdl"]');
		
		// RESTful service links
		this.restfulServiceLinks = page.locator('a[href*="bank?_wadl&_type=xml"]');
		this.wadlLink = page.locator('a[href*="_wadl&_type=xml"]');
		this.openApiLink = page.locator('a[href*="api-docs/index.html"]');
		
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
	 * Navigate to the Services page
	 */
	async goto(): Promise<void> {
		await this.page.goto("/services.htm");
	}

	/**
	 * Check if bookstore services section is visible
	 */
	async isBookstoreServicesVisible(): Promise<boolean> {
		return await this.bookstoreServicesSection.isVisible();
	}

	/**
	 * Check if ParaBank services section is visible
	 */
	async isParabankServicesVisible(): Promise<boolean> {
		return await this.parabankServicesSection.isVisible();
	}

	/**
	 * Check if RESTful services section is visible
	 */
	async isRestfulServicesVisible(): Promise<boolean> {
		return await this.restfulServicesSection.isVisible();
	}

	/**
	 * Click on the first bookstore service WSDL link
	 */
	async clickBookstoreServiceWSDL(): Promise<void> {
		await this.bookstoreServiceLinks.first().click();
	}

	/**
	 * Click on the bookstore V2 service WSDL link
	 */
	async clickBookstoreV2ServiceWSDL(): Promise<void> {
		await this.bookstoreV2ServiceLinks.first().click();
	}

	/**
	 * Click on the WS-Security Username Token service WSDL link
	 */
	async clickBookstoreWssUsernameTokenWSDL(): Promise<void> {
		await this.bookstoreWssUsernameTokenLinks.first().click();
	}

	/**
	 * Click on the WS-Security Signature service WSDL link
	 */
	async clickBookstoreWssSignatureWSDL(): Promise<void> {
		await this.bookstoreWssSignatureLinks.first().click();
	}

	/**
	 * Click on the WS-Security Encryption service WSDL link
	 */
	async clickBookstoreWssEncryptionWSDL(): Promise<void> {
		await this.bookstoreWssEncryptionLinks.first().click();
	}

	/**
	 * Click on the WS-Security Signature and Encryption service WSDL link
	 */
	async clickBookstoreWssSignatureEncryptionWSDL(): Promise<void> {
		await this.bookstoreWssSignatureEncryptionLinks.first().click();
	}

	/**
	 * Click on the Loan Processor service WSDL link
	 */
	async clickLoanProcessorServiceWSDL(): Promise<void> {
		await this.loanProcessorServiceLinks.first().click();
	}

	/**
	 * Click on the ParaBank service WSDL link
	 */
	async clickParabankServiceWSDL(): Promise<void> {
		await this.parabankServiceLinks.first().click();
	}

	/**
	 * Click on the RESTful service WADL link
	 */
	async clickRestfulServiceWADL(): Promise<void> {
		await this.wadlLink.first().click();
	}

	/**
	 * Click on the OpenAPI documentation link
	 */
	async clickOpenApiLink(): Promise<void> {
		await this.openApiLink.first().click();
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

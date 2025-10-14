import { Page, Locator } from "@playwright/test";

export class HomePage {
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
	
	// ATM Services section
	readonly withdrawFundsLink: Locator;
	readonly transferFundsLink: Locator;
	readonly checkBalancesLink: Locator;
	readonly makeDepositsLink: Locator;
	
	// Online Services section
	readonly billPayLink: Locator;
	readonly accountHistoryLink: Locator;
	readonly transferFundsOnlineLink: Locator;
	
	// Latest News section
	readonly parabankReopenedLink: Locator;
	readonly onlineBillPayNewsLink: Locator;
	readonly onlineAccountTransfersNewsLink: Locator;
	
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
		
		// ATM Services section
		this.withdrawFundsLink = page.getByRole("link", { name: "Withdraw Funds" });
		this.transferFundsLink = page.getByRole("link", { name: "Transfer Funds" });
		this.checkBalancesLink = page.getByRole("link", { name: "Check Balances" });
		this.makeDepositsLink = page.getByRole("link", { name: "Make Deposits" });
		
		// Online Services section
		this.billPayLink = page.getByRole("link", { name: "Bill Pay" });
		this.accountHistoryLink = page.getByRole("link", { name: "Account History" });
		this.transferFundsOnlineLink = page.getByRole("link", { name: "Transfer Funds" });
		
		// Latest News section
		this.parabankReopenedLink = page.getByRole("link", { name: "ParaBank Is Now Re-Opened" });
		this.onlineBillPayNewsLink = page.getByRole("link", { name: "New! Online Bill Pay" });
		this.onlineAccountTransfersNewsLink = page.getByRole("link", { name: "New! Online Account Transfers" });
		
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
	 * Navigate to the ParaBank homepage
	 */
	async goto(): Promise<void> {
		await this.page.goto("/");
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

	/**
	 * Navigate to the registration page
	 */
	async goToRegister(): Promise<void> {
		await this.registerLink.click();
	}

	/**
	 * Navigate to the forgot login info page
	 */
	async goToForgotLoginInfo(): Promise<void> {
		await this.forgotLoginInfoLink.click();
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
	 * Navigate to admin page
	 */
	async goToAdminPage(): Promise<void> {
		await this.adminPageLink.click();
	}
}

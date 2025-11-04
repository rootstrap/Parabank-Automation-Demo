import { Page, Locator } from "@playwright/test";

export class BillPayPage {
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
	
	// Bill Payment form elements
	readonly pageTitle: Locator;
	readonly payeeNameField: Locator;
	readonly payeeAddressField: Locator;
	readonly payeeCityField: Locator;
	readonly payeeStateField: Locator;
	readonly payeeZipCodeField: Locator;
	readonly payeePhoneField: Locator;
	readonly payeeAccountNumberField: Locator;
	readonly verifyAccountField: Locator;
	readonly amountField: Locator;
	readonly fromAccountDropdown: Locator;
	readonly sendPaymentButton: Locator;
	
	// Success page elements
	readonly paymentCompleteHeading: Locator;
	readonly paymentAmount: Locator;
	
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
		
		// Bill Payment form elements
		this.pageTitle = page.getByRole("heading", { name: "Bill Payment Service" });
		this.payeeNameField = page.locator('input[name="payee.name"]');
		this.payeeAddressField = page.locator('input[name="payee.address.street"]');
		this.payeeCityField = page.locator('input[name="payee.address.city"]');
		this.payeeStateField = page.locator('input[name="payee.address.state"]');
		this.payeeZipCodeField = page.locator('input[name="payee.address.zipCode"]');
		this.payeePhoneField = page.locator('input[name="payee.phoneNumber"]');
		this.payeeAccountNumberField = page.locator('input[name="payee.accountNumber"]');
		this.verifyAccountField = page.locator('input[name="verifyAccount"]');
		this.amountField = page.locator('input[name="amount"]');
		this.fromAccountDropdown = page.locator('#fromAccountId');
		this.sendPaymentButton = page.locator('input[value="Send Payment"]');
		
		// Success page elements
		this.paymentCompleteHeading = page.locator('h1:has-text("Bill Payment Complete")');
		this.paymentAmount = page.locator('span#amount');
		
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
	 * Navigate to the Bill Pay page
	 */
	async goto(): Promise<void> {
		await this.page.goto("/billpay.htm");
	}

	/**
	 * Fill in complete payee information
	 * @param payeeData - Object containing payee information
	 */
	async fillPayeeInformation(payeeData: {
		name: string;
		address: string;
		city: string;
		state: string;
		zipCode: string;
		phone: string;
		accountNumber: string;
	}): Promise<void> {
		await this.payeeNameField.fill(payeeData.name);
		await this.payeeAddressField.fill(payeeData.address);
		await this.payeeCityField.fill(payeeData.city);
		await this.payeeStateField.fill(payeeData.state);
		await this.payeeZipCodeField.fill(payeeData.zipCode);
		await this.payeePhoneField.fill(payeeData.phone);
		await this.payeeAccountNumberField.fill(payeeData.accountNumber);
		await this.verifyAccountField.fill(payeeData.accountNumber);
	}

	/**
	 * Complete the bill payment process
	 * @param payeeData - Payee information
	 * @param amount - Amount to pay
	 * @param fromAccountId - Optional account ID to pay from (defaults to first account)
	 */
	async submitPayment(payeeData: {
		name: string;
		address: string;
		city: string;
		state: string;
		zipCode: string;
		phone: string;
		accountNumber: string;
	}, amount: string, fromAccountId?: string): Promise<void> {
		await this.fillPayeeInformation(payeeData);
		await this.amountField.fill(amount);
		
		// Wait for accounts to load
		await this.page.waitForTimeout(500);
		
		// Select from account if specified
		if (fromAccountId) {
			await this.fromAccountDropdown.selectOption(fromAccountId);
		}
		
		await this.sendPaymentButton.click();
		await this.page.waitForLoadState('networkidle', { timeout: 10000 });
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


import { Page, Locator, expect } from "@playwright/test";

export class HeaderFooter {
	readonly page: Page;
	readonly brandLink: Locator;
	readonly cartLink: Locator;
	readonly userMenuButton: Locator;
	readonly orderHistoryLink: Locator;
	readonly contactUsFooter: Locator;
	readonly faqsFooter: Locator;
	readonly ourClientsFooter: Locator;

	constructor(page: Page) {
		this.page = page;
		this.brandLink = page.getByRole("link", {
			name: "Company brand clickable to go back to homepage",
		});
		this.cartLink = page.getByRole("link", { name: /cart/i });
		this.userMenuButton = page.getByRole("button", {
			name: /Test User|Order History/,
		});
		this.orderHistoryLink = page.getByRole("link", { name: "Order History" });
		this.contactUsFooter = page.getByRole("link", { name: "Contact us" });
		this.faqsFooter = page.getByRole("link", { name: "FAQs" });
		this.ourClientsFooter = page.getByRole("link", { name: "Our clients" });
	}

	async openHome(): Promise<void> {
		await this.brandLink.click();
	}

	async openCart(): Promise<void> {
		await this.cartLink.click();
	}

	async openOrderHistory(): Promise<void> {
		const visible = await this.userMenuButton.isVisible().catch(() => false);
		if (visible) {
			await this.userMenuButton.click();
			await this.orderHistoryLink.click();
			return;
		}
		await this.page.goto("/my-account/order-history");
	}

	async exploreFooter(): Promise<void> {
		await expect(this.contactUsFooter).toBeVisible();
		await expect(this.faqsFooter).toBeVisible();
		await expect(this.ourClientsFooter).toBeVisible();
	}

	async logout(): Promise<void> {
		await this.userMenuButton.click();
		await this.page
			.locator('p[role="button"]')
			.filter({ hasText: "Log Out" })
			.click();
	}
}

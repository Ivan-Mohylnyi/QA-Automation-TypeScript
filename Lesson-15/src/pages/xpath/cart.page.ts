import { Locator, Page } from '@playwright/test';

export class CartPageXpath {
    public get productNames(): Locator {
        return this.page.locator('xpath=//td[contains(@class,"cart_description")]//h4/a');
    }

    public get removeButtons(): Locator {
        return this.page.locator('xpath=//a[contains(@class,"cart_quantity_delete")]');
    }

    public constructor(private readonly page: Page) {}

    public async goTo(): Promise<void> {
        await this.page.goto('https://automationexercise.com/view_cart', { waitUntil: 'domcontentloaded' });
    }

    // Finds the total-price cell by the *sibling* product name in the same row - a relational
    // lookup CSS alone cannot express, since CSS can't select an ancestor/sibling based on content.
    public getTotalPriceForProduct(productName: string): Locator {
        return this.page.locator(`xpath=//tr[.//h4/a[text()="${productName}"]]//td[@class="cart_total"]//p`);
    }
}

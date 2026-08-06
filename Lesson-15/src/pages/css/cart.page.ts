import { Locator, Page } from '@playwright/test';

export class CartPageCss {
    public get productNames(): Locator {
        return this.page.locator('.cart_description h4 a');
    }

    public get removeButtons(): Locator {
        return this.page.locator('.cart_quantity_delete');
    }

    public constructor(private readonly page: Page) {}

    public async goTo(): Promise<void> {
        await this.page.goto('https://automationexercise.com/view_cart', { waitUntil: 'domcontentloaded' });
    }
}

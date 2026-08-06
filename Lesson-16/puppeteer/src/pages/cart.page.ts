import { Locator, Page } from 'puppeteer';

export class CartPage {
    private get productNames(): Locator<Element> {
        return this.page.locator('.cart_description h4 a');
    }

    public constructor(private page: Page) {}

    public async getFirstProductName(): Promise<string> {
        const handle = await this.productNames.waitHandle();
        const text = await handle.evaluate((el) => el.textContent ?? '');
        return text.trim();
    }
}

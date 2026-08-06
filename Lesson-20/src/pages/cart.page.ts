import { Locator, Page } from 'playwright';

export class CartPage {
    public get productNames(): Locator {
        return this.page.locator('#cart_info tbody tr .cart_description h4 a');
    }

    public constructor(private readonly page: Page) {}

    public async getProductNames(): Promise<string[]> {
        return this.productNames.allInnerTexts();
    }
}

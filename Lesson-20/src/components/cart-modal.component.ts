import { Locator, Page } from 'playwright';

export class CartModalComponent {
    private get baseLocator(): Locator {
        return this.page.locator('#cartModal');
    }

    private get title(): Locator {
        return this.baseLocator.locator('.modal-title');
    }

    private get viewCartLink(): Locator {
        return this.baseLocator.locator('a[href="/view_cart"]');
    }

    public constructor(private readonly page: Page) {}

    public async waitFor(): Promise<void> {
        await this.baseLocator.waitFor({ state: 'visible' });
    }

    public async getTitle(): Promise<string> {
        return (await this.title.innerText()).trim();
    }

    public async viewCart(): Promise<void> {
        await this.viewCartLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}

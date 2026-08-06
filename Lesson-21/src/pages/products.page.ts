import { Locator, Page } from '@playwright/test';
import { CartModalComponent, ProductCardComponent } from '../components';

export class ProductsPage {
    public readonly cartModal: CartModalComponent;

    public get searchInput(): Locator {
        return this.page.locator('#search_product');
    }

    public get searchButton(): Locator {
        return this.page.locator('#submit_search');
    }

    public get categoryPageTitle(): Locator {
        return this.page.locator('h2.title');
    }

    private get productCardLocators(): Locator {
        return this.page.locator('.product-image-wrapper');
    }

    public constructor(private page: Page) {
        this.cartModal = new CartModalComponent(page);
    }

    public async goTo(): Promise<void> {
        await this.page.goto('/products', { waitUntil: 'domcontentloaded' });
        await this.searchInput.waitFor();
    }

    public async searchForProduct(text: string): Promise<void> {
        await this.searchInput.fill(text);
        await this.searchButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    public async openWomenDressCategory(): Promise<void> {
        await this.page.locator('a[href="#Women"]').click();
        await this.page.locator('a[href="/category_products/1"]').click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    public async getProductCardCount(): Promise<number> {
        return this.productCardLocators.count();
    }

    public getProductCard(index: number): ProductCardComponent {
        return new ProductCardComponent(this.productCardLocators.nth(index));
    }
}

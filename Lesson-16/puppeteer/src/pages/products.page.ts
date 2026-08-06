import { Locator, Page } from 'puppeteer';

export class ProductsPage {
    private get searchInput(): Locator<Element> {
        return this.page.locator('#search_product');
    }

    private get searchButton(): Locator<Element> {
        return this.page.locator('#submit_search');
    }

    private get productCards(): Locator<Element> {
        return this.page.locator('.product-image-wrapper');
    }

    private get firstAddToCartButton(): Locator<Element> {
        return this.page.locator('.product-image-wrapper a.add-to-cart');
    }

    private get cartModalViewCartLink(): Locator<Element> {
        return this.page.locator('#cartModal a[href="/view_cart"]');
    }

    public constructor(private page: Page) {}

    public async goTo(): Promise<void> {
        await this.page.goto('https://automationexercise.com/products');
        await this.searchInput.wait();
    }

    public async searchForProduct(text: string): Promise<void> {
        await this.searchInput.fill(text);
        await this.searchButton.click();
        await this.productCards.wait();
    }

    public async addFirstResultToCart(): Promise<void> {
        await this.productCards.hover();
        await this.firstAddToCartButton.click();
    }

    public async viewCart(): Promise<void> {
        await this.cartModalViewCartLink.wait();
        await this.cartModalViewCartLink.click();
    }
}

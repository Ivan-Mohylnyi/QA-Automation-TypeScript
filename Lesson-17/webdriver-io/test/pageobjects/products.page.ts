import { $, browser } from '@wdio/globals';
import { ChainablePromiseElement } from 'webdriverio';

export class ProductsPage {
    public get searchInput(): ChainablePromiseElement {
        return $('#search_product');
    }

    public get searchButton(): ChainablePromiseElement {
        return $('#submit_search');
    }

    public get firstProductCard(): ChainablePromiseElement {
        return $('.product-image-wrapper');
    }

    public get firstAddToCartButton(): ChainablePromiseElement {
        return $('.product-image-wrapper a.add-to-cart');
    }

    public get cartModalViewCartLink(): ChainablePromiseElement {
        return $('#cartModal a[href="/view_cart"]');
    }

    public async goTo(): Promise<void> {
        await browser.url('/products');
        await this.searchInput.waitForDisplayed();
    }

    public async searchForProduct(text: string): Promise<void> {
        await this.searchInput.setValue(text);
        await this.searchButton.click();
        await this.firstProductCard.waitForDisplayed();
    }

    public async addFirstResultToCart(): Promise<void> {
        await this.firstProductCard.moveTo();
        await this.firstAddToCartButton.click();
    }

    public async viewCart(): Promise<void> {
        await this.cartModalViewCartLink.waitForClickable();
        await this.cartModalViewCartLink.click();
    }
}

import { Locator } from '@playwright/test';

export class ProductCardComponent {
    private get name(): Locator {
        return this.baseLocator.locator('.productinfo p');
    }

    private get price(): Locator {
        return this.baseLocator.locator('.productinfo h2');
    }

    private get addToCartButton(): Locator {
        // Each card renders "Add to cart" twice (a static one and a hover-overlay one) with
        // identical markup, so this must be pinned to the first match.
        return this.baseLocator.locator('a.add-to-cart').first();
    }

    private get viewProductLink(): Locator {
        return this.baseLocator.locator('a[href^="/product_details/"]').first();
    }

    public constructor(private readonly baseLocator: Locator) {}

    public async getName(): Promise<string> {
        return (await this.name.innerText()).trim();
    }

    public async getPrice(): Promise<string> {
        return (await this.price.innerText()).trim();
    }

    public async addToCart(): Promise<void> {
        await this.baseLocator.hover();
        await this.addToCartButton.click();
    }

    public async getDetailsUrl(): Promise<string> {
        const href = await this.viewProductLink.getAttribute('href');
        if (!href) {
            throw new Error('Product details link href is missing on this product card');
        }

        return href;
    }
}

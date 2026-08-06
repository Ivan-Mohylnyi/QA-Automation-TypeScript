import { Locator } from 'playwright';

export class ProductCardComponent {
    private get name(): Locator {
        return this.baseLocator.locator('.productinfo p');
    }

    private get addToCartButton(): Locator {
        // Each card renders "Add to cart" twice (a static one and a hover-overlay one) with
        // identical markup, so this must be pinned to the first match.
        return this.baseLocator.locator('a.add-to-cart').first();
    }

    public constructor(private readonly baseLocator: Locator) {}

    public async getName(): Promise<string> {
        return (await this.name.innerText()).trim();
    }

    public async addToCart(): Promise<void> {
        await this.baseLocator.hover();
        await this.addToCartButton.click();
    }
}

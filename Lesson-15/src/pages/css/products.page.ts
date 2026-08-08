import { Locator, Page } from '@playwright/test';

export class ProductsPageCss {
    public get searchInput(): Locator {
        return this.page.locator('#search_product');
    }

    public get searchButton(): Locator {
        return this.page.locator('#submit_search');
    }

    public get productCards(): Locator {
        return this.page.locator('.product-image-wrapper');
    }

    public get womenCategoryToggle(): Locator {
        return this.page.locator('a[href="#Women"]');
    }

    public get womenDressCategoryLink(): Locator {
        return this.page.locator('a[href="/category_products/1"]');
    }

    public get bibaBrandLink(): Locator {
        return this.page.locator('a[href="/brand_products/Biba"]');
    }

    // Each card renders "Add to cart" twice (static + hover-overlay), so real usage needs .first().
    public get addToCartButtons(): Locator {
        return this.page.locator('a.add-to-cart');
    }

    public get cartModalContinueShoppingButton(): Locator {
        return this.page.locator('#cartModal .btn-success');
    }

    public get cartModalViewCartLink(): Locator {
        return this.page.locator('#cartModal a[href="/view_cart"]');
    }

    public constructor(private readonly page: Page) {}

    public async goTo(): Promise<void> {
        await this.page.goto('https://automationexercise.com/products', { waitUntil: 'domcontentloaded' });
    }

    public async searchForProduct(text: string): Promise<void> {
        await this.searchInput.fill(text);
        await this.searchButton.click();
    }
}

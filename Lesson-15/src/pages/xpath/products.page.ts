import { Locator, Page } from '@playwright/test';

export class ProductsPageXpath {
    public get searchInput(): Locator {
        return this.page.locator('xpath=//input[@id="search_product"]');
    }

    public get searchButton(): Locator {
        return this.page.locator('xpath=//button[@id="submit_search"]');
    }

    public get productCards(): Locator {
        return this.page.locator('xpath=//div[contains(@class,"product-image-wrapper")]');
    }

    public get womenCategoryToggle(): Locator {
        return this.page.locator('xpath=//a[@href="#Women"]');
    }

    // Scoped inside the Women accordion section - something CSS alone can't express without :has().
    public get womenDressCategoryLink(): Locator {
        return this.page.locator('xpath=//div[@id="Women"]//a[contains(@href,"category_products/1")]');
    }

    public get bibaBrandLink(): Locator {
        return this.page.locator('xpath=//a[contains(@href,"brand_products/Biba")]');
    }

    // Positional predicate picks the first match directly in the XPath expression itself.
    public get firstAddToCartButton(): Locator {
        return this.page.locator('xpath=(//a[contains(@class,"add-to-cart")])[1]');
    }

    public get cartModalContinueShoppingButton(): Locator {
        return this.page.locator('xpath=//div[@id="cartModal"]//button[contains(@class,"btn-success")]');
    }

    public get cartModalViewCartLink(): Locator {
        return this.page.locator('xpath=//div[@id="cartModal"]//a[@href="/view_cart"]');
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

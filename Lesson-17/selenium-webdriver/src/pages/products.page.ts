import { By, WebDriver, WebElementPromise } from 'selenium-webdriver';
import { getInteractableElement, getWaitedLocator } from '../web-driver-handler';

export class ProductsPage {
    private get searchInput(): WebElementPromise {
        return getWaitedLocator(this.driver, By.css('#search_product'));
    }

    private get searchButton(): WebElementPromise {
        return getWaitedLocator(this.driver, By.css('#submit_search'));
    }

    private get firstProductCard(): WebElementPromise {
        return getWaitedLocator(this.driver, By.css('.product-image-wrapper'));
    }

    private get firstAddToCartButton(): WebElementPromise {
        return getWaitedLocator(this.driver, By.css('.product-image-wrapper a.add-to-cart'));
    }

    private get cartModalViewCartLink(): WebElementPromise {
        return getInteractableElement(this.driver, By.css('#cartModal a[href="/view_cart"]'));
    }

    public constructor(private driver: WebDriver) {}

    public async goTo(): Promise<void> {
        await this.driver.get('https://automationexercise.com/products');
        await this.searchInput;
    }

    public async searchForProduct(text: string): Promise<void> {
        await this.searchInput.sendKeys(text);
        await this.searchButton.click();
        await this.firstProductCard;
    }

    public async addFirstResultToCart(): Promise<void> {
        const card = await this.firstProductCard;
        await this.driver.actions().move({ origin: card }).perform();
        await this.firstAddToCartButton.click();
    }

    public async viewCart(): Promise<void> {
        await this.cartModalViewCartLink.click();
    }
}

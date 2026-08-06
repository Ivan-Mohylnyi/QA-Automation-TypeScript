import { By, WebDriver, WebElementPromise } from 'selenium-webdriver';
import { getWaitedLocator } from '../web-driver-handler';

export class CartPage {
    private get firstProductName(): WebElementPromise {
        return getWaitedLocator(this.driver, By.css('.cart_description h4 a'));
    }

    public constructor(private driver: WebDriver) {}

    public async getFirstProductName(): Promise<string> {
        return this.firstProductName.getText();
    }
}

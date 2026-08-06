import { By, WebDriver, WebElementPromise } from 'selenium-webdriver';
import { getWaitedLocator } from '../web-driver-handler';

export class HomePage {
    // Real typo in the site's own markup - "susbscribe", not "subscribe".
    private get newsletterEmailInput(): WebElementPromise {
        return getWaitedLocator(this.driver, By.css('#susbscribe_email'));
    }

    private get newsletterSubscribeButton(): WebElementPromise {
        return getWaitedLocator(this.driver, By.css('#subscribe'));
    }

    private get newsletterSuccessBanner(): WebElementPromise {
        return getWaitedLocator(this.driver, By.css('#success-subscribe'));
    }

    public constructor(private driver: WebDriver) {}

    public async goTo(): Promise<void> {
        await this.driver.get('https://automationexercise.com/');
    }

    public async subscribeToNewsletter(email: string): Promise<void> {
        await this.newsletterEmailInput.sendKeys(email);
        await this.newsletterSubscribeButton.click();
    }

    public async getSubscribeSuccessText(): Promise<string> {
        return this.newsletterSuccessBanner.getText();
    }
}

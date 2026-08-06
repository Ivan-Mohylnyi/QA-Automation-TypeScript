import { Locator, Page } from 'puppeteer';

export class HomePage {
    // Real typo in the site's own markup - "susbscribe", not "subscribe".
    private get newsletterEmailInput(): Locator<Element> {
        return this.page.locator('#susbscribe_email');
    }

    private get newsletterSubscribeButton(): Locator<Element> {
        return this.page.locator('#subscribe');
    }

    private get newsletterSuccessBanner(): Locator<Element> {
        return this.page.locator('#success-subscribe');
    }

    public constructor(private page: Page) {}

    public async goTo(): Promise<void> {
        await this.page.goto('https://automationexercise.com/');
    }

    public async subscribeToNewsletter(email: string): Promise<void> {
        await this.newsletterEmailInput.fill(email);
        await this.newsletterSubscribeButton.click();
    }

    public async getSubscribeSuccessText(): Promise<string> {
        const handle = await this.newsletterSuccessBanner.waitHandle();
        const text = await handle.evaluate((el) => el.textContent ?? '');
        return text.trim();
    }
}

import { Locator, Page } from '@playwright/test';

export class HomePageXpath {
    public get recommendedItemsCarousel(): Locator {
        return this.page.locator('xpath=//*[@id="recommended-item-carousel"]');
    }

    // Combining two class conditions in one predicate - CSS needs two chained class selectors instead.
    public get recommendedItemsNextArrow(): Locator {
        return this.page.locator('xpath=//a[contains(@class,"recommended-item-control") and contains(@class,"right")]');
    }

    public get recommendedItemsPreviousArrow(): Locator {
        return this.page.locator('xpath=//a[contains(@class,"recommended-item-control") and contains(@class,"left")]');
    }

    public get recommendedItemCards(): Locator {
        return this.page.locator('xpath=//div[contains(@class,"recommended_items")]//div[contains(@class,"product-image-wrapper")]');
    }

    public get newsletterEmailInput(): Locator {
        return this.page.locator('xpath=//input[@id="susbscribe_email"]');
    }

    public get newsletterSubscribeButton(): Locator {
        return this.page.locator('xpath=//button[@id="subscribe"]');
    }

    public get newsletterSuccessBanner(): Locator {
        return this.page.locator('xpath=//*[@id="success-subscribe"]');
    }

    public constructor(private readonly page: Page) {}

    public async goTo(): Promise<void> {
        await this.page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
    }

    public async subscribeToNewsletter(email: string): Promise<void> {
        await this.newsletterEmailInput.fill(email);
        await this.newsletterSubscribeButton.click();
    }
}

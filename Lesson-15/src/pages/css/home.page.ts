import { Locator, Page } from '@playwright/test';

export class HomePageCss {
    public get recommendedItemsCarousel(): Locator {
        return this.page.locator('#recommended-item-carousel');
    }

    public get recommendedItemsNextArrow(): Locator {
        return this.page.locator('.recommended-item-control.right');
    }

    public get recommendedItemsPreviousArrow(): Locator {
        return this.page.locator('.recommended-item-control.left');
    }

    public get recommendedItemCards(): Locator {
        return this.page.locator('.recommended_items .product-image-wrapper');
    }

    // Real typo in the site's own markup - "susbscribe", not "subscribe".
    public get newsletterEmailInput(): Locator {
        return this.page.locator('#susbscribe_email');
    }

    public get newsletterSubscribeButton(): Locator {
        return this.page.locator('#subscribe');
    }

    public get newsletterSuccessBanner(): Locator {
        return this.page.locator('#success-subscribe');
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

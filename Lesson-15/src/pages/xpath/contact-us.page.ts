import { Locator, Page } from '@playwright/test';

export class ContactUsPageXpath {
    public get nameInput(): Locator {
        return this.page.locator('xpath=//input[@data-qa="name"]');
    }

    public get emailInput(): Locator {
        return this.page.locator('xpath=//input[@data-qa="email"]');
    }

    public get subjectInput(): Locator {
        return this.page.locator('xpath=//input[@data-qa="subject"]');
    }

    public get messageTextarea(): Locator {
        return this.page.locator('xpath=//textarea[@data-qa="message"]');
    }

    public get submitButton(): Locator {
        return this.page.locator('xpath=//input[@data-qa="submit-button"]');
    }

    public get successBanner(): Locator {
        return this.page.locator('xpath=//div[contains(@class,"alert-success")]');
    }

    public constructor(private readonly page: Page) {}

    public async goTo(): Promise<void> {
        await this.page.goto('https://automationexercise.com/contact_us', { waitUntil: 'domcontentloaded' });
    }

    public async fillForm(name: string, email: string, subject: string, message: string): Promise<void> {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageTextarea.fill(message);
    }
}

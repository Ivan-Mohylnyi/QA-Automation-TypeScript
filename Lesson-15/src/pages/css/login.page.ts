import { Locator, Page } from '@playwright/test';

export class LoginPageCss {
    public get loginEmailInput(): Locator {
        return this.page.locator('input[data-qa="login-email"]');
    }

    public get loginPasswordInput(): Locator {
        return this.page.locator('input[data-qa="login-password"]');
    }

    public get loginButton(): Locator {
        return this.page.locator('button[data-qa="login-button"]');
    }

    public get signupNameInput(): Locator {
        return this.page.locator('input[data-qa="signup-name"]');
    }

    public get signupEmailInput(): Locator {
        return this.page.locator('input[data-qa="signup-email"]');
    }

    public get signupButton(): Locator {
        return this.page.locator('button[data-qa="signup-button"]');
    }

    public get accountInfoHeading(): Locator {
        return this.page.locator('b', { hasText: 'Enter Account Information' });
    }

    public constructor(private readonly page: Page) {}

    public async goTo(): Promise<void> {
        await this.page.goto('https://automationexercise.com/login', { waitUntil: 'domcontentloaded' });
    }

    public async startSignup(name: string, email: string): Promise<void> {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupButton.click();
    }

    public async login(email: string, password: string): Promise<void> {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginButton.click();
    }
}

import { $, browser } from '@wdio/globals';
import { ChainablePromiseElement } from 'webdriverio';

export class HomePage {
    // Real typo in the site's own markup - "susbscribe", not "subscribe".
    public get newsletterEmailInput(): ChainablePromiseElement {
        return $('#susbscribe_email');
    }

    public get newsletterSubscribeButton(): ChainablePromiseElement {
        return $('#subscribe');
    }

    public get newsletterSuccessBanner(): ChainablePromiseElement {
        return $('#success-subscribe');
    }

    public async goTo(): Promise<void> {
        await browser.url('/');
    }

    public async subscribeToNewsletter(email: string): Promise<void> {
        await this.newsletterEmailInput.setValue(email);
        await this.newsletterSubscribeButton.click();
    }
}

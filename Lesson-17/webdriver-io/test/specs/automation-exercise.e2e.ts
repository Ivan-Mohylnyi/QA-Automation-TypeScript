import { expect } from 'expect-webdriverio';
import { ProductsPage } from '../pageobjects/products.page';
import { CartPage } from '../pageobjects/cart.page';
import { HomePage } from '../pageobjects/home.page';

describe('automationexercise.com - Lesson 15 test cases (TC1, TC5) on WebdriverIO', () => {
    it('TC1: search for a product and add the first result to the cart', async () => {
        const productsPage = new ProductsPage();
        const cartPage = new CartPage();

        await productsPage.goTo();
        await productsPage.searchForProduct('Dress');
        await productsPage.addFirstResultToCart();
        await productsPage.viewCart();

        await expect(cartPage.firstProductName).toHaveText('Dress', { containing: true });
    });

    it('TC5: subscribe to the newsletter from the footer', async () => {
        const homePage = new HomePage();

        await homePage.goTo();
        await homePage.subscribeToNewsletter(`qa-lesson17-wdio-${Date.now()}@example.com`);

        await expect(homePage.newsletterSuccessBanner).toHaveText('successfully subscribed', { containing: true });
    });
});

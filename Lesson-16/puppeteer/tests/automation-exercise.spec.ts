import puppeteer, { Browser, Page } from 'puppeteer';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { ProductsPage } from '../src/pages/products.page';
import { CartPage } from '../src/pages/cart.page';
import { HomePage } from '../src/pages/home.page';

describe('automationexercise.com - Lesson 15 test cases (TC1, TC5) on Puppeteer', () => {
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true,
            defaultViewport: { width: 1600, height: 900 }
        });
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    });

    test('TC1: search for a product and add the first result to the cart', async () => {
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await productsPage.goTo();
        await productsPage.searchForProduct('Dress');
        await productsPage.addFirstResultToCart();
        await productsPage.viewCart();

        const cartProductName = await cartPage.getFirstProductName();
        expect(cartProductName).toContain('Dress');
    });

    test('TC5: subscribe to the newsletter from the footer', async () => {
        const homePage = new HomePage(page);

        await homePage.goTo();
        await homePage.subscribeToNewsletter(`qa-lesson16-puppeteer-${Date.now()}@example.com`);

        const successText = await homePage.getSubscribeSuccessText();
        expect(successText).toContain('successfully subscribed');
    });
});

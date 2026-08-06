import { WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import { closeDriver, getBrowserInstance } from '../src/web-driver-handler';
import { ProductsPage } from '../src/pages/products.page';
import { CartPage } from '../src/pages/cart.page';
import { HomePage } from '../src/pages/home.page';

describe('automationexercise.com - Lesson 15 test cases (TC1, TC5) on Selenium WebDriver', () => {
    let driver: WebDriver;

    beforeEach(async () => {
        driver = await getBrowserInstance();
    });

    afterEach(async () => {
        await closeDriver(driver);
    });

    it('TC1: search for a product and add the first result to the cart', async () => {
        const productsPage = new ProductsPage(driver);
        const cartPage = new CartPage(driver);

        await productsPage.goTo();
        await productsPage.searchForProduct('Dress');
        await productsPage.addFirstResultToCart();
        await productsPage.viewCart();

        const cartProductName = await cartPage.getFirstProductName();
        expect(cartProductName).to.include('Dress');
    });

    it('TC5: subscribe to the newsletter from the footer', async () => {
        const homePage = new HomePage(driver);

        await homePage.goTo();
        await homePage.subscribeToNewsletter(`qa-lesson17-selenium-${Date.now()}@example.com`);

        const successText = await homePage.getSubscribeSuccessText();
        expect(successText).to.include('successfully subscribed');
    });
});

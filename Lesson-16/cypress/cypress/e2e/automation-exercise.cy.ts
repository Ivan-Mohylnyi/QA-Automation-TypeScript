import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';
import { HomePage } from '../pages/home.page';

describe('automationexercise.com - Lesson 15 test cases (TC1, TC5) on Cypress', () => {
    it('TC1: search for a product and add the first result to the cart', () => {
        const productsPage = new ProductsPage();
        const cartPage = new CartPage();

        productsPage.goTo();
        productsPage.searchForProduct('Dress');
        productsPage.addFirstResultToCart();
        productsPage.viewCart();
        cartPage.expectCartContainsProductMatching('Dress');
    });

    it('TC5: subscribe to the newsletter from the footer', () => {
        const homePage = new HomePage();

        homePage.goTo();
        homePage.subscribeToNewsletter(`qa-lesson16-cypress-${Date.now()}@example.com`);
        homePage.expectSubscribeSuccess();
    });
});

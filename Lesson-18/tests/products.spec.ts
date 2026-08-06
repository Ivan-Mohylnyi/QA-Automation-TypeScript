import { expect, test } from '../src/fixtures';

test.describe('automationexercise.com Products page', () => {
    test('should display multiple products on page load', async ({ productsPage }) => {
        await test.step('Open products page', async () => {
            await productsPage.goTo();
        });

        await test.step('Verify multiple product cards are shown', async () => {
            const count = await productsPage.productCards.count();
            expect(count).toBeGreaterThan(1);
        });
    });

    test('should show only matching products when searching', async ({ productsPage }) => {
        await test.step('Open products page and search', async () => {
            await productsPage.goTo();
            await productsPage.searchForProduct('Dress');
        });

        await test.step('Verify at least one result is shown', async () => {
            const count = await productsPage.productCards.count();
            expect(count).toBeGreaterThan(0);
        });
    });

    test('should filter to only Women - Dress products when a category is selected', async ({ productsPage }) => {
        await test.step('Open products page and pick a category', async () => {
            await productsPage.goTo();
            await productsPage.openWomenDressCategory();
        });

        await test.step('Verify the category heading and results', async () => {
            await expect(productsPage.categoryPageTitle).toContainText('Women - Dress Products');
            const count = await productsPage.productCards.count();
            expect(count).toBeGreaterThan(0);
        });
    });

    test('should add a product to the cart from the listing', async ({ productsPage, page }) => {
        await test.step('Open products page', async () => {
            await productsPage.goTo();
        });

        const firstProductName = (await productsPage.productNames.first().innerText()).trim();

        await test.step('Add the first product to the cart', async () => {
            await productsPage.addProductToCartByIndex(0);
            await productsPage.cartModalContinueButton.click();
        });

        await test.step('Verify the product appears in the cart', async () => {
            await page.goto('/view_cart', { waitUntil: 'domcontentloaded' });
            await expect(page.locator('.cart_description h4 a')).toContainText(firstProductName);
        });
    });
});

import { expect, test } from '../src/fixtures';

test.describe('automationexercise.com Products page (PageObjects + WebElements)', () => {
    test('should list product cards with a name and a price', async ({ productsPage }) => {
        await test.step('Open products page', async () => {
            await productsPage.goTo();
        });

        const count = await productsPage.getProductCardCount();
        expect(count).toBeGreaterThan(1);

        await test.step('Verify the first card has a name and a price', async () => {
            const firstCard = productsPage.getProductCard(0);
            expect(await firstCard.getName()).not.toBe('');
            expect(await firstCard.getPrice()).toMatch(/^Rs\. \d+$/);
        });
    });

    test('should add a product to the cart and show a matching confirmation modal', async ({ productsPage }) => {
        await test.step('Open products page', async () => {
            await productsPage.goTo();
        });

        const firstCard = productsPage.getProductCard(0);

        await test.step('Add the first product to the cart', async () => {
            await firstCard.addToCart();
            await productsPage.cartModal.waitFor();
        });

        await test.step('Verify the confirmation modal and close it', async () => {
            expect(await productsPage.cartModal.getTitle()).toBe('Added!');
            await productsPage.cartModal.continueShopping();
        });
    });

    test('should navigate from a product card to its details page with a matching name', async ({ productsPage, page }) => {
        await test.step('Open products page', async () => {
            await productsPage.goTo();
        });

        const firstCard = productsPage.getProductCard(0);
        const expectedName = await firstCard.getName();
        const detailsUrl = await firstCard.getDetailsUrl();

        await test.step('Open the product details page', async () => {
            await page.goto(detailsUrl, { waitUntil: 'domcontentloaded' });
        });

        await test.step('Verify the product name matches the card', async () => {
            await expect(page.locator('.product-information h2')).toHaveText(expectedName);
        });
    });

    test('should show only Women - Dress products when a category is selected', async ({ productsPage }) => {
        await test.step('Open products page and pick a category', async () => {
            await productsPage.goTo();
            await productsPage.openWomenDressCategory();
        });

        await test.step('Verify the category heading and results', async () => {
            await expect(productsPage.categoryPageTitle).toContainText('Women - Dress Products');
            const count = await productsPage.getProductCardCount();
            expect(count).toBeGreaterThan(0);
        });
    });
});

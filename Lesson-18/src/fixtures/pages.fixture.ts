import { test as base } from '@playwright/test';
import { ProductsPage } from '../pages';

export interface PagesFixture {
    productsPage: ProductsPage;
}

export const test = base.extend<PagesFixture>({
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    }
});

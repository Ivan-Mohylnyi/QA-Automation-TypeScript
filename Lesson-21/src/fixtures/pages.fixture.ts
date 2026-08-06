import { test as base } from '@playwright/test';
import { ProductsPage } from '../pages';

export interface PagesFixture {
    productsPage: ProductsPage;
}

// productsPage wraps a Playwright `page`, which is inherently per-test - there is no
// meaningful worker-scoped version of it (unlike a stateless API client/config service).
export const test = base.extend<PagesFixture>({
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    }
});

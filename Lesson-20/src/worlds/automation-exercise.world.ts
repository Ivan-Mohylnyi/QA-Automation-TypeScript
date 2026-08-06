import { IWorldOptions, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from 'playwright';
import { CartPage, ProductsPage } from '../pages';

export class AutomationExerciseWorld extends World {
    public static browser: Browser;
    public browserContext!: BrowserContext;
    public page!: Page;
    public scenarioContext: Map<string, unknown> = new Map<string, unknown>();

    public get productsPage(): ProductsPage {
        if (!this._productsPage) {
            this._productsPage = new ProductsPage(this.page);
        }
        return this._productsPage;
    }

    public get cartPage(): CartPage {
        if (!this._cartPage) {
            this._cartPage = new CartPage(this.page);
        }
        return this._cartPage;
    }

    private _productsPage!: ProductsPage;
    private _cartPage!: CartPage;

    public constructor(options: IWorldOptions) {
        super(options);
    }
}

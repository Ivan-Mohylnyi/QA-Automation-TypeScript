import { $ } from '@wdio/globals';
import { ChainablePromiseElement } from 'webdriverio';

export class CartPage {
    public get firstProductName(): ChainablePromiseElement {
        return $('.cart_description h4 a');
    }
}

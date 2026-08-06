import { Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { AutomationExerciseWorld } from '../worlds/automation-exercise.world';

When('the user adds the first listed product to the cart', async function (this: AutomationExerciseWorld) {
    const firstCard = this.productsPage.getProductCard(0);
    this.scenarioContext.set('addedProductName', await firstCard.getName());

    await firstCard.addToCart();
    await this.productsPage.cartModal.waitFor();
});

Then('a {string} confirmation modal should be shown', async function (this: AutomationExerciseWorld, expectedTitle: string) {
    expect(await this.productsPage.cartModal.getTitle()).to.equal(expectedTitle);
});

Then('the added product should appear in the cart', async function (this: AutomationExerciseWorld) {
    const expectedName = this.scenarioContext.get('addedProductName') as string;

    await this.productsPage.cartModal.viewCart();
    const cartProductNames = await this.cartPage.getProductNames();

    expect(cartProductNames.map((name) => name.trim())).to.include(expectedName);
});

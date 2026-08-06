import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { AutomationExerciseWorld } from '../worlds/automation-exercise.world';

Given('the user is on the products page', async function (this: AutomationExerciseWorld) {
    await this.productsPage.goTo();
});

When('the user searches for product {string}', async function (this: AutomationExerciseWorld, keyword: string) {
    await this.productsPage.searchForProduct(keyword);
});

When('the user filters by {string} category {int}', async function (this: AutomationExerciseWorld, group: string, categoryId: number) {
    await this.productsPage.openCategory(group, categoryId);
});

Then('the category heading should be {string}', async function (this: AutomationExerciseWorld, expectedHeading: string) {
    const actualHeading = ((await this.productsPage.categoryPageTitle.textContent()) ?? '').trim();
    expect(actualHeading).to.equal(expectedHeading);
});

Then('the search results should contain at least {int} product', async function (this: AutomationExerciseWorld, minimumCount: number) {
    const count = await this.productsPage.getProductCardCount();
    expect(count).to.be.at.least(minimumCount);
});

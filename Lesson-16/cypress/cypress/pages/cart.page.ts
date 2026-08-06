export class CartPage {
    private get productNames(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('.cart_description h4 a');
    }

    public expectCartContainsProductMatching(text: string): void {
        this.productNames.first().should('contain.text', text);
    }
}

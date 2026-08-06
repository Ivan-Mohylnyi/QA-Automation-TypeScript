export class HomePage {
    // Real typo in the site's own markup - "susbscribe", not "subscribe".
    private get newsletterEmailInput(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#susbscribe_email');
    }

    private get newsletterSubscribeButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#subscribe');
    }

    private get newsletterSuccessBanner(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#success-subscribe');
    }

    public goTo(): void {
        cy.visit('/');
    }

    public subscribeToNewsletter(email: string): void {
        this.newsletterEmailInput.type(email);
        this.newsletterSubscribeButton.click();
    }

    public expectSubscribeSuccess(): void {
        this.newsletterSuccessBanner.should('be.visible').and('contain.text', 'successfully subscribed');
    }
}

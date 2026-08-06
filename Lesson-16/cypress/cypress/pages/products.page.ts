export class ProductsPage {
    private get searchInput(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#search_product');
    }

    private get searchButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#submit_search');
    }

    private get productCards(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('.product-image-wrapper');
    }

    private get firstAddToCartButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return this.productCards.first().find('a.add-to-cart').first();
    }

    private get cartModalViewCartLink(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#cartModal a[href="/view_cart"]');
    }

    public goTo(): void {
        cy.visit('/products');
        this.searchInput.should('be.visible');
    }

    public searchForProduct(text: string): void {
        this.searchInput.type(text);
        this.searchButton.click();
        this.productCards.should('have.length.greaterThan', 0);
    }

    public addFirstResultToCart(): void {
        this.productCards.first().trigger('mouseover');
        this.firstAddToCartButton.click({ force: true });
    }

    public viewCart(): void {
        this.cartModalViewCartLink.should('be.visible').click();
    }
}

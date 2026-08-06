Feature: Product search

    As a shopper
    I want to search for products by keyword
    So that I can quickly find items I'm interested in

    Background:
        Given the user is on the products page

    Scenario: Searching for an existing keyword returns matching results
        When the user searches for product "Dress"
        Then the search results should contain at least 1 product

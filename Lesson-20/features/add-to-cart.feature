Feature: Add product to cart

    As a shopper
    I want to add a product to my cart
    So that I can purchase it later

    Background:
        Given the user is on the products page

    Scenario: Adding the first listed product shows a confirmation and appears in the cart
        When the user adds the first listed product to the cart
        Then a "Added!" confirmation modal should be shown
        And the added product should appear in the cart

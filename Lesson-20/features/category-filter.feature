Feature: Category filter

    Scenario Outline: Filtering by category shows only matching products
        Given the user is on the products page
        When the user filters by "<group>" category <categoryId>
        Then the category heading should be "<heading>"
        And the search results should contain at least 1 product

        Examples:
            | group | categoryId | heading                 |
            | Women | 1          | Women - Dress Products  |
            | Women | 2          | Women - Tops Products   |
            | Men   | 3          | Men - Tshirts Products  |

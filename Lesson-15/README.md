# Lesson 15 - UI Testing Basics

Selector-writing practice. Every selector below was checked against the site's real, live HTML (fetched directly), not guessed - and then verified a second time by turning them into actual Playwright locators (see below).

## 1. Chosen site

[automationexercise.com](https://automationexercise.com) rather than Rozetka (the assignment's own example): it has no bot-protection, and it's the same site already used for Lessons 18/19/20/21/final project, so its DOM is well understood and every selector here was cross-checked against real markup instead of assumed.

## 2. CSS selectors for elements the user interacts with

| Page | Element | CSS selector |
|------|---------|---------------|
| Products | Search input | `#search_product` |
| Products | Search button | `#submit_search` |
| Products | "Add to cart" on a product card | `a.add-to-cart` *(each card renders it twice - a static link and a hover-overlay one with identical markup, so real usage needs `:nth-of-type` / `.first()` to pick one)* |
| Products | "Women" category accordion toggle | `a[href="#Women"]` |
| Products | "Women -> Dress" category link | `a[href="/category_products/1"]` |
| Products | Brand filter link (e.g. Biba) | `a[href="/brand_products/Biba"]` |
| Login/Signup | Login email field | `input[data-qa="login-email"]` |
| Login/Signup | Login password field | `input[data-qa="login-password"]` |
| Login/Signup | Login button | `button[data-qa="login-button"]` |
| Login/Signup | Signup name field | `input[data-qa="signup-name"]` |
| Login/Signup | Signup email field | `input[data-qa="signup-email"]` |
| Login/Signup | Signup button | `button[data-qa="signup-button"]` |
| Contact Us | Name field | `input[data-qa="name"]` |
| Contact Us | Email field | `input[data-qa="email"]` |
| Contact Us | Subject field | `input[data-qa="subject"]` |
| Contact Us | Message textarea | `textarea[data-qa="message"]` |
| Contact Us | Submit button | `input[data-qa="submit-button"]` |
| Footer (every page) | Newsletter email field | `#susbscribe_email` *(that's a real typo in the site's own markup - "susbscribe", not "subscribe")* |
| Footer (every page) | Subscribe button | `#subscribe` |
| Footer (every page) | Subscribe success banner | `#success-subscribe` |
| Home | "Recommended items" carousel, next arrow | `.recommended-item-control.right` |
| Home | "Recommended items" carousel, previous arrow | `.recommended-item-control.left` |
| Cart | Product name in a cart row | `.cart_description h4 a` |
| Cart | Remove ("x") icon in a cart row | `.cart_quantity_delete` |
| Cart confirmation modal | "Continue Shopping" button | `#cartModal .btn-success` |
| Cart confirmation modal | "View Cart" link | `#cartModal a[href="/view_cart"]` |

## 3. XPath selectors for the same kind of elements

| Element | XPath |
|---------|-------|
| Search input | `//input[@id="search_product"]` |
| Search button | `//button[@id="submit_search"]` |
| First "Add to cart" link on the page | `(//a[contains(@class,"add-to-cart")])[1]` |
| "Women" category toggle | `//a[@href="#Women"]` |
| "Dress" link scoped inside the Women accordion section | `//div[@id="Women"]//a[contains(@href,"category_products/1")]` |
| Login email field | `//input[@data-qa="login-email"]` |
| Login button | `//button[@data-qa="login-button"]` |
| Signup name field | `//input[@data-qa="signup-name"]` |
| Contact Us message textarea | `//textarea[@data-qa="message"]` |
| Contact Us submit button | `//input[@data-qa="submit-button"]` |
| "Cart" nav link, matched by its visible text | `//a[contains(text(),"Cart")]` |
| Newsletter email field | `//input[@id="susbscribe_email"]` |
| Total-price cell in the cart row for a specific product ("Blue Top") - shows XPath doing something CSS can't: finding a cell by *sibling* content | `//tr[.//h4/a[text()="Blue Top"]]//td[@class="cart_total"]//p` |
| "Recommended items" next arrow | `//a[contains(@class,"recommended-item-control") and contains(@class,"right")]` |

## 4. Test cases

Moved to [`tests/test-cases.md`](tests/test-cases.md) - point 4 asked for a separate write-up of test cases with a text description of each interaction, so it lives in its own file rather than at the bottom of this one. It references the actual Page Object members below instead of bare selector strings.

## Page Objects (CSS vs. XPath)

Per the request to structure this as several Page Objects, `src/pages/` has two parallel sets covering the same five pages and the same public members - only the locator strings differ:

- `src/pages/css/` - `ProductsPageCss`, `LoginPageCss`, `ContactUsPageCss`, `HomePageCss`, `CartPageCss`
- `src/pages/xpath/` - `ProductsPageXpath`, `LoginPageXpath`, `ContactUsPageXpath`, `HomePageXpath`, `CartPageXpath`

`CartPageXpath` also has one method beyond a 1:1 port of the CSS version - `getTotalPriceForProduct(name)` - which locates a table cell by another cell's text *in the same row*. That's a genuine XPath capability with no CSS equivalent (short of `:has()`), included to show a case where the two approaches aren't just syntactic variants of each other.

## Commands

```bash
npm install
npm run run   # tsc --build && eslint ./src
```

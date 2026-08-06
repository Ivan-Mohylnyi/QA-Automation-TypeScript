# Test cases (assignment point 4)

Text descriptions only, as the assignment asks - no automated assertions. Each step references the actual Page Object member that holds the selector (`ClassName.member`), plus the underlying selector itself, so the description is tied to real, working code instead of a bare selector string. Every page has both a `*Css` and a `*Xpath` variant in `src/pages/` exposing the same members - either one works for every step below.

## TC1 - Search for a product and add the first result to the cart

* `ProductsPage.searchInput` (`#search_product` / `//input[@id="search_product"]`) - введіть "Dress"
* натискаємо `ProductsPage.searchButton` (`#submit_search`)
* очікуємо на елементи `ProductsPage.productCards` (`.product-image-wrapper`)
* наводимо курсор на перший `ProductsPage.productCards` і натискаємо перший `ProductsPage.addToCartButtons` (CSS) / `ProductsPage.firstAddToCartButton` (XPath, `(//a[contains(@class,"add-to-cart")])[1]`)
* у модальному вікні натискаємо `ProductsPage.cartModalViewCartLink`
* очікуємо, що `CartPage.productNames` містить назву щойно доданого товару

## TC2 - Register a new account through the signup form

* на сторінці `/login` вводимо ім'я в `LoginPage.signupNameInput`
* вводимо email в `LoginPage.signupEmailInput`
* натискаємо `LoginPage.signupButton`
* очікуємо заголовок `LoginPage.accountInfoHeading` ("Enter Account Information")

## TC3 - Filter the catalog by category, then by brand

* натискаємо `ProductsPage.womenCategoryToggle`, щоб розгорнути категорію
* натискаємо `ProductsPage.womenDressCategoryLink`
* очікуємо, що заголовок сторінки містить текст "Women - Dress Products"
* додатково натискаємо `ProductsPage.bibaBrandLink`, щоб відфільтрувати по бренду
* очікуємо оновлений набір карток у `ProductsPage.productCards`

## TC4 - Submit the contact form

* вводимо ім'я в `ContactUsPage.nameInput`
* вводимо email в `ContactUsPage.emailInput`
* вводимо тему в `ContactUsPage.subjectInput`
* вводимо текст у `ContactUsPage.messageTextarea`
* натискаємо `ContactUsPage.submitButton`
* приймаємо нативний `confirm()`-діалог браузера (обробляється API інструмента автоматизації, а не CSS/XPath-селектором)
* очікуємо `ContactUsPage.successBanner` з текстом "Success! Your details have been submitted successfully."

## TC5 - Subscribe to the newsletter from the footer

* вводимо email в `HomePage.newsletterEmailInput` (реальна одруківка на сайті: `#susbscribe_email`)
* натискаємо `HomePage.newsletterSubscribeButton`
* очікуємо появу `HomePage.newsletterSuccessBanner` з текстом "You have been successfully subscribed!"

## TC6 - Browse the "recommended items" carousel and verify the cart total updates correctly (improved beyond the assignment's own example)

* на головній сторінці прокручуємо до `HomePage.recommendedItemsCarousel`
* натискаємо стрілку `HomePage.recommendedItemsNextArrow` двічі
* очікуємо, що набір видимих карток `HomePage.recommendedItemCards` змінився
* натискаємо `HomePage.recommendedItemsPreviousArrow`, щоб повернутись до початкового набору
* переходимо в кошик і для товару "Blue Top" звіряємо суму рядка через `CartPageXpath.getTotalPriceForProduct('Blue Top')` - приклад локатора, що шукає комірку **за вмістом сусіднього елемента в тому ж рядку** (цього не можна виразити чистим CSS без `:has()`)

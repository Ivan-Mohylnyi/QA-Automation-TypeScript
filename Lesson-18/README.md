# Playwright як E2E Web UI фреймворк - Lesson 18

Цей проєкт демонструє Playwright Test як інструмент для E2E UI-тестування: Page Object Model для реальної сторінки в інтернеті та кілька тестів, побудованих поверх нього.

## Домашнє завдання

1. Ознайомитися з документацією Playwright: https://playwright.dev/docs/intro
2. Створити Playwright Test проєкт, описати обрану сторінку в Page Object Model, написати кілька тестів.
3. Ознайомитися з документацією роботи з Shadow DOM та iFrame:
   - Shadow DOM (Playwright-локатори "пронизують" Shadow DOM автоматично): https://playwright.dev/docs/locators#locate-in-shadow-dom
   - iFrame (`FrameLocator`, `page.frameLocator()`): https://playwright.dev/docs/frames

## Обрана сторінка

[automationexercise.com/products](https://automationexercise.com/products) - публічний сайт, спеціально створений для практики автоматизації тестування (без анти-бот захисту, стабільна розмітка).

## Що реалізовано

- `src/pages/products.page.ts` - Page Object Model сторінки каталогу товарів: пошук, картки товарів, фільтр за категорією, додавання в кошик.
- `src/fixtures/pages.fixture.ts` - Playwright fixture, що надає готовий екземпляр `ProductsPage` у кожному тесті (`test.extend`).
- `tests/products.spec.ts` - 4 тести:
  1. на сторінці відображається декілька товарів;
  2. пошук повертає відповідні результати;
  3. фільтр за категорією (Women > Dress) показує правильні товари;
  4. товар можна додати в кошик, і він з'являється в кошику.

## Структура

```text
src/
  pages/
    products.page.ts   # Page Object Model
    index.ts
  fixtures/
    pages.fixture.ts    # test.extend з productsPage
    index.ts
tests/
  products.spec.ts
playwright.config.ts
```

## Команди

Встановлення залежностей:

```bash
npm install
npx playwright install chromium
```

Запуск тестів:

```bash
npm test
```

Запуск з видимим браузером:

```bash
npm run test:headed
```

HTML-звіт:

```bash
npm run test:report
```

Компіляція TypeScript + перевірка ESLint:

```bash
npm run run
```

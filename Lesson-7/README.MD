# TypeScript Basics - Lesson 7

Цей проєкт демонструє базові можливості TypeScript на практиці: типізацію функцій, `enum`, `interface`, `type`, `union`, `unknown`, `object`, `Record`, optional параметри та базові правила ESLint для TS.

## Що реалізовано

- Типізовані функції з явним `return` типом.
- Робота з `enum` (`List`) та значеннями різних типів.
- Власні типи через `interface` (`Dog`) і `type` (`StringOrNumber`).
- Optional параметри та `Partial<T>`.
- Масиви з `union`-типами: `(number | string)[]`.
- Type guard через `typeof` для `unknown`.
- Різниця між `unknown`, `object`, `Record<string, unknown>`.
- Налаштований ESLint для TypeScript, включно з перевіркою зайвих анотацій типів (`no-inferrable-types`).

## Структура

- `src/new-types.ts` - типи та enum.
- `src/functions.ts` - приклади функцій з типізацією.
- `src/index.ts` - виклики функцій та демонстрація поведінки.
- `eslint.config.mjs` - правила лінтера.
- `tsconfig.json` - конфігурація компілятора TS.

## Основні приклади

### 1) Типізація функцій

```ts
export function sum(a: number, b: number): number {
    return a + b;
}

export function doNothing(): void {
    console.log('This function does nothing');
}
```

### 2) Enum + union type

```ts
export enum List {
    one,
    two = 100,
    three = 'three',
    four = 101,
    five
}

export type StringOrNumber = string | number;

export function getCurrentEnumAsString(value: List): StringOrNumber {
    return value;
}
```

### 3) Interface та optional параметри

```ts
export interface Dog {
    name: string;
    age: number;
    height: number;
    weight: number;
}

export function createNewDogWithOptionalParameters(
    name: string,
    age: number,
    height: number,
    weight?: number
): Partial<Dog> {
    return { name, age, height, weight };
}
```

### 4) Масиви та union

```ts
const arr: (number | string)[] = [1, 2, 3, 4];
arr.push('5');
// arr.push({}) // помилка типізації
```

### 5) unknown, object, Record

```ts
export function listObjectKeysWithUnknownParameter(obj: unknown): string[] {
    if (typeof obj === 'object' && obj !== null) {
        return Object.keys(obj);
    }
    return [];
}

export function listObjectKeysWithObjectParameter(obj: object): string[] {
    return Object.keys(obj);
}

export function listObjectKeysWithRecordParameter(obj: Record<string, unknown>): string[] {
    return Object.keys(obj);
}
```

## Лінтер: важливі правила

У проєкті налаштований TypeScript ESLint. Окремо важливе правило:

- `@typescript-eslint/no-inferrable-types`: забороняє писати явний тип там, де TS і так може його вивести.

Приклад, що лінтер має підсвітити:

```ts
const count: number = 5;
const names: Array<string> = ['Ann', 'Bob'];
const user: { name: string } = { name: 'Ann' };
```

Краще так:

```ts
const count = 5;
const names = ['Ann', 'Bob'];
const user = { name: 'Ann' };
```

## Команди

Встановлення залежностей:

```bash
npm install
```

## Запуск коду через tsx

Для швидкого запуску TypeScript-коду в цьому проєкті використовуємо `tsx` (без попередньої збірки в `dist`).

Запуск основного файлу:

```bash
npx tsx src/index.ts
```

`tsx` зручно використовувати під час розробки, а `tsc --build` - коли потрібна окрема компіляція.

Компіляція + перевірка лінтером:

```bash
npm run run
```

Окрема перевірка ESLint:

```bash
npx eslint ./src
```

Окрема компіляція TypeScript:

```bash
npx tsc --build
```

> Важливо: команда `npx tsc build` некоректна, тому що `build` сприймається як файл. Використовуйте `npx tsc --build`.

## Висновок

Цей урок покриває практичний мінімум TS, який потрібен для безпечного та зрозумілого коду:

- типи для функцій та даних,
- контроль `union` і `unknown`,
- правильну роботу з об'єктами,
- базову дисципліну через ESLint.
# Lesson 3. JavaScript Coding Standards

## ESLint Style

- Use `eslint` recommended rules and extend from `eslint:recommended`.
- Keep line length under 100 characters.
- Use 2 spaces for indentation.
- Use single quotes for strings unless double quotes are required.
- Always use `const` for values that do not change, otherwise use `let`.
- Avoid `var`.
- Use semicolons at the end of statements.
- Keep function names descriptive and use camelCase for variables and functions.
- Use `===` and `!==` for comparisons.

## JavaScript Types

- Prefer primitive types when possible: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`.
- Use arrays and objects for collections and structured data.
- Validate input types before use.
- For functions with optional parameters, use default values or explicit checks.
- Avoid mixing types in the same variable.

## `if` / `else`

- Use `if` for conditional logic and `else` only when a fallback is needed.
- Prefer early returns to reduce nesting.
- Keep conditions simple and readable.
- Example:

```js
if (isValid) {
  processValue(value);
} else {
  handleError();
}
```

- For multiple conditions, use `else if` instead of nested `if` blocks.

```js
if (status === 'success') {
  handleSuccess();
} else if (status === 'pending') {
  handlePending();
} else {
  handleFailure();
}
```

## `switch`

- Use `switch` for multiple discrete values of the same expression.
- Always include a `default` case.
- Use `break` to prevent fall-through unless fall-through is explicit and documented.

```js
switch (command) {
  case 'start':
    startProcess();
    break;
  case 'stop':
    stopProcess();
    break;
  default:
    showHelp();
}
```

- Keep cases short and delegate logic to functions when needed.

## Operators

- Use `===` and `!==` over `==` and `!=`.
- Use `&&` and `||` for boolean logic; avoid complex combined expressions.
- Use unary `+` or `Number()` to convert strings to numbers explicitly.
- Use `?.` for safe property access when supported.
- Use `??` to provide default values for `null` or `undefined`.

## General Best Practices

- Write clear and consistent comments.
- Keep functions small and focused.
- Use descriptive variable names.
- Avoid deeply nested code.
- Run ESLint and fix issues before committing code.

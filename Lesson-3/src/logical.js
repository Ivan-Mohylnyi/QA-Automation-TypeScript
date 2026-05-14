const a = 1;
const b = 2;
const c = 'str';
const d = '3';
const e = 'str';

console.log(a > b); // false
console.log(a < b); // true
console.log(a >= b); // false
console.log(a <= b); // true

console.log(b === d);
console.log(b == d);

console.log(a !== d);
console.log(a != d);

console.log(c === d);
console.log(c === e);

// Logical operators
const f = true;
const g = false;
console.log(f && g); // false
console.log(f || g); // true
console.log(!f); // false
console.log(!g); // true

const h = undefined;
const i = null;
const j = h ?? i ?? 'default value';
console.log(j); // 'default value'

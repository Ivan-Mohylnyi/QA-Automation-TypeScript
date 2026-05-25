import { sumArrayElements as sumArrayElementsFunction } from './functions.js';
import { multiplyArrayElements as multiplyArrayElementsArrow } from './arrow-functions.js';
import { person } from './getter-setters.js';

console.log('--- Object Summary ---');
console.log(person.getSummary());

console.log('--- Update Full Name ---');
person.fullName = 'Alice Johnson';
console.log(person.getSummary());

console.log('--- Update Address ---');
person.address.city = 'Los Angeles';
person.address.country = 'USA';
console.log(person.getSummary());

console.log('--- Sum using function.js ---');
const numbers = [1, 2, 3, 4, 5];
const strings = ['10', '20', '30', '40', '50'];
console.log('Sum of numbers:', sumArrayElementsFunction(numbers));
console.log('Sum of strings:', sumArrayElementsFunction(strings));

console.log('--- Product using arrow-functions.js ---');
const newNumbers = [2, 3, 4];
const newStrings = ['6', '8', '10'];
console.log('Product of numbers:', multiplyArrayElementsArrow(newNumbers));
console.log('Product of strings:', multiplyArrayElementsArrow(newStrings));

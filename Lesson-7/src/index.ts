import { sumArrayElements } from './functions';
import { multiplyArrayElements } from './arrow-functions';

console.log('--- Sum using functions.ts ---');
const numbers: number[] = [1, 2, 3, 4, 5];
const strings: string[] = ['10', '20', '30', '40', '50'];
console.log('Sum of numbers:', sumArrayElements(numbers));
console.log('Sum of strings:', sumArrayElements(strings));

console.log('--- Product using arrow-functions.ts ---');
const newNumbers: number[] = [2, 3, 4];
const newStrings: string[] = ['6', '8', '10'];
console.log('Product of numbers:', multiplyArrayElements(newNumbers));
console.log('Product of strings:', multiplyArrayElements(newStrings));


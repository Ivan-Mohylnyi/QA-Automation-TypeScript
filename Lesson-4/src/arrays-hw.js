// Array of strings
const stringArray = ['apple', 'banana', 'cherry'];
console.log('String Array:', stringArray);
stringArray.forEach((item, index) => console.log(`Index: ${index}, Value: ${item}`));
const uppercasedStrings = stringArray.map((item) => item.toUpperCase());
console.log('Uppercased Strings:', uppercasedStrings);

// Array of numbers
const numberArray = [1, 2, 3, 4, 5];
console.log('Number Array:', numberArray);
numberArray.forEach((item, index) => console.log(`Index: ${index}, Value: ${item}`));
const squaredNumbers = numberArray.map((item) => item ** 2);
console.log('Squared Numbers:', squaredNumbers);

// Array of booleans
const booleanArray = [true, false, true, false];
console.log('Boolean Array:', booleanArray);
booleanArray.forEach((item, index) => console.log(`Index: ${index}, Value: ${item}`));
const negatedBooleans = booleanArray.map((item) => !item);
console.log('Negated Booleans:', negatedBooleans);

// Array of any type
const anyArray = ['text', 42, true, null];
console.log('Any Array:', anyArray);
anyArray.forEach((item, index) => console.log(`Index: ${index}, Value: ${item}`));
const stringifiedAny = anyArray.map((item) => String(item));
console.log('Stringified Any Array:', stringifiedAny);

const arr = ['1', 2, true, null, undefined, { name: 'Object' }, [1, 2, 3], new Date('2024-01-01')];

console.log(arr);

for (const value of arr) {
    console.log(`value: ${value} and index ${arr.indexOf(value)}`);
}

console.log('------------Changed Value-------------');

const arr2 = arr;
arr2[0] = 'Changed value';

console.log(arr);
console.log(arr2);

console.log('------------Filter--------------');

const filtesredArr = arr.filter(value => value != null && typeof value !== 'object');
console.log(filtesredArr);

console.log('------------Find--------------');

const finddArr = arr.find(value => value != null && typeof value !== 'object');
console.log(finddArr);

console.log('------------Push--------------');

arr.push(...[10, 20, 30, 40, 50]);
console.log(arr);

console.log('------------Sort--------------');

const sortedArray = arr.filter(value => typeof value === 'number').sort((a, b) => a - b);
console.log(sortedArray);

console.log('------------Multiply--------------');

const multipliedArray = sortedArray.map(value => value * 2);
console.log(multipliedArray);

multipliedArray.forEach(value => {
    if (value > 30) {
        console.log(`Value ${value} is greater than 30`);
    }
});


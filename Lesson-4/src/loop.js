const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (const value of arr) {
    console.log(`value: ${value} and index ${arr.indexOf(value)}`);
};

console.log('------------Changed Value with Let-------------');

for (let i = 0; i < arr.length; i++) {
    console.log(`value: ${arr[i]} and index ${i}`);
}

const arr2 = [];

const reveredArr = arr.reverse();

for (const value of reveredArr) {
    console.log(`iteration: ${reveredArr.indexOf(value)}`);
    if (value % 2 === 0 && arr2.length < 3) {
        arr2.push(value);
    } else if (arr2.length >= 3) {
        break;
    }
};
console.log(arr2);

const arr3 = [];
for (let i = 0; i < arr.length; i++) {
    console.log(`iteration: ${i}`);
    if (arr[i] % 2 === 0) {
        if (arr[i] > 6) {
            continue;
        }
        arr3.push(arr[i]);
    }
}

console.log(arr3);

let i = 0;
while (i < arr.length) {
    console.log(`iteration: ${i} and value: ${arr[i]}`);
    i++;
}

const newArr = [1, 2, 3, 4, 5];
while (newArr.length > 0) {
    const value = newArr.pop();
    console.log(`iteration: ${value} and array length: ${newArr.length}`);
}
console.log(newArr);

let j = 0;
do {
    console.log(`iteration: ${j} and value: ${arr[j]}`);
    j++;
} while (j < arr.length);

const obj = {
    name: 'Object 1',
    parameters: [
        {
            name: 'Parameter 1',
            value: 5
        },
        {
            name: 'Parameter 2',
            value: 10
        }
    ]
};

const keys = Object.keys(obj);
console.log(keys);
console.log(obj[keys[0]], obj[keys[1]]);

const values = Object.values(obj);
console.log(values);

const entries = Object.entries(obj);
console.log(entries);

const [key, value] = entries[0];
console.log(key, value);


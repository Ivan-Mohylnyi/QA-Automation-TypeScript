// Arrow function for arithmetic multiplication of array elements
const multiplyArrayElements = (array) => {
    return array.reduce((product, current) => {
        // Convert the element to a number if possible
        const number = parseFloat(current);
        return !isNaN(number) ? product * number : product;
    }, 1);
};

// Exporting the function for possible use in other files
export { multiplyArrayElements };

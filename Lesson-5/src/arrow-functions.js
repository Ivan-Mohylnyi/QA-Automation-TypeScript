const multiplyArrayElements = (array) => {
    return array.reduce((product, current) => {
        const number = parseFloat(current);
        return !isNaN(number) ? product * number : product;
    }, 1);
};

export { multiplyArrayElements };

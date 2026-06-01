export const multiplyArrayElements = (array) => {
    return array.reduce((product, current) => {
        const num = typeof current === 'number' ? current : parseFloat(String(current));
        return !Number.isNaN(num) ? product * num : product;
    }, 1);
};
//# sourceMappingURL=arrow-functions.js.map
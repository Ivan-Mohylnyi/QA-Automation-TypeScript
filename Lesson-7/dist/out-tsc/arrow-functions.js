export const multiplyArrayElements = (array) => {
    return array.reduce((product, current) => {
        const num = typeof current === 'number' ? current : parseFloat(String(current));
        if (Number.isNaN(num)) {
            throw new Error(`Cannot convert value "${String(current)}" to a number`);
        }
        return product * num;
    }, 1);
};
//# sourceMappingURL=arrow-functions.js.map
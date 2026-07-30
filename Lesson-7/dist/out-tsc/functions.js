export function sumArrayElements(array) {
    return array.reduce((sum, current) => {
        const num = typeof current === 'number' ? current : parseFloat(String(current));
        if (Number.isNaN(num)) {
            throw new Error(`Cannot convert value "${String(current)}" to a number`);
        }
        return sum + num;
    }, 0);
}
//# sourceMappingURL=functions.js.map
export function sumArrayElements(array) {
    return array.reduce((sum, current) => {
        const num = typeof current === 'number' ? current : parseFloat(String(current));
        return !Number.isNaN(num) ? sum + num : sum;
    }, 0);
}
//# sourceMappingURL=functions.js.map
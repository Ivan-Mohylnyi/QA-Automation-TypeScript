export const multiplyArrayElements = (array: (number | string)[]): number => {
    return array.reduce((product: number, current: number | string) => {
        const num = typeof current === 'number' ? current : parseFloat(String(current));
        return !Number.isNaN(num) ? product * num : product;
    }, 1);
};

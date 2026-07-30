export function sumArrayElements(array: (number | string)[]): number {
    return array.reduce((sum: number, current: number | string) => {
        const num = typeof current === 'number' ? current : parseFloat(String(current));
        if (Number.isNaN(num)) {
            throw new Error(`Cannot convert value "${String(current)}" to a number`);
        }
        return sum + num;
    }, 0);
}

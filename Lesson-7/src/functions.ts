export function sumArrayElements(array: (number | string)[]): number {
    return array.reduce((sum: number, current: number | string) => {
        const num = typeof current === 'number' ? current : parseFloat(String(current));
        return !Number.isNaN(num) ? sum + num : sum;
    }, 0);
}

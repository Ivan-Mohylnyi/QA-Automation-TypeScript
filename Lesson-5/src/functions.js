function sumArrayElements(array) {
    return array.reduce((sum, current) => {
        const number = parseFloat(current);
        return !isNaN(number) ? sum + number : sum;
    }, 0);
}

export { sumArrayElements };

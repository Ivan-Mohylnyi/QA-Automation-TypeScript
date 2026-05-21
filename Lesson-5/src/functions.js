// Function for arithmetic addition of array elements
function sumArrayElements(array) {
    return array.reduce((sum, current) => {
        // Convert the element to a number if possible
        const number = parseFloat(current);
        return !isNaN(number) ? sum + number : sum;
    }, 0);
}

// Exporting the function for possible use in other files
export { sumArrayElements };

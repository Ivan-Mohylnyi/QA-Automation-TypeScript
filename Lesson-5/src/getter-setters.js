// Object with getters, setters, and a method for manipulation
const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    address: {
        city: 'New York',
        country: 'USA'
    },

    // Getter for full name
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },

    // Setter for full name
    set fullName(name) {
        const [first, last] = name.split(' ');
        this.firstName = first || this.firstName;
        this.lastName = last || this.lastName;
    },

    // Method to summarize the object
    getSummary() {
        return `Name: ${this.fullName}, Age: ${this.age}, Location: ${this.address.city}, ${this.address.country}`;
    }
};

// Example usage
console.log(person.getSummary());

person.fullName = 'Jane Smith';
console.log(person.getSummary());

// Exporting the object for possible use in other files
export { person };

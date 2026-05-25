const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    address: {
        city: 'New York',
        country: 'USA'
    },

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },

    set fullName(name) {
        const [first, last] = name.split(' ');
        this.firstName = first || this.firstName;
        this.lastName = last || this.lastName;
    },

    getSummary() {
        return `Name: ${this.fullName}, Age: ${this.age}, Location: ${this.address.city}, ${this.address.country}`;
    }
};

console.log(person.getSummary());

person.fullName = 'Jane Smith';
console.log(person.getSummary());

export { person };

// Complex object with 2 levels of hierarchy, an array, and a method
const complexObject = {
    user: {
        id: 101,
        name: 'John Doe',
        hobbies: ['reading', 'gaming', 'hiking'],
        contact: {
            email: 'john.doe@example.com',
            phone: '123-456-7890'
        }
    },
    metadata: {
        createdAt: '2026-05-18T12:00:00Z',
        tags: ['example', 'complex', 'object']
    },
    displayInfo() {
        console.log(`User ${this.user.name} has email ${this.user.contact.email} and enjoys ${this.user.hobbies.join(', ')}.`);
    }
};

// Display the complex object
console.log(complexObject);

// Call the method to display user info
complexObject.displayInfo();

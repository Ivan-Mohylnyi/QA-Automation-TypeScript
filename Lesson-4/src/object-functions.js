const nestedObject = {
    user: {
        id: 1,
        name: 'Alice',
        contact: {
            email: 'alice@example.com',
            phones: {
                home: '555-1234',
                mobile: '555-5678'
            }
        },
        preferences: {
            theme: 'dark',
            notifications: {
                email: true,
                sms: false,
                push: {
                    enabled: true,
                    sound: 'chime'
                }
            }
        }
    },
    metadata: {
        createdAt: '2026-05-18T12:00:00Z',
        tags: ['sample', 'nested', 'object']
    },
    summary() {
        return `User ${this.user.name} has email ${this.user.contact.email} and prefers ${this.user.preferences.theme} theme.`;
    }
};

console.log(nestedObject);
console.log(nestedObject.summary());


import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'https://automationexercise.com',
        setupNodeEvents() {
            // implement node event listeners here
        }
    }
});

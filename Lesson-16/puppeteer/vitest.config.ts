import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['./tests/**/?(*.)+(spec|test).[t]s?(x)'],
        testTimeout: 60000
    }
});

import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        include: ['src/**/*.test.ts']
    },
    resolve: {
        alias: {
            auth: '/src/auth',
            quotes: '/src/quotes',
            lib: '/src/lib'
        }
    }
});
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    return {
        base: '/',
        build: {
            outDir: 'build',
        },
        plugins: [react()],
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: './src/setupTests.js',
            css: true,
            reporters: ['verbose'],
            coverage: {
                reporter: ['text', 'json', 'html'],
                include: ['src/**/*'],
                exclude: [],
            }
        },
    };
});

import { defineConfig, configDefaults } from 'vitest/config'
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
            exclude: [...configDefaults.exclude, './tests/*'],
            coverage: {
                reporter: ['text', 'json', 'html'],
                include: ['src/**/*'],
                exclude: [],
            }
        },
    };
});

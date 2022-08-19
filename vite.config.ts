import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		plugins: [
			react()
		],
		build: {
			outDir: 'dist'
		},
		resolve: {
			alias: {
				'@': resolve(__dirname, './src'),
				'!': resolve(__dirname, './src/assets')
			}
		}
	};
});

import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@src': path.resolve(__dirname, './src'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@components': path.resolve(__dirname, './src/components'),
			'@api': path.resolve(__dirname, './src/api'),
			'@store': path.resolve(__dirname, './src/store')
		}
	},
	plugins: [react(), svgr()]
});

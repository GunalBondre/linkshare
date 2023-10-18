import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],

	server: {
		proxy: {
			'/auth': {
				target: 'http://localhost:4000',
				changeOrigin: true,
			},
			'/link': {
				target: 'http://localhost:4000',
				changeOrigin: true,
			},
		},
	},
});

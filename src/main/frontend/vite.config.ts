import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: true, // Open the default browser when starting the development server
    cors: true, // Allow cross-origin resource sharing
  },
  plugins: [react()],
});

import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  // Thêm dòng này vào
  base: './', 

  plugins: [preact()],
});
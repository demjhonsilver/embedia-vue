// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),  // Entry file
      name: 'EmbediaVue',  // Library name
      // Define filenames for both formats
      fileName: (format) => format === 'es' ? 'index.es.js' : 'index.js',  // ES module as index.es.js, CommonJS as index.js
      formats: ['es', 'cjs']  // Output ES Module and CommonJS formats
    },
    rollupOptions: {
      // Externalize Vue dependency
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});

import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',  //  Needed for document/window
    globals: true,          // Allows using describe/it/expect globally
  },
})

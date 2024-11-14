import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server:{
    proxy:{
      '/api': 'https://localhost:7147/api',
    }
  },
  build: {
    manifest: true,
    rollupOptions:{
      input: '/path/to/main.js',
    }
  }
})

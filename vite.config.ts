import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [tsconfigPaths(), react()],

  css: {
    modules: {
      hashPrefix: 'prefix',
    },

    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})

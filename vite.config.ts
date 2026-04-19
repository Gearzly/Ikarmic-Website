import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  base: '/',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    copyPublicDir: true,
    rollupOptions: {
      output: isSsrBuild
        ? { format: 'esm' as const }
        : {
            manualChunks: {
              'vendor-react': [
                'react',
                'react-dom',
                'react-router-dom',
                'react-helmet-async',
              ],
              'vendor-gsap': ['gsap'],
              'vendor-icons': ['lucide-react'],
            },
          },
    },
  },
}))

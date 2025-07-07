import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isDev = mode === 'development'

  return {
    plugins: [react()],
    base: '/',
    server: isDev
      ? {
          proxy: {
            '/api': {
              target: env.VITE_API_DEV,
              changeOrigin: true,
              secure: false,
            },
          },
        }
      : undefined,
  }
})

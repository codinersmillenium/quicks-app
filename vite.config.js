import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import sass from 'sass'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
const ENV = expand(config({ path: './.env' }))

export default defineConfig({
  plugins: [vue()],
    server: {
      port: parseInt(ENV.parsed.APP_PORT)
    },
    define: {
      Env: ENV.parsed
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      }
    },
    build: {
      chunkSizeWarningLimit: 3000
    },
    css: {
      preprocessorOptions: {
        scss: {
          implementation: sass,
        },
      },
    },
})
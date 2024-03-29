import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'



export default defineConfig({
  base:'.',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    port: '5555'
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
              @import "@/assets/scss/helpers/_variable.scss";
              @import "@/assets/scss/helpers/_function.scss";
              @import "@/assets/scss/helpers/_mixin.scss";`
      }
    }
  }
})

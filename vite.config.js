import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pluginRewriteAll from 'vite-plugin-rewrite-all';


// https://vitejs.dev/config/
export default defineConfig({
  rewrites: [{ "source": "/(.*)", "destination": "/" }],
  base:'',
  plugins: [vue(),pluginRewriteAll()],
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
              @import "./src/assets/scss/helpers/_variable.scss";
              @import "./src/assets/scss/helpers/_function.scss";
              @import "./src/assets/scss/helpers/_mixin.scss";`
      }
    }
  }
})

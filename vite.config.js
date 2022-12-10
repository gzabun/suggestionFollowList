import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pluginRewriteAll from 'vite-plugin-rewrite-all';

const LoginHtmlFallbackPlugin = {
  name: 'login-html-fallback',
  configureServer(server) {
    server.middlewares.use('/index', (req, res, next) => {
      req.url += '.html'
      next()
    })
  }
}

export default defineConfig({
  rewrites: [{ "source": "/(.*)", "destination": "/index.html" }],
  base:'',
  plugins: [vue(),pluginRewriteAll(),LoginHtmlFallbackPlugin],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build:{
    rollupOptions:{
      input: {
        index: new URL('./index.html', import.meta.url).pathname,
      },
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
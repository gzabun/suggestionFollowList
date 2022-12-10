import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pluginRewriteAll from 'vite-plugin-rewrite-all';



export default defineConfig({
  base:'./',
  plugins: [vue(),pluginRewriteAll()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    port: '5555'
  },
  build:{
    rollupOptions: {
      input:'index.html',
      output: {
        assetFileNames: (assetInfo) => {
          var info = assetInfo.name.split(".");
          var extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img";
          } else if (/woff|woff2/.test(extType)) {
            extType = "./";
          }
          return `${extType}/[name][extname]`;
        },
        chunkFileNames: "[name].js",
        entryFileNames: "[name].js",
      },
    },
    copyPublicDir:false,
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

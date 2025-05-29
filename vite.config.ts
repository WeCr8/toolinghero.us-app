import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import nightwatchPlugin from 'vite-plugin-nightwatch'
import Inspect from 'vite-plugin-inspect'

export default defineConfig({
  base: '/',
  plugins: [vue(), vueJsx(), vueDevTools(), nightwatchPlugin(), Inspect()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'vue': 'vue/dist/vue.esm-bundler.js',
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      strict: false,
    },
  },
})

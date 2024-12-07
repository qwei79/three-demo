import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  
  server: {
    // host: 'test.com',
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        secure: false, // 允许协议不匹配
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    modules: { // 启用 CSS modules
      localsConvention: 'camelCase' // 默认只支持驼峰，修改为同事支持横线和驼峰
    },
    preprocessorOptions: {
      less: { // 这里是对 less 的配置
        javascriptEnabled: true // 允许 less 内联 JavaScript
      }
    }
  },
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const cloudInstance = 'https://cloud-test.hdw.mx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '^^(?!\/widget|\/edit|\/src|\/@vite|\/@id|\/node_modules).{2,}$': {
        target: cloudInstance,
        changeOrigin: true,
        secure: false,
        rewrite: path => `${path}?devServer=https://localhost:3000/widget`
      }
    }
  }
})


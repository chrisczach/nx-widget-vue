import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export const cloudInstance = 'https://cloud-test.hdw.mx'
export const dashboardPath = `${cloudInstance}/dashboard?devServer=https://localhost:3000/widget`
export const authorizePath = `${cloudInstance}/authorize?redirect_url=${encodeURIComponent(dashboardPath)}`

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})


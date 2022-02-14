import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { cloudInstance, devServer } from './src/config'
import { generateConfig } from 'widget-dashboard-tools'

// https://vitejs.dev/config/
export default defineConfig(generateConfig({ cloudInstance, devServer, plugins: [vue()] }))

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from "vite-plugin-singlefile"
import { cloudInstance, devServer } from './src/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteSingleFile()],
  build: {
    target: "esnext",
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    brotliSize: false,
    rollupOptions: {
      inlineDynamicImports: true,
      input: ['widget.html', 'edit.html', 'index.html'],
      output: {
        manualChunks: () => "not_used.js",
      },
    },
  },
  server: {
    proxy: {
      '^^((?!widget\.html|edit\.html|@vite\/client|src|node_modules|@id).)*$': {
        target: cloudInstance,
        secure: false,
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res, options) => {
            if (proxyReq.path == '/') {
              res.setHeader('Set-Cookie', `devServer=${devServer}`)
            }
          })
        }
      }
    }
  }
})


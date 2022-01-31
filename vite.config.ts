import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from "vite-plugin-singlefile"

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
        target: 'https://localhost:9000',
        secure: false,
        changeOrigin: true,
      }
    }
  }
})


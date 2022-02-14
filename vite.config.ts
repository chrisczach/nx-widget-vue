import { createInterface } from 'readline';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import EnvironmentPlugin from 'vite-plugin-environment'
import { viteSingleFile } from "vite-plugin-singlefile"
import { cloudInstance, devServer } from './src/config'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
})

function readLineAsync(question, defaultValue = '') {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
    rl.write(defaultValue)
  });
}


// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const DB_ENV = 'DASHBOARD_PREVIEW_INSTANCE'
  const defaultInstance = process.env[DB_ENV] || cloudInstance
  const CLOUD_INSTANCE = mode === 'development' ? await readLineAsync('Please enter cloud portal instance for previews:\n', defaultInstance) as string : defaultInstance
  if (CLOUD_INSTANCE !== defaultInstance) {
    console.log(`If you want to default to this instance set environment variable "${DB_ENV}" set to "${CLOUD_INSTANCE}"`);
  }

  return {
    plugins: [vue(), viteSingleFile(), EnvironmentPlugin({CLOUD_INSTANCE})],
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
      host: '127.0.0.1',
      open: true,
      proxy: {
        '^^((?!widget\.html|edit\.html|@vite\/client|src|node_modules|@id).)*$': {
          target: CLOUD_INSTANCE,
          secure: false,
          changeOrigin: true,
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res, options) => {
              const cookies = req.headers.Cookie
              if (cookies?.[(typeof cookies === 'string' ? 'search' : 'find')](`devServer=${devServer}`)) {
                res.setHeader('Set-Cookie', `devServer=${devServer}`)
              }
            })
          }
        }
      }
    }
  }
})


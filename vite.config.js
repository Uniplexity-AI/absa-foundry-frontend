import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      injectManifest: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
      },
      devOptions: { enabled: false, type: 'module' },
      manifestFilename: 'manifest.json',
      includeAssets: ['favicon.ico', 'logo_red.png', 'logo_white.png'],
      manifest: {
        name: 'ABSA Intelligence Unit',
        short_name: 'ABSA IU',
        start_url: '/',
        display: 'standalone',
        background_color: '#FFFFFF',
        theme_color: '#BE0F2C',
        description: 'AI-driven banking analytics for customer lifecycle prediction.',
        icons: [
          { src: '/logo_red.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/logo_red.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      }
    })
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  optimizeDeps: { include: ['@zxing/browser', '@zxing/library'] },
  build: { modulePreload: false, target: 'esnext', minify: false, cssCodeSplit: false, rollupOptions: { external: [] } },
  server: { host: '0.0.0.0', port: 3000 }
})
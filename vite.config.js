import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import federation from '@originjs/vite-plugin-federation'
// import vueJsx from '@vitejs/plugin-vue-jsx';

// ====== progressive web app for offline capabilities=====
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      vueDevTools(),
      federation({
        name: 'hostApp',
        filename: 'remoteEntry.js',
        remotes: {
          microfinanceMfe: `${env.VITE_MICROFINANCE_MFE_URL || 'http://localhost:3005'}/assets/remoteEntry.js`,
          assetsManagerMfe: `${env.VITE_ASSETS_MANAGER_MFE_URL || 'http://localhost:3006'}/assets/remoteEntry.js`,
          eduManagerMfe: `${env.VITE_EDU_MANAGER_MFE_URL || 'http://localhost:3007'}/assets/remoteEntry.js`,
        },
        exposes: {
          './Sidebar': './src/components/layouts/Sidebar.vue',
          './moduleCards': './src/config/moduleCards.js'
        },
        shared: ['vue', 'vue-router', 'pinia', 'axios']
      }),
      VitePWA({
        registerType: 'autoUpdate',
        strategies: 'injectManifest',
        srcDir: 'src',
        filename: 'sw.js',
        injectManifest: {
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 // 5MB
        },
        devOptions: {
          enabled: env.VITE_ENABLE_DEV_SW === 'true' && env.VITE_DEV_BYPASS !== 'true',
          type: 'module'  // Allow using import in SW during dev
        },
        manifestFilename: 'manifest.json',
        // Only ship valid image assets; logo.svg is actually a PNG,
        // so we rely on PNG icons instead to avoid manifest warnings.
        includeAssets: ['favicon.ico'],
        manifest: {
          name: 'Uniplexity Business',
          short_name: 'UB App',
          start_url: '/',
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#2F2E8B',
          description: 'Complete business management solution with offline support',
          icons: [
            {
              src: '/uniplexity_logo.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: '/uniplexity_logo.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      })
      // vueJsx()
    ],
    // css: {
    //   postcss: {
    //     plugins: [require('tailwindcss'), require('autoprefixer')],
    //   },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    optimizeDeps: {
      include: ['@zxing/browser', '@zxing/library']
    },
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
      rollupOptions: {
        external: [],
      }
    },
    server: {
      allowedHosts: ['uniplexitybusiness.com'],
      host: "0.0.0.0",  // Ensure it listens on all network interfaces
      port: process.env.PORT || 3000,  // Use Render’s assigned port or fallback to 3000
    }
  }
})

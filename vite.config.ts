import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    AutoImport({
      dts: true,
      imports: [
        'vue',
        '@vueuse/core',
      ],
    }),
    Components({
      dts: true
    }),
    tsconfigPaths()
  ],
})

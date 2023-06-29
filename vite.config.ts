import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取各种环境下的对应变量
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      // ...
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      }),
      viteMockServe({
        localEnabled: command === 'serve'
      } as any)
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 自动导入scss文件
          additionalData: `
            @use "@/styles/var.scss" as *;
          `
        }
      }
    },
    // 配置代理
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 服务器地址
          target: env.VITE_SERVE,
          // 是否代理跨域
          changeOrigin: true,
          // 路径重写
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  }
})

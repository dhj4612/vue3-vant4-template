import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from 'node:url'
import postCssPxToViewPort from 'postcss-px-to-viewport'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // 解决在顶层模块中，使用 await 操作符无法 builder 的问题
        // 可参考 https://blog.csdn.net/qiu_cs/article/details/125503643
        topLevelAwait({
            promiseExportName: '__tla',
            promiseImportName: i => `__tla_${i}`,
        }),
    ],
    css: {
        postcss: {
            plugins: [
                postCssPxToViewPort({
                    unitToConvert: 'px', // 要转化的单位
                    viewportWidth: 375, // UI设计稿的宽度
                    unitPrecision: 2, // 转换后的精度，即小数点位数
                    propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
                    viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
                    fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
                    selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
                    minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
                    mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
                    replace: true, // 是否转换后直接更换属性值
                    // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
                    exclude: [/node_modules/],
                    landscape: false, // 是否处理横屏情况
                }),
            ],
        },
    },
    resolve: {
        alias: {
            // import.meta.url 拿到当前文件所在的目录
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8089',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
        },
        port: 3000
    },
})

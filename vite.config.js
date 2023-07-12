import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [AntDesignVueResolver()],
        })
    ],
    build: {
        outDir: process.env.VITE_OUT_DIR || "dist",
        assetsDir: process.env.VITE_ASSETS_DIR || "assets",
        rollupOptions: {
            output: {
                manualChunks(id, {getModuleInfo, getModuleIds}) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                },
            },
        },
    },
})

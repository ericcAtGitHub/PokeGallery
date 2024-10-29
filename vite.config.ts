import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pkgJSON from "./package.json" 

const _base = '/PokeGallery/'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    define: {
        __POKE_GALLERY_VER__: JSON.stringify(pkgJSON.version),
    },

    // https://github.com/vitejs/vite/discussions/8467
    server: {
        open: true,
    },

    build: {
        outDir: 'docs' // fitting GitHub's structure
    },

    base: _base // fitting GitHub's structure
})

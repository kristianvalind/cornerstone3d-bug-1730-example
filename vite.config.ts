import { defineConfig } from "vite";
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

const headers = {
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Embedder-Policy": "require-corp",
};

import { viteDevMiddleware } from "./src/vite-dev-middleware";

export default defineConfig(() => {
    return {
        build: {
            outDir: "build",
            minify: true,
        },
        worker: {
            format: "es",
        },
        assetsInclude: [
        ],
        server: {
            port: 3127,
            headers,
            host: "127.0.0.1",
        },
        clearScreen: false,
        plugins: [
            viteCommonjs(),
            {
                name: "dev-middleware",
                configureServer: server => {
                    server.middlewares.use((req, res, next) => {
                        const handled = viteDevMiddleware(req, res);
                        if (!handled) {
                            next();
                        }
                    });
                },
            },
        ],
        optimizeDeps: {
            exclude: ['@cornerstonejs/dicom-image-loader'],
            include: ['dicom-parser'],
        },
    };
});
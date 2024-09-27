//import { sveltekit } from "@sveltejs/kit/vite";
//import { defineConfig } from "vitest/config";
//
//export default defineConfig(({ command }) => {
//  const isDevelopment = command === "serve";
//
//  return {
//    plugins: [sveltekit()],
//
//    server: {
//      ...(isDevelopment && {
//        https: {
//          key: "localhost.key",
//          cert: "localhost.crt",
//        },
//      }),
//    },
//
//    test: {
//      include: ["src/**/*.{test,spec}.{js,ts}"],
//    },
//
//    css: {
//      preprocessorOptions: {
//        scss: {
//          additionalData: '@use "src/variables.scss" as *;',
//        },
//      },
//    },
//  };
//});
//import { sveltekit } from '@sveltejs/kit/vite';
//import { defineConfig } from 'vitest/config';
//import path from 'path';
//
//export default defineConfig(({ command }) => {
//  const isDevelopment = command === 'serve';
//
//  return {
//    plugins: [sveltekit()],
//    server: {
//      ...(isDevelopment && {
//        https: {
//          key: path.resolve(__dirname, 'localhost.key'),
//          cert: path.resolve(__dirname, 'localhost.crt'),
//        },
//      }),
//    },
//    test: {
//      include: ['src/**/*.{test,spec}.{js,ts}'],
//    },
//    css: {
//      preprocessorOptions: {
//        scss: {
//          additionalData: '@use "src/variables.scss" as *;',
//        },
//      },
//    },
//  };
//});
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
export default defineConfig(({ command }) => {
    const isDevelopment = command === 'serve';
    return {
        plugins: [sveltekit()],
        server: {
            ...(isDevelopment && {
                https: {
                    key: path.resolve(__dirname, 'localhost.key'),
                    cert: path.resolve(__dirname, 'localhost.crt'),
                },
            }),
        },
        test: {
            include: ['src/**/*.{test,spec}.{js,ts}'],
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "src/variables.scss" as *;',
                },
            },
        },
    };
});
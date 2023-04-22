import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";
import sveltePreprocess from "svelte-preprocess";
/// <reference types="vitest" />
import { internalIpV4 } from "internal-ip";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const mobile =
  process.env.TAURI_PLATFORM === "android" ||
  process.env.TAURI_PLATFORM === "ios";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const host = await internalIpV4();

  /** @type {import('vite').UserConfig} */
  return {
    resolve: {
      alias: {
        svelte: resolve(__dirname, "node_modules/svelte"),
      },
    },
    plugins: [
      svelte({
        preprocess: [
          sveltePreprocess({
            typescript: true,
          }),
        ],
      }),
      tsconfigPaths(),
      VitePWA({
        registerType: "autoUpdate", // TODO: Change to "prompt". We need to add a window to show the prompt
        strategies: "generateSW",
        devOptions: { enabled: true },
        manifest: {
          name: "Tinnitus Reducer ACRN",
          short_name: "Tinnitus Reducer ACRN",
          description:
            "Help you reduce your tinnitus using ACRN (= Acoustic Coordinated Reset Neuromodulation) treatment.",
          theme_color: "#593e9e",
          icons: [
            {
              src: "/tinnitus-reducer-acrn/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/tinnitus-reducer-acrn/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/tinnitus-reducer-acrn/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
          display: "standalone",
        },
      }),
    ],
    test: {
      include: ["src/tests/**/*.{js,ts}"],
      threads: false,
      globals: true,
      environment: "jsdom",
      browser: {
        enabled: true,
        name: "edge",
        headless: true,
      },
    },
    define: {
      "import.meta.vitest": undefined,
    },
    base: "./",

    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    // prevent vite from obscuring rust errors
    clearScreen: false,
    // tauri expects a fixed port, fail if that port is not available
    server: {
      host: "0.0.0.0",
      port: 5173,
      strictPort: true,
      hmr: {
        protocol: "ws",
        host,
        port: 5183,
      },
    },
    // to make use of `TAURI_DEBUG` and other env variables
    // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
    envPrefix: ["VITE_", "TAURI_"],
    build: {
      // Tauri supports es2021
      target:
        process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
      // don't minify for debug builds
      minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
      // produce sourcemaps for debug builds
      sourcemap: !!process.env.TAURI_DEBUG,
    },
    esbuild: {
      // drop console and debugger statements in production
      drop: mode === "production" ? ["console", "debugger"] : [],
    } as any, // This any is needed because of ESBuildOptions type doesn't have the drop property
  };
});

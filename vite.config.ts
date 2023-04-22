import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";
import sveltePreprocess from "svelte-preprocess";
/// <reference types="vitest" />
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const mobile =
  process.env.TAURI_PLATFORM === "android" ||
  process.env.TAURI_PLATFORM === "ios";

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig(async ({ mode }) => ({
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
    VitePWA({ registerType: "autoUpdate", devOptions: { enabled: true } }),
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
    port: 1420,
    strictPort: true,
  },
  // to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    // Tauri supports es2021
    target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  esbuild: {
    // drop console and debugger statements in production
    drop: mode === "production" ? ["console", "debugger"] : [],
  } as any, // This any is needed because of ESBuildOptions type doesn't have the drop property
}));

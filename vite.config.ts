import { app, metaTags } from "./meta";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import HtmlConfig from "vite-plugin-html-config";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { VitePluginFonts } from "vite-plugin-fonts";
import Components from "unplugin-vue-components/vite";
import pluginRewriteAll from "vite-plugin-rewrite-all";

const ENV = loadEnv("development", process.cwd());

export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  build: {
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    vue(),
    HtmlConfig({
      metas: metaTags(ENV),
    }),
    Components({
      dts: "./src/components.d.ts",
    }),
    pluginRewriteAll(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        cleanupOutdatedCaches: false,
        sourcemap: true,
        offlineGoogleAnalytics: true,
        clientsClaim: true,
        skipWaiting: true,
      },
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "masked-icon.svg",
        "assets/*",
      ],
      manifest: {
        name: app.name,
        short_name: app.shortName,
        description: app.description,
        theme_color: app.app.background,
        start_url: "/?source=pwa",
        categories: app.categories,
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "mask-icon.png",
            sizes: "196x196",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
    VitePluginFonts({
      google: {
        families: [
          "Lato:wght@400;500;600;700;800",
          "Inter:wght@400;500;600;700;800",
        ],
      },
    }),
  ],
});

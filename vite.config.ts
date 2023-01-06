import { app, metaTags } from "./meta";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import HtmlConfig from "vite-plugin-html-config";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { VitePluginFonts } from "vite-plugin-fonts";
import Components from "unplugin-vue-components/vite";

export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  build: {
    emptyOutDir: true,
  },
  plugins: [
    vue(),
    HtmlConfig({
      metas: metaTags(),
    }),
    Components({
      dts: "./src/components.d.ts",
    }),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        offlineGoogleAnalytics: true,
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg", "assets/*"],
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
          {
            src: "banner-og.png",
            type: "image/png",
          },
        ],
      },
    }),
    VitePluginFonts({
      google: {
        families: ["Lato:wght@400;500;600;700;800", "Inter:wght@400;500;600;700;800"],
      },
    }),
  ],
});

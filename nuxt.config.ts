import { app, metaTags } from "./meta";
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  app: {
    head: {
      meta: [...metaTags()],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap",
        },
      ],
    },
  },
  runtimeConfig: {
    app: {
      SUPABASE_URL: process.env.VITE_SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_KEY,
    },
  },
  css: ["~/assets/style/main.css"],
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxtjs/supabase", "@vite-pwa/nuxt"],
  components: {
    global: true,
    dirs: ["~/components/Atoms", "~/components/Molecules", "~/components/Organisms"],
  },
  pwa: {
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
  },
  vite: {
    plugins: [svgLoader()],
  },
});

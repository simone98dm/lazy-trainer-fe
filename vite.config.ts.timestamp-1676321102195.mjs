// meta.ts
var app = {
  name: "Lazy Trainer",
  shortName: "Trainer",
  shortDescription: "Easily track your workout activities",
  description: "Easily track your workout activities throughout the week",
  keywords: "lifestyle, health, fitness, tracking, workout",
  app: {
    background: "#4f46e5",
  },
  categories: ["lifestyle", "health", "fitness", "tracking", "workout"],
  author: "simone98dm",
};
var metaTags = () => [
  {
    name: "keywords",
    content: app.keywords,
  },
  {
    name: "X-UA-Compatible",
    content: "IE=edge, chrome=1",
  },
  {
    name: "name",
    content: `${app.name} \u2022 ${app.shortDescription}`,
  },
  {
    name: "description",
    content: app.description,
  },
  {
    name: "image",
    content: `/banner-og.png`,
  },
  {
    name: "og:title",
    content: `${app.name} \u2022 ${app.shortDescription}`,
  },
  {
    name: "og:description",
    content: app.description,
  },
  {
    name: "og:image",
    content: `/banner-og.png`,
  },
  {
    name: "twitter:card",
    content: "summary_large_image",
  },
  {
    name: "twitter:site",
    content: app.author,
  },
  {
    name: "twitter:creator",
    content: app.author,
  },
  {
    name: "twitter:title",
    content: `${app.name} \u2022 ${app.shortDescription}`,
  },
  {
    name: "twitter:description",
    content: app.description,
  },
  {
    name: "twitter:image",
    content: `banner-og.png`,
  },
  {
    name: "application-name",
    content: app.name,
  },
  {
    name: "msapplication-TileImage",
    content: `icon.png`,
  },
  {
    name: "msapplication-TileColor",
    content: app.app.background,
  },
  {
    name: "msapplication-tap-highlight",
    content: "no",
  },
  {
    name: "apple-mobile-web-app-title",
    content: app.name,
  },
  {
    name: "apple-mobile-web-app-capable",
    content: "yes",
  },
  {
    name: "apple-mobile-web-app-status-bar-style",
    content: "black-translucent",
  },
  {
    name: "theme-color",
    content: app.app.background,
  },
  {
    name: "mask-icon",
    content: "/icon.png",
    color: app.app.background,
  },
];

// vite.config.ts
import { defineConfig } from "file:///Users/simonedalmas/source/lazy-trainer/lazy-trainer-fe/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///Users/simonedalmas/source/lazy-trainer/lazy-trainer-fe/node_modules/vite-plugin-pwa/dist/index.mjs";
import HtmlConfig from "file:///Users/simonedalmas/source/lazy-trainer/lazy-trainer-fe/node_modules/vite-plugin-html-config/dist/index.js";
import vue from "file:///Users/simonedalmas/source/lazy-trainer/lazy-trainer-fe/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { VitePluginFonts } from "file:///Users/simonedalmas/source/lazy-trainer/lazy-trainer-fe/node_modules/vite-plugin-fonts/dist/index.js";
import Components from "file:///Users/simonedalmas/source/lazy-trainer/lazy-trainer-fe/node_modules/unplugin-vue-components/dist/vite.mjs";
var __vite_injected_original_dirname = "/Users/simonedalmas/source/lazy-trainer/lazy-trainer-fe";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__vite_injected_original_dirname, "src")}/`,
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
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWV0YS50cyIsICJ2aXRlLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9zaW1vbmVkYWxtYXMvc291cmNlL2xhenktdHJhaW5lci9sYXp5LXRyYWluZXItZmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9zaW1vbmVkYWxtYXMvc291cmNlL2xhenktdHJhaW5lci9sYXp5LXRyYWluZXItZmUvbWV0YS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvc2ltb25lZGFsbWFzL3NvdXJjZS9sYXp5LXRyYWluZXIvbGF6eS10cmFpbmVyLWZlL21ldGEudHNcIjtleHBvcnQgY29uc3QgYXBwID0ge1xuICBuYW1lOiBcIkxhenkgVHJhaW5lclwiLFxuICBzaG9ydE5hbWU6IFwiVHJhaW5lclwiLFxuICBzaG9ydERlc2NyaXB0aW9uOiBcIkVhc2lseSB0cmFjayB5b3VyIHdvcmtvdXQgYWN0aXZpdGllc1wiLFxuICBkZXNjcmlwdGlvbjogXCJFYXNpbHkgdHJhY2sgeW91ciB3b3Jrb3V0IGFjdGl2aXRpZXMgdGhyb3VnaG91dCB0aGUgd2Vla1wiLFxuICBrZXl3b3JkczogXCJsaWZlc3R5bGUsIGhlYWx0aCwgZml0bmVzcywgdHJhY2tpbmcsIHdvcmtvdXRcIixcbiAgYXBwOiB7XG4gICAgYmFja2dyb3VuZDogXCIjNGY0NmU1XCIsXG4gIH0sXG4gIGNhdGVnb3JpZXM6IFtcImxpZmVzdHlsZVwiLCBcImhlYWx0aFwiLCBcImZpdG5lc3NcIiwgXCJ0cmFja2luZ1wiLCBcIndvcmtvdXRcIl0sXG4gIGF1dGhvcjogXCJzaW1vbmU5OGRtXCIsXG59O1xuXG5leHBvcnQgY29uc3QgbWV0YVRhZ3MgPSAoKSA9PiBbXG4gIHtcbiAgICBuYW1lOiBcImtleXdvcmRzXCIsXG4gICAgY29udGVudDogYXBwLmtleXdvcmRzLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJYLVVBLUNvbXBhdGlibGVcIixcbiAgICBjb250ZW50OiBcIklFPWVkZ2UsIGNocm9tZT0xXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIm5hbWVcIixcbiAgICBjb250ZW50OiBgJHthcHAubmFtZX0gXHUyMDIyICR7YXBwLnNob3J0RGVzY3JpcHRpb259YCxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZGVzY3JpcHRpb25cIixcbiAgICBjb250ZW50OiBhcHAuZGVzY3JpcHRpb24sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImltYWdlXCIsXG4gICAgY29udGVudDogYC9iYW5uZXItb2cucG5nYCxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwib2c6dGl0bGVcIixcbiAgICBjb250ZW50OiBgJHthcHAubmFtZX0gXHUyMDIyICR7YXBwLnNob3J0RGVzY3JpcHRpb259YCxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwib2c6ZGVzY3JpcHRpb25cIixcbiAgICBjb250ZW50OiBhcHAuZGVzY3JpcHRpb24sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIm9nOmltYWdlXCIsXG4gICAgY29udGVudDogYC9iYW5uZXItb2cucG5nYCxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwidHdpdHRlcjpjYXJkXCIsXG4gICAgY29udGVudDogXCJzdW1tYXJ5X2xhcmdlX2ltYWdlXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInR3aXR0ZXI6c2l0ZVwiLFxuICAgIGNvbnRlbnQ6IGFwcC5hdXRob3IsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInR3aXR0ZXI6Y3JlYXRvclwiLFxuICAgIGNvbnRlbnQ6IGFwcC5hdXRob3IsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInR3aXR0ZXI6dGl0bGVcIixcbiAgICBjb250ZW50OiBgJHthcHAubmFtZX0gXHUyMDIyICR7YXBwLnNob3J0RGVzY3JpcHRpb259YCxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwidHdpdHRlcjpkZXNjcmlwdGlvblwiLFxuICAgIGNvbnRlbnQ6IGFwcC5kZXNjcmlwdGlvbixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwidHdpdHRlcjppbWFnZVwiLFxuICAgIGNvbnRlbnQ6IGBiYW5uZXItb2cucG5nYCxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYXBwbGljYXRpb24tbmFtZVwiLFxuICAgIGNvbnRlbnQ6IGFwcC5uYW1lLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJtc2FwcGxpY2F0aW9uLVRpbGVJbWFnZVwiLFxuICAgIGNvbnRlbnQ6IGBpY29uLnBuZ2AsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIm1zYXBwbGljYXRpb24tVGlsZUNvbG9yXCIsXG4gICAgY29udGVudDogYXBwLmFwcC5iYWNrZ3JvdW5kLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJtc2FwcGxpY2F0aW9uLXRhcC1oaWdobGlnaHRcIixcbiAgICBjb250ZW50OiBcIm5vXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImFwcGxlLW1vYmlsZS13ZWItYXBwLXRpdGxlXCIsXG4gICAgY29udGVudDogYXBwLm5hbWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImFwcGxlLW1vYmlsZS13ZWItYXBwLWNhcGFibGVcIixcbiAgICBjb250ZW50OiBcInllc1wiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJhcHBsZS1tb2JpbGUtd2ViLWFwcC1zdGF0dXMtYmFyLXN0eWxlXCIsXG4gICAgY29udGVudDogXCJibGFjay10cmFuc2x1Y2VudFwiLFxuICB9LFxuICAvLyBQV0FcbiAge1xuICAgIG5hbWU6IFwidGhlbWUtY29sb3JcIixcbiAgICBjb250ZW50OiBhcHAuYXBwLmJhY2tncm91bmQsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIm1hc2staWNvblwiLFxuICAgIGNvbnRlbnQ6IFwiL2ljb24ucG5nXCIsXG4gICAgY29sb3I6IGFwcC5hcHAuYmFja2dyb3VuZCxcbiAgfSxcbl07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9zaW1vbmVkYWxtYXMvc291cmNlL2xhenktdHJhaW5lci9sYXp5LXRyYWluZXItZmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9zaW1vbmVkYWxtYXMvc291cmNlL2xhenktdHJhaW5lci9sYXp5LXRyYWluZXItZmUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3NpbW9uZWRhbG1hcy9zb3VyY2UvbGF6eS10cmFpbmVyL2xhenktdHJhaW5lci1mZS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGFwcCwgbWV0YVRhZ3MgfSBmcm9tIFwiLi9tZXRhXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcbmltcG9ydCBIdG1sQ29uZmlnIGZyb20gXCJ2aXRlLXBsdWdpbi1odG1sLWNvbmZpZ1wiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgVml0ZVBsdWdpbkZvbnRzIH0gZnJvbSBcInZpdGUtcGx1Z2luLWZvbnRzXCI7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwifi9cIjogYCR7cGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIil9L2AsXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIEh0bWxDb25maWcoe1xuICAgICAgbWV0YXM6IG1ldGFUYWdzKCksXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICBkdHM6IFwiLi9zcmMvY29tcG9uZW50cy5kLnRzXCIsXG4gICAgfSksXG4gICAgVml0ZVBXQSh7XG4gICAgICByZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxuICAgICAgd29ya2JveDoge1xuICAgICAgICBvZmZsaW5lR29vZ2xlQW5hbHl0aWNzOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGluY2x1ZGVBc3NldHM6IFtcImZhdmljb24uaWNvXCIsIFwiYXBwbGUtdG91Y2gtaWNvbi5wbmdcIiwgXCJtYXNrZWQtaWNvbi5zdmdcIiwgXCJhc3NldHMvKlwiXSxcbiAgICAgIG1hbmlmZXN0OiB7XG4gICAgICAgIG5hbWU6IGFwcC5uYW1lLFxuICAgICAgICBzaG9ydF9uYW1lOiBhcHAuc2hvcnROYW1lLFxuICAgICAgICBkZXNjcmlwdGlvbjogYXBwLmRlc2NyaXB0aW9uLFxuICAgICAgICB0aGVtZV9jb2xvcjogYXBwLmFwcC5iYWNrZ3JvdW5kLFxuICAgICAgICBzdGFydF91cmw6IFwiLz9zb3VyY2U9cHdhXCIsXG4gICAgICAgIGNhdGVnb3JpZXM6IGFwcC5jYXRlZ29yaWVzLFxuICAgICAgICBpY29uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCJhbmRyb2lkLWNocm9tZS0xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCJhbmRyb2lkLWNocm9tZS01MTJ4NTEyLnBuZ1wiLFxuICAgICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCJtYXNrLWljb24ucG5nXCIsXG4gICAgICAgICAgICBzaXplczogXCIxOTZ4MTk2XCIsXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBcImJhbm5lci1vZy5wbmdcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgVml0ZVBsdWdpbkZvbnRzKHtcbiAgICAgIGdvb2dsZToge1xuICAgICAgICBmYW1pbGllczogW1wiTGF0bzp3Z2h0QDQwMDs1MDA7NjAwOzcwMDs4MDBcIiwgXCJJbnRlcjp3Z2h0QDQwMDs1MDA7NjAwOzcwMDs4MDBcIl0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdWLElBQU0sTUFBTTtBQUFBLEVBQzFWLE1BQU07QUFBQSxFQUNOLFdBQVc7QUFBQSxFQUNYLGtCQUFrQjtBQUFBLEVBQ2xCLGFBQWE7QUFBQSxFQUNiLFVBQVU7QUFBQSxFQUNWLEtBQUs7QUFBQSxJQUNILFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxZQUFZLENBQUMsYUFBYSxVQUFVLFdBQVcsWUFBWSxTQUFTO0FBQUEsRUFDcEUsUUFBUTtBQUNWO0FBRU8sSUFBTSxXQUFXLE1BQU07QUFBQSxFQUM1QjtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sU0FBUyxJQUFJO0FBQUEsRUFDZjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sU0FBUyxHQUFHLElBQUksZUFBVSxJQUFJO0FBQUEsRUFDaEM7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixTQUFTLElBQUk7QUFBQSxFQUNmO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLEVBQ1g7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixTQUFTLEdBQUcsSUFBSSxlQUFVLElBQUk7QUFBQSxFQUNoQztBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLFNBQVMsSUFBSTtBQUFBLEVBQ2Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsRUFDWDtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sU0FBUyxJQUFJO0FBQUEsRUFDZjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLFNBQVMsSUFBSTtBQUFBLEVBQ2Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixTQUFTLEdBQUcsSUFBSSxlQUFVLElBQUk7QUFBQSxFQUNoQztBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLFNBQVMsSUFBSTtBQUFBLEVBQ2Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsRUFDWDtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLFNBQVMsSUFBSTtBQUFBLEVBQ2Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsRUFDWDtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLFNBQVMsSUFBSSxJQUFJO0FBQUEsRUFDbkI7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsRUFDWDtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLFNBQVMsSUFBSTtBQUFBLEVBQ2Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsRUFDWDtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFFQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sU0FBUyxJQUFJLElBQUk7QUFBQSxFQUNuQjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNULE9BQU8sSUFBSSxJQUFJO0FBQUEsRUFDakI7QUFDRjs7O0FDM0dBLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsZUFBZTtBQUN4QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsdUJBQXVCO0FBQ2hDLE9BQU8sZ0JBQWdCO0FBUHZCLElBQU0sbUNBQW1DO0FBU3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLE1BQU0sR0FBRyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQ3hDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsYUFBYTtBQUFBLEVBQ2Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLFdBQVc7QUFBQSxNQUNULE9BQU8sU0FBUztBQUFBLElBQ2xCLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULEtBQUs7QUFBQSxJQUNQLENBQUM7QUFBQSxJQUNELFFBQVE7QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkLFNBQVM7QUFBQSxRQUNQLHdCQUF3QjtBQUFBLE1BQzFCO0FBQUEsTUFDQSxlQUFlLENBQUMsZUFBZSx3QkFBd0IsbUJBQW1CLFVBQVU7QUFBQSxNQUNwRixVQUFVO0FBQUEsUUFDUixNQUFNLElBQUk7QUFBQSxRQUNWLFlBQVksSUFBSTtBQUFBLFFBQ2hCLGFBQWEsSUFBSTtBQUFBLFFBQ2pCLGFBQWEsSUFBSSxJQUFJO0FBQUEsUUFDckIsV0FBVztBQUFBLFFBQ1gsWUFBWSxJQUFJO0FBQUEsUUFDaEIsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE1BQU07QUFBQSxVQUNSO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELGdCQUFnQjtBQUFBLE1BQ2QsUUFBUTtBQUFBLFFBQ04sVUFBVSxDQUFDLGlDQUFpQyxnQ0FBZ0M7QUFBQSxNQUM5RTtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=

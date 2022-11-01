export const app = {
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

export const metaTags = () => [
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
    content: `${app.name} • ${app.shortDescription}`,
  },
  {
    name: "description",
    content: app.description,
  },
  {
    name: "image",
    content: `/banner.png`,
  },
  {
    name: "og:title",
    content: `${app.name} • ${app.shortDescription}`,
  },
  {
    name: "og:description",
    content: app.description,
  },
  {
    name: "og:image",
    content: `/banner.png`,
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
    content: `${app.name} • ${app.shortDescription}`,
  },
  {
    name: "twitter:description",
    content: app.description,
  },
  {
    name: "twitter:image",
    content: `banner.png`,
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
  // PWA
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

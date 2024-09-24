import { apiEndpoint, repositoryName } from "./slicemachine.config.json";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/prismic",
    "nuxt-svgo-loader",
    "@nuxt/scripts",
    "@nuxt/eslint",
  ],

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => {
        return ["r-grid", "r-cell"].indexOf(tag) > -1;
      },
    },
  },

  prismic: {
    endpoint: apiEndpoint || repositoryName,

    clientConfig: {
      routes: [
        // Resolves the Homepage document to "/"
        {
          type: "home",
          path: "/",
        },
        {
          type: "work",
          path: "/work/:uid",
        },
        {
          type: "about_new",
          path: "/about/",
        },
        {
          type: "blog_home",
          path: "/journal/",
        },
        {
          type: "blog_post",
          path: "/journal/:uid",
        },
      ],
    },
  },
});

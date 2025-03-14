import { createClient } from "@prismicio/client";
import { repositoryName } from "./slicemachine.config.json";
// https://nuxt.com/docs/api/configuration/nuxt-config
async function generatePrerenderRoutes() {
  const prismic = createClient(repositoryName);

  // Fetch dynamic content from Prismic
  const [workPages, blogPosts] = await Promise.all([
    prismic.getAllByType("work"),
    prismic.getAllByType("blog_post"),
  ]);

  return [
    // Work dynamic routes
    ...workPages.map((page) => `/work/${page.uid}`),

    // Blog post dynamic routes
    ...blogPosts.map((post) => `/journal/${post.uid}`),
  ];
}

export default (async () => {
  const prerenderRoutes = await generatePrerenderRoutes();

  return defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    ssr: true,
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

    nitro: {
      prerender: {
        routes: prerenderRoutes,
        crawlLinks: true, // Auto-discover links
      },
    },

    prismic: {
      endpoint: repositoryName,

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
})();

import { createClient } from "@prismicio/client";
import { fileURLToPath } from "node:url";
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
    compatibilityDate: "2025-12-30",
    devtools: { enabled: true },
    // Remove inline JSON payloads
    experimental: { renderJsonPayloads: false },
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

    vite: {
      resolve: {
        alias: {
          // Work around broken export in `unenv` so Vite can resolve this mock module.
          // See: Nuxt build error "failed to resolve import 'unenv/runtime/mock/noop'".
          "unenv/runtime/mock/noop": fileURLToPath(
            new URL(
              "./node_modules/unenv/dist/runtime/mock/noop.mjs",
              import.meta.url,
            ),
          ),
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

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

// https://github.com/samber/the-great-gpt-firewall
const robots = [
  // OpenAI’s web crawler: GPT3.5, GPT4, ChatGPT
  "GPTBot",

  // ChatGPT plugins
  "ChatGPT-User",

  // Google's web crawler: Bard, VertexAI, Gemini
  "Google-Extended",

  // Claude
  "anthropic-ai",

  // Common Crawl
  "CCBot",

  // Omglibot: webz.io
  "Omgilibot",
  "Omgili",

  // LLaMA2
  "FacebookBot",

  // ByteDance: Duobao
  "Bytespider",
];

module.exports = {
  siteMetadata: {
    title: "wray.pro",
    description:
      "The polyamorous relationship of music, programming and visual arts.",
  },
  plugins: [
    "gatsby-plugin-remove-generator",
    {
      resolve: "gatsby-source-prismic",
      options: {
        repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
        linkResolver: require("./link-resolver.js").linkResolver,
        customTypesApiToken: process.env.PRISMIC_CUSTOM_TYPES_API_TOKEN,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/favicon.png",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    // {
    //   resolve: 'gatsby-plugin-google-fonts',
    //   options: {
    //     fonts: [`Lato\:400,400,700,700i,900`, `Amiri\:400,400,700,700i`],
    //   },
    // },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },

    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        policy: [
          ...robots.map((userAgent) => ({ userAgent, disallow: ["/"] })),
        ],
        sitemap: null,
        host: null,
      },
    },
  ],
};

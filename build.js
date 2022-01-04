const argv = require("yargs").option("watch", {
  default: false,
}).argv;

const Metalsmith = require("metalsmith");

const nodeStatic = require("node-static");
const watch = require("glob-watcher");
const changed = require("metalsmith-changed");

const copy = require("metalsmith-copy");
const permalinks = require("metalsmith-permalinks");
const collections = require("metalsmith-collections");
const addmeta = require("metalsmith-collections-addmeta");
const layouts = require("metalsmith-layouts");
const markdown = require("metalsmith-markdown");
const excerpts = require("metalsmith-excerpts");
const partials = require("metalsmith-discover-partials");
const helpers = require("metalsmith-register-helpers");
const assets = require("metalsmith-assets");
const sass = require("metalsmith-sass");
const wordcount = require("metalsmith-word-count");
const drafts = require("metalsmith-drafts");
const feed = require("metalsmith-feed");
const htmlMinifier = require("metalsmith-html-minifier");
const paginate = require("metalsmith-paginate");
const tags = require("metalsmith-tags");
const disqus = require("metalsmith-disqus");
const imagemin = require("metalsmith-imagemin");
const replace = require("metalsmith-text-replace");
const livereload = require("metalsmith-livereload");

const DIR = __dirname;

let clean = true;

function clock(start) {
  if (!start) return process.hrtime();

  const end = process.hrtime(start);
  return Math.round(end[0] * 1000 + end[1] / 1000000);
}

const build = (done) => {
  console.log(`🛠  Building...`);
  if (clean) {
    console.log(`🛀  Clearing build folder`);
  }

  const buildTimeStart = clock();

  const ms = Metalsmith(DIR)
    .clean(clean)
    .use(changed())

    .metadata({
      site: {
        title: "wray.pro",
        url: "http://wray.pro/",
        description:
          "The polyamorous relationship of music, programming and visual arts.",
        author: "Sam Wray",
      },
    })
    .source("./src")
    .destination("./docs")

    .use(
      assets({
        source: "./assets", // relative to the working directory
        destination: "./assets", // relative to the docs directory
      })
    )

    .use(
      sass({
        outputDir: "./assets/css/", // relative to the docs directory
      })
    )

    .use(
      partials({
        directory: "./partials/",
        pattern: /\.hbs$/,
      })
    )

    .use(
      helpers({
        directory: "./helpers/",
      })
    )

    .use(drafts())
    .use(markdown())
    .use(excerpts())
    .use(wordcount())

    .use(
      collections({
        portfolio: {
          pattern: "/*.md",
          limit: 100,
        },
        blog: {
          pattern: "blog/*.md",
          sortBy: "date",
          reverse: true,
        },
      })
    )

    .use(
      addmeta({
        portfolio: {
          layout: "portfolio-item.html",
        },
      })
    )

    .use(
      paginate({
        perPage: 10,
        path: "blog/page",
      })
    )

    .use(
      permalinks({
        relative: false,
      })
    )

    .use(
      tags({
        handle: "tags", // yaml key for tag list in you pages
        path: "blog/topics/:tag.html",
        layout: "tag.hbt",
        sortBy: "date",
        reverse: true,
        // skip updating metalsmith's metadata object.
        // useful for improving performance on large blogs
        // (optional)
        skipMetadata: false,
        // Any options you want to pass to the [slug](https://github.com/dodo/node-slug) package.
        // Can also supply a custom slug function.
        // slug: function(tag) { return tag.toLowerCase() }
        slug: { mode: "rfc3986" },
      })
    )

    .use(
      permalinks({
        relative: false,
      })
    )

    .use(
      feed({
        collection: "blog",
        destination: "./rss/index.xml",
      })
    )

    .use(
      layouts({
        engine: "handlebars",
      })
    )

    .use(
      disqus({
        siteurl: "http://wray.pro/",
        shortname: "wraypro",
      })
    )

    .use(
      htmlMinifier({
        quoteCharacter: "'",
      })
    )

    .use(
      copy({
        pattern: "google2f053618a450ec87",
        transform: function (file) {
          return file + ".html";
        },
        directory: "",
        move: true,
      })
    )

    .use(
      replace({
        "**/*.html": {
          find: "target=_blank",
          replace: "target=_blank rel=noopener",
        },
      })
    );

  if (clean) {
    ms.use(
      imagemin({
        optimizationLevel: 3,
      })
    );
  }

  if (argv.watch) {
    ms.use(livereload());
  }

  ms.build((err) => {
    const buildTimeEnd = clock(buildTimeStart);
    console.log("👨‍🍳  Built in", `${buildTimeEnd}ms`);
    clean = false;
    if (done) {
      done(err);
    }
  });
};

/**
 * Serve files.
 */
if (argv.watch) {
  console.clear();
  console.log("👁  watching /src/**");

  const serve = new nodeStatic.Server(DIR + "/docs");
  require("http")
    .createServer((req, res) => {
      req.addListener("end", () => serve.serve(req, res));
      req.resume();
    })
    .listen(8080, () => {
      console.log("📡  Serving on http://localhost:8080");
    });

  /**
   * Watch files.
   */
  watch(
    [DIR + "/src/**"],
    {
      ignoreInitial: false,
    },
    build
  );
} else {
  build();
}

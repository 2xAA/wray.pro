const Metalsmith	= require('metalsmith');
const metalsmithExpress	= require('metalsmith-express');
//const watch			= require('metalsmith-watch');


const permalinks	= require('metalsmith-permalinks');
const collections	= require('metalsmith-collections');
const layouts		= require('metalsmith-layouts');
const markdown		= require('metalsmith-markdown');
const excerpts		= require('metalsmith-excerpts');
const partials		= require('metalsmith-discover-partials');
const assets		= require('metalsmith-assets');
const sass			= require('metalsmith-sass');

new Metalsmith(__dirname)
	.metadata({
		sitename: "wray.pro",
		siteurl: "http://wray.pro/",
		description: "The polygamous relationship of music, programming and visual arts."
	})
	.source('./src')
	.destination('./build')
	.clean(true)

	.use(assets({
		source: './assets', // relative to the working directory
		destination: './assets' // relative to the build directory
	}))

	.use(sass({
		outputDir: './assets/css/' // relative to the build directory
	}))

	.use(partials({
		directory: './partials/',
		pattern: /\.hbs$/
	}))

	.use(collections({
		portfolio: {
			pattern: '/*.md',
			limit: 10
		},
		blog: 'blog/*.md'
	}))

	.use(excerpts())

	.use(markdown())

	.use(permalinks({
		relative: false
	}))

	.use(layouts({
		engine: 'handlebars',
	}))

	.use(metalsmithExpress({
		"liveReload": false,
		"liveReloadPort": 35729,
		"middleware": []
	}))

	// .use(watch({
	// 	paths: {
	// 		"${source}/**/*": true,
	// 		"layouts/**/*": "${source}/**/*"
	// 	},
	// 	livereload: true
	// }))
	
	.build(err => {
		if(err) throw err;
	});
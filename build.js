const Metalsmith	= require('metalsmith');
const metalsmithExpress	= require('metalsmith-express');

const permalinks	= require('metalsmith-permalinks');
const collections	= require('metalsmith-collections');
const addmeta		= require('metalsmith-collections-addmeta');
const layouts		= require('metalsmith-layouts');
const markdown		= require('metalsmith-markdown');
const excerpts		= require('metalsmith-excerpts');
const partials		= require('metalsmith-discover-partials');
const helpers		= require('metalsmith-register-helpers');
const assets		= require('metalsmith-assets');
const sass			= require('metalsmith-sass');
const msSymlink		= require('metalsmith-symlink');
const wordcount		= require('metalsmith-word-count');
const drafts		= require('metalsmith-drafts');
const feed			= require('metalsmith-feed');
const htmlMinifier	= require('metalsmith-html-minifier');

new Metalsmith(__dirname)
	.metadata({
		site: {
			title: 'wray.pro',
			url: 'http://wray.pro/',
			description: 'The polygamous relationship of music, programming and visual arts.',
			author: 'Sam Wray'
		}
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

	.use(helpers({
		directory: './helpers/',
	}))

	.use(drafts())
	.use(markdown())
	.use(excerpts())
	.use(wordcount())

	.use(collections({
		portfolio: {
			pattern: '/*.md',
			limit: 10
		},
		blog: {
			pattern: 'blog/*.md',
			sortBy: 'date',
			reverse: true
		}
	}))

	.use(addmeta({
		portfolio: {
			layout: 'portfolio-item.html'
		}
    }))

	.use(permalinks({
		relative: false
	}))

	.use(feed({
		collection: 'blog',
		destination: './rss/index.xml'
	}))
	
	.use(layouts({
		engine: 'handlebars',
	}))

	.use(msSymlink({
		paths: [{
			src: './static/',
			dest: 'static/'
		}]
	}))

	.use(metalsmithExpress({
		'liveReload': false,
		'liveReloadPort': 35729,
		'middleware': []
	}))
	
	.use(htmlMinifier({
		quoteCharacter: '\''
	}))

	.build(err => {
		if(err) throw err;
	});
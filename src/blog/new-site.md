---
title: New Site
date: 2017-02-26 17:11:00
layout: blog-item.html
collection: blog
tags: metalsmith, meta
comments: true
---

> But Sam, the site looks exactly the same.

Well, it pretty much is, apart from it's now all statically generated using [Metalsmith](http://www.metalsmith.io/).

> Metal-what?

Okay, for the main bulk of this site I used to use a static site generator called [Hammer](https://hammerformac.com/), which was pretty great. However, it lacked the customisation I wanted (also, it's macOS only and I've just bought myself the new [Dell XPS15 9560](http://www.dell.com/uk/p/xps-15-9560-laptop/pd?oc=cnx95604&model_id=xps-15-9560-laptop) so that's a no-go).  

I looked into Gulp and Yo generators for static sites but I fell into the "**OMFG NODEJS IS SOOOOOOOO AWESOME**" trap and got instantly overwhelmed by the amount of "assumed knowledge libraries" and their subsequent READMEs. (I'll probably write an article on assumed knowledge libs soon).  
Anyway, after some searching Metalsmith looked like a really nice solution.

However, Metalsmith's website is pretty awful at actually explaining its internals and again, there's a lot of assumed knowledge. Luckily, there's a lot of plugins which take their time to explain how they work with Metalsmith and I could figure a lot out; not ideal, but I didn't feel left in the dark. (I even wrote [a Metalsmith plugin](https://www.npmjs.com/package/metalsmith-symlink) which is my first npm package!)

For the blog, I used to use [Anchor](https://github.com/anchorcms/anchor-cms), a PHP based slimline CMS. It's pretty good and I'd recommend it to anybody confined to only using PHP over Wordpress any day. It's a lovely little system.  
But I want to move away from my current webhost this year so I thought let's just include the articles in the static site generation instead and not worry about databases and migration and blah blah blah.  
Metalsmith now handles both my portfolio items and my blog posts (which you'll see are a little easier to navigate now, still working on the styling okay? 😜)

Well, that's pretty much it - you can find this site on my GitHub [here](https://github.com/2xAA/wray.pro).
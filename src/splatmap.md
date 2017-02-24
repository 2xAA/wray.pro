---
title: Splatmap
date: 2012-08-20
layout: post.html
collection: portfolio
excerpt: Realtime 3D mapping using smartphone cameras and gamification, the winning submission from Hack The Visual in 2015.
thumbnail: splatmap.jpg
video: false
---

<p>
	Realtime 3D mapping using smartphone cameras and gamification, the winning submission from Hack The Visual in 2015 working with Dario Villanueva, Anthony Thomas, Bryan Yap and Evan Gillogley.
</p>
<p>
	The idea for this hack was to build a piece of software that would help people with their phones capture 3D images and terrain of the streets, roads and landscape around them for use in videogames, architecture, modelling and history.
</p>
<p>
	When playing Splatmap, the game would split connected players in a given area into two teams using geolocation and asked them to take as many photos of their surroundings as possible using an app within a minute. Whichever team’s photos generated the most valid 3D point clouds at the end of the minute would be the winners.
</p>
<a class="pure-button" href="https://www.youtube.com/watch?v=ZNArKCutTR8" title="'HACK THE VISUAL Overview' on YouTube" target="_blank">
	<i class="fa fa-youtube-square fa-lg"></i>
	Watch Imaging Mind's video
</a>

<p class="clearer">
	To create the 3D point clouds from the photos taken certain data needed to be sent to a piece of software Anthony worked on during the hack. This included the roll, pitch and azimuth of the smartphone when the photo was taken and an accurate GPS position.<br>
	Without creating a native Android or iOS app I found it almost impossible to obtain the roll, pitch and azimuth from the device being used due to differing device sensors and browser APIs. We made a decision early on at the hack to plot the generated point cloud at the location on the map from the GPS sent from the phone and ignore the orientation of the point cloud.
</p>
<p>
	The judges urged us to continue the project as they thought this could easily take off. With the judges comments in mind the team have decided to continue this project in our free time.
</p>
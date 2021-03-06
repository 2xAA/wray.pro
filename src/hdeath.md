---
title: "#Death"
date: 2017-01-07
collection: portfolio
excerpt: IoT installation symbolising the worldwide concern of death.
thumbnail: hdeath.jpg
video: true
youtube_id: HhwfezX1Lkc
---

<p>
	#Death was a collaboration project between myself, <a href="http://shauneo.com/" target="_blank">Shaune Oosthuizen</a> and a group of first years on my course (Digital Art and Technology) at Plymouth University.
</p>
<p>
	Using a combination of Arduino and Twitter, the project symbolises the worldwide concern of death.
</p>
<p>
	Using a small Python script on a Raspberry Pi, we polled Twitter each minute for the newest tweets with the hashtag 'death'.<br><br>
	We stored the last ID of the tweets returned to offset the result, so we could not miscount how many tweets were new.<br>
	Based on the count of the new tweets, we send to an Arduino Uno, over serial, the number of tweets. The Arduino then looped with a delay over the number and sent a signal to a relay attached to a washing machine valve attached to a large barrel of water.<br><br>
	All of this was mounted into the ceiling of our studio. We had a piece of wood cut to the same dimensions of a ceiling tile with a hole for the valve to sit in.<br><br>
	This would then drop 'blood'/dyed water into a vase positioned underneath.
</p>

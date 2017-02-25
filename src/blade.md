---
title: Blade
date: 2017-01-04
collection: portfolio
excerpt: BuzzJam 2015 hackday instrument built using Game Boys and Guitar Hero controllers.
thumbnail: blade.jpg
video: true
videoname: blade
---

Blade is a chiptune keytar built for <a href="http://www.themandusofficial.com" target="_blank">Them&amp;Us</a> by <a href="http://www.thereminhero.com/" target="_blank">Greig Stewart</a>, <a href="http://siddv.net/" target="_blank">Sidd Vadgama</a>, and myself at <a href="http://www.buzz-jam.com/">BuzzJam 2015.</a><br>
<br>
It is comprised of:

<ul>
	<li>2x hacked Guitar Hero guitars</li>
	<li>1x Rock Band keyboard</li>
	<li>2x Nintendo Game Boys</li>
	<li>1x Arduino MEGA</li>
	<li>1x Raspberry Pi</li>
	<li>1x Leap Motion</li>
	<li>1x WS2812B LED light strip</li>
	<li>∞x wiring</li>
</ul>

<p>
All of which are all housed in a custom 3D printed case.<br>
<br>
Blade was featured on the <a href="http://www.bbc.co.uk/newsbeat/article/34310120/six-emerging-music-acts-spend-two-days-making-six-new-instruments" target="_blank">BBC</a> and <a href="http://noisey.vice.com/en_uk/blog/buzz-jam-lets-artists-invent-their-own-musical-instrument" target="_blank">Vice</a>.
</p>

<div class="pure-u-1-1 clearer">
<h3>Building Blade</h3>
<h4>Prep work and the body</h4>
<p>
	BuzzJam, a music hackday where artists and coders collaborate, tasked us to build a new instrument.<br>
	Before the event, Greig, Sidd and I had many calls discussing potential ideas. Eventually after talking with our original artists (they couldn't make it) we went for a keytar with Nintendo Game Boys as synthesisers.<br>
	<br>
	Greig was in charge of modelling and printing the housing for the keytar. It was custom modelled to ensure great ergonomics, leave enough room for all of the components required and to look super cool 😎<br>
</p>
<h4>The Necks</h4>
<p>
	Guitar Hero controller necks were chosen not only for their form factor but also for their aesthetics, keeping them in-theme with the Game Boys. The necks were rewired to output the button presses to the Arduino MEGA. Luckily the buttons could easily be read using the Bounce library for Arduino and <code>INPUT_PULLUP</code> pin types - that made things very straightforward.<br>
	The MEGA captured the button presses and sent appropriate MIDI signals over USB serial into the Raspberry Pi.
</p>
<h4>Rock Band Keytar</h4>
<p>
	We stripped this down to the bare keyboard and had the MIDI also going into the Pi.
</p>
<h4>The Pi</h4>
<p>
	Taking in all the MIDI, and running it through PD Extended we got this to manage and re-map all the button presses from the necks. The PD sketch output to a MIDI thru box to split the MIDI data to the Game Boys.
</p>
<h4>The Game Boys</h4>
<p>
	Our two Game Boys were modded with a device called an <a href="https://github.com/trash80/Arduinoboy" target="_blank">ArduinoBoy</a> and a line output. The ArduinoBoy accepts MIDI signals and converts it into a format that is able to be send to software running on the Game Boy.<br>
	The software, called mGB, synthesised the signals into sound which were output through the modded line output 3.5mm jack and into the artist's laptop via an audio interface.<br>
	mGB's settings for sound output could be modified using the second keytar neck by sending MIDI CC events.
</p>
<h4>The Leap Motion</h4>
<p>
	This was built into one of the necks and was plugged directly into Them&amp;Us' laptop. On the laptop was their DAW and a program to detect a hand in front of the leap motion and translate distance into MIDI CC events they could map to any control in the DAW.
</p>
</div>
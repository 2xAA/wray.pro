---
title: Stardis
date: 2017-01-03
collection: portfolio
excerpt: BuzzJam 2016 hackday instrument. MIDI Controller/Lighting Controller/stand-alone sampler.
thumbnail: stardis.jpg
video: true
youtube_id: PLn3SwdUYCMgKGy6OrVI_1zYA8uubAJ8h8
playlist: true
widescreen: true
---

Stardis is a standalone sampler, lighting and MIDI controller built for <a href="http://www.lake-komo.com/" target="_blank">Lake Komo</a> by <a href="http://www.thereminhero.com/" target="_blank">Greig Stewart</a>, <a href="http://siddv.net/" target="_blank">Sidd Vadgama</a>, and myself at <a href="http://www.buzz-jam.com/">BuzzJam 2016.</a>

BuzzJam, a music hackday where artists and coders collaborate, tasked us to build a new instrument.<br>
Before the event, Greig, Sidd and I had a couple of calls with Jess and Jay of Lake Komo discussing potential ideas.<br>
Jay wanted something to augment vocals as that's an area he wants to explore more in his music and Jess wanted something to control lights. Both wanted something portable that they could take to their own shows.<br><br>
With all of this in mind Greig, Sidd and I went away to discuss the tech to run the instrument and the form factor it should take. Sidd came up with the idea for a folding star shape, Greig suggested we add MIDI assignable controls and lasers, and I thought a vocal sampler would suit the vocal aspect.

<div class="pure-u-1-1 clearer">
<h3>Building Stardis</h3> <!-- font-size: 3.5em; -->
<h4>The body</h4>
<p>
	Sidd took on the task of getting the body ready for the hackday. With the help of a friend he got the design mocked up in CAD and made a test cut with acrylic plastic. The size wasn't right, so he adjusted the model's scale and cut the final pieces in MDF instead of acrylic.
</p>
<h4>The MIDI Controller</h4>
<p>
	Four linear potentiometers (sliders) and four rotary encoders were used with a Teensy microcontroller for its ability to present itself as a USB HID. More input methods were discussed such as LDRs and IMUs but for ease of use on stage we kept it simple.
</p>
<h4>The Sampler</h4>
<p>
	Initially I made a prototype with the Teensy 3.2 and Audio board which seemed to work well, I even had it as a USB Audio Device, but issues with the Teensy's chosen SD Card library's speed meant it could not reliably play back multiple samples at once, which was key to the requirements of the sampler.<br>
	Because of the SD Card speed troubles I instead opted to use a Python script using pyAudio and wave on a Raspberry Pi. I developed the script on my Mac then ported it over to the Pi. At this point everything was going well until I ran into ALSA (*evil villain music here*). ALSA gave me so much grief that in the end we just ran the script on my laptop instead and hid it under the table during the performance. Not ideal, but it worked.<br>
	<br>
	All the time I was writing the software, Greig and Sidd were building the sampler panel with six sample store buttons, one 'record arm' button and one 'mode toggle' button which changed the playback mode from 'one shot' to 'continuous' all with WS2812B LED status lights. These buttons went into another Teensy which send Serial commands to pySerial which I read using the Python script, to control the sample recording, playback mode and playback on the laptop.
</p>
<h4>The Lighting Controller</h4>
<p>
	Lake Komo brought some wireless stage lighting with them so we could incorporate them into the instrument. Although extremely confusing at first (the documentation was in badly translated English from Italian) Greig managed to get them working. Then, using a DMX shield for the Arduino UNO, controlled a master unit and broadcast wirelessly to the slaves.<br>
	The UNO read pressure data from three force sensors on another of the instrument's panels which we used to control the red, green and blue light mix.
</p>
<h4>Laser Projection Mapping</h4>
<p>
	Greig brought his (22kg) laser projector down from Glasgow with the intention of trying to add some additional visual flare to the performance. With a little help from one of the other teams he was able to write some software to laser project onto the pyramid centerpiece of the Stardis. The animation was of a rotating pyramid in 3D, complete with perspective correction, and the final calibration was done moments before the performance. It definitely added to the already impressive sound reactive LED lighting, giving the visuals a finishing touch to really wow the audience.
</p>
</div>
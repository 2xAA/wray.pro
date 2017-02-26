---
title: Building a 3.3V to 5V logic level shifter
date: 2017-01-12 00:09:09
layout: blog-item.html
collection: blog
excerpt: "*Or how to sync nanoloop to the OP-1*"
tags: CMOS, OP-1, electronics
comments: true
---

<small>*Or how to sync nanoloop to the OP-1*</small>

## The problem

The OP-1 is an all-in-one music workstation designed and built by teenage engineering (TE), a very cool professional audio company based in Sweden (hire me TE!).  
Although awesome, the OP-1 has always had a, in my opinion, major flaw - its connectivity. The original OP-1 firmware only had support for MIDI clock beat match and MIDI clock output over USB, leaving much to be desired for a live setup without a laptop.  
<small>(for a long time their documentation read that the OP-1 only responded to MTC, which is **NOT** MIDI Clock, I emailed them about this and this was an error in their documentation, it was not resolved)</small>

TE brought out the OP-Lab to try and solve this, however after the initial purchase of the OP-1 the price of the OP-Lab is just far too expensive. I can see why it's expensive, I just don't want to pay for something that I can probably build myself, far shonkier ;P

In 2016, TE released a firmware update to include external sync support for its Pocket Operator series (woo!).  
This update allows the OP-1 to output an analog click track on the left channel of the stereo output, the audio outputs on the right channel. Not only does the update allow for Pocket Operator syncronisation, but 1/16 (Volca) sync timing is supported too which means nanoloop (2.7.6+, 1.7.2+ & mono) and LSDj (4.8.0+) syncronisation is possible!

**WAIT A MINUTE.**

The OP-1 outputs its click track at 3.3V. oh no.  
We need 5V for the Game Boy to detect that click track.  

I guess we could use a headphone amp, but that doesn't look cool (plus it's potentially unsafe).


## The solution

Ideally I wanted to find a passive solution for this, but that's impossible for level conversion.

I browsed for level shifting solutions, most of them came up with needing the 3.3V and GND from the signal source, which wasn't possible with the OP-1; we can only get ground out of it without defacing the machine.

Eventually I found a solution using a MOSFET which would read any 3.3V signal and convert it into 5V, unfortunately this inverted the signal. So I needed to flip the signal back around again, a simple NPN NOT gate.

## Schematics

CHK DIS OUT:

![Circuit diagram for the logic convertor](http://wray.pro/blog/static/logic_convertor_schem.png)
<small>I obviously can't use fritzing</small>

## Parting words

I hope this helps out somebody, I'm going to be making this into a small project box soon with a 9V battery inside. Will use a 5V regulator to step down the 9V into 5V.

Check out my Instagram video with this in action:

<blockquote class="instagram-media" data-instgrm-version="7" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:28.1944444444% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/BPIX46PBHzS/" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A video posted by Sam (@2xaa)</a> on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2017-01-11T16:29:50+00:00">Jan 11, 2017 at 8:29am PST</time></p></div></blockquote> <script async defer src="//platform.instagram.com/en_US/embeds.js"></script>
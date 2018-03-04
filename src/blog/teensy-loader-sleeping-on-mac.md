---
title: Teensy Loader sleeping on Mac
date: 2016-09-13 14:51:19
layout: blog-item.html
collection: blog
tags: teensy, arduino, macOS
comments: true
---

So, I love the [Teensy](https://www.pjrc.com/teensy/index.html). It's probably the best bit of Arduino-compatible kit out there, closely followed by the ESP8266.

If you've found yourself having to push the Teensy's reset button too often then this article is for you.
This is just a quick tip for long-time OS X and Teensy users who used Teensyduino and the Teensy Loader before Apple introduced 'App Nap' to Mac OS.

[App Nap](http://arstechnica.com/apple/2013/10/os-x-10-9/13/) is a very cool feature that puts applications to 'sleep' when they're not in view on OS X, this has been the case since Mavericks.
However cool this may sound (and it is cool, nice one Apple!) this has crippled some applications such as the Teensy Loader and a couple of time critical audio applications I've used live, and this is very annoying to say the least as the sleeping apps do not respond when they are told to.

### To disable app nap on the Teensy Loader:

1. Find your Arduino application, right click and click 'Show Package contents'.
2. Navigate through Contents/Java/hardware/tools
3. Right click on 'Teensy' and click 'Get Info'
4. Check 'Prevent App Nap'
5. ???
6. PROFIT

![app nap](/assets/blog/app-nap.png)

Now you can program that little bit faster and not worry about wearing out that tiny reset button on the Teensy ;^)

Also, this can apply to almost any app. So, say if you're doing some ***audio routing for a live stream***, just set that audio router to not sleep and all will be well.

Curse you Apple and your awesome innovations.
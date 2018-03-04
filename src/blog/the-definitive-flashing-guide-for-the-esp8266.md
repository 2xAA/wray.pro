---
title: The definitive flashing guide for the ESP8266
date: 2015-11-12 01:11:19
layout: blog-item.html
collection: blog
excerpt: The ESP8266 is an inexpensive WiFi module which can run LUA, Assembly and other languages. This guide teaches you how to flash it.
tags: arduino, esp8266
comments: true
---

<small>*Or how I learned to stop stressing and love the ESP8266*</small>

## Preamble

*I'd just like to point out that I respect whoever chose to name this board the 'ESP' - good reference to Extrasensory perception ;^)*

The ESP8266 is an inexpensive WiFi module which can run LUA, Assembly and other languages. I bought it because I was interested in building a wireless controller for my visuals software, [modV](/modV).

After searching online for some time on how to update the firmware I came across many tutorials on the ESP8266, however none of them provided the answer.

Skip forward a couple of days and I had received the NodeMCU ESP-12E (ESP8266 dev board) for a University project. After searching relentlessly on decent documentation for this I came across many tutorials for the ESP8266 instead (oh the irony).

After reading through all of the tutorials and bookmarking the decent ones I finally got my standalone ESP8266 flashed with new firmware.

So, how did I achieve this incredible feat?

## Requirements
*Please note: As I wanted to use the ESP8266 Arduino library with my board, I'll be going over how to install that also.*

*Also please note: I did all of this on a Mac. These steps should be easy enough to follow on Windows or Linux also, but the majority of steps have not been tested by me on anything other than Mac OS 10.10.4*

* FTDI Flasher (3.3V) or Arduino Board (preferably Uno, but others are fine)
* [Python (2.7)](https://www.python.org/download/releases/2.7/)
* [pySerial](https://github.com/pyserial/pyserial)
* [esptool](https://github.com/themadinventor/esptool)
* [ESP8266 v0.9.2.5 AT Firmware](/assets/blog/ESP8266-v0.9.2.5-firmware.zip)

The following are optional extras to use the Arduino IDE to program the board:

* [Arduino IDE (1.6.6 or newer)](https://www.arduino.cc/en/main/software)
* ESP8266 Arduino Board Package - please follow [Adafruit's great guide](https://learn.adafruit.com/adafruit-huzzah-esp8266-breakout/using-arduino-ide#install-the-arduino-ide-1-dot-6-4-or-greater) on how to install this. Read from "Install the Arduino IDE 1.6.4 or greater" until "Setup ESP8266 Support".

## 1: Construct the circuit

We're going to make a little breakout board, this makes things 100% easier to see when you're working with the ESP8266.

### 1.1 Making the breakout board

#### Requirements

* Stripboard or Perfboard (4 by 4)
* 8 female header pins
* 8 stackable male pins (or non stacking, but you'll get a more solid connection with stacking ones)

#### The build
<a href="/assets/blog/breakout.jpg" target="_blank"><img src="/assets/blog/breakout-small.jpg"></a>

Follow the image above as reference to see how this should be built.

1. Score the copper on the back of the stripboard to avoid shorting the ESP826 when you plug it in.
2. Group the 8 female header pins on the top of the stripboard, solder on the back.
3. On the top side, put the male header pins in and hold them in place with tac or tape, then solder on the back again.

### 1.2 Putting the bootloader circuit together

I put together a Fritzing diagram of my circuit:

<a href="/assets/blog/ESP8266-fritzing.png" target="_blank"><img src="/assets/blog/ESP8266-fritzing.png"></a>

**Don't miss the wire on the Arduino going from RST to GND** - this bypasses the microcontroller on the Arduino so we can program the microcontroller on the ESP8266 instead.

In the diagram the ESP8266 would plug into the breakout board antenna facing downwards.

I took a photo just incase also:

<a href="/assets/blog/ESP8266-circuit-photo.jpg" target="_blank"><img src="/assets/blog/ESP8266-circuit-photo-small.jpg"></a>

Here's a handy table of the pins from the ESP8266:

<table class="pure-table">
<thead>
<tr>
<th align="center"> ESP8266 </th>
<th align="center"> Arduino      </th>
</tr>
</thead>
<tbody>
<tr>
<td align="center"> RXD     </td>
<td align="center"> RX           </td>
</tr>
<tr>
<td align="center"> VCC     </td>
<td align="center"> 3.3V         </td>
</tr>
<tr>
<td align="center"> GPIO 0  </td>
<td align="center"> GND          </td>
</tr>
<tr>
<td align="center"> RST     </td>
<td align="center"> disconnected </td>
</tr>
<tr>
<td align="center"> GPIO 2  </td>
<td align="center"> disconnected </td>
</tr>
<tr>
<td align="center"> CH_PD   </td>
<td align="center"> 3.3V         </td>
</tr>
<tr>
<td align="center"> GND     </td>
<td align="center"> GND          </td>
</tr>
<tr>
<td align="center"> TXD     </td>
<td align="center"> TX           </td>
</tr>
</tbody>
</table>

And here's the pinout:

<a href="/assets/blog/ESP8266-pinout.png" target="_blank"><img src="/assets/blog/ESP8266-pinout.png"></a>

***Please note that the RXD and TXD really should only have 3.3V voltages going into them. It is possible you may damage your ESP8266 by following the circuit above (though I, along with many others, have had no issues with this). Please read below for alternatives.***

*You should ideally use a 3.3V FTDI programmer (with external power for the ESP8266 VCC) or a voltage divider from the Arduino RX and TX pins. I found that using 330Ω for R1 and 560Ω as R2 in a standard voltage divider circuit works nicely. Brings the voltage to an acceptable 3.1V .*

**This section is where most people go wrong with the ESP8266, so double check and triple check this section and make sure you're sure before you go any further.**

## 2: Flashing the ESP8266 using esptool
*You should have Python 2.7 and pySerial installed for this section*

1. Once you've downloaded esptool, unzip it.
2. Download and unzip the firmware bin file - copy the bin file into the esp-master folder.
3. Open a terminal and navigate to the esptool-master folder. For example:
4. Issue this command replacing **YOUR-PORT-HERE** with the port number where you plugged in your Arduino Uno. [This can be found using the Arduino IDE](/assets/blog/arduino-ide-port-screenshot.png).

```
$ ./esptool.py -p /dev/YOUR-PORT-HERE write_flash 0x0000 "v0.9.5.2 AT Firmware.bin"
```

If all goes well you should see this:

<p><code>
Connecting...
Erasing flash...
Wrote 520192 bytes at 0x00000000 in 49.0 seconds (84.9 kbit/s)...

Leaving...
</code></p>

It takes about a minute to flash.

## 3: Returning from bootloader mode
The circuit you built put the ESP8266 into bootloader mode. You can only flash the chip in this mode, this is important.

If you want to run the code you flash onto the chip in boot loader mode, you must take the board out of boot loader mode.

So, remove the VCC, take the GPIO0 pin out of GND and plug the VCC back into 3.3V - simple, eh?


Coming soon: Using the Arduino IDE to program the ESP8266.
---
title: "BT: Piccadilly Lights Live Coding"
date: 2015-01-01
collection: portfolio
excerpt: "Inspiring the nation's kids to code: Realtime live-coding PWA over London's famous Piccadilly Circus."
thumbnail: bt-piccadilly-lights.jpg
video: true
youtube_id: 3YpmyMcI0kk
widescreen: true
---

As part of BT's "Beyond Limits" campaign, we highlighted their work with UK schools helping 5 million children learn coding and computer-science skills through BT's Barefoot programme.

Since the programme mainly focused around Scratch, a visual programming language, I made the decision to drive the creative down a code-less approach for the application. However, I stressed the need to make sure the visuals highlighted the relationship between inputs, data structure and output.

We ended up on an avatar-creation app, where the participants could express themselves through "code".

The app itself allowed the user to input their name, age and select from a wide selection of hand-made avatar assets. Each asset had transformation properties, such as scale and rotation. Some had modifiers such as colour.

Each time a property was modified the data structure in the app and on the lights highlighted the line being changed and updated the value in real-time.

As the kids were creating their avatar, the data was being streamed to a web-renderer, then that output sent to the Piccadilly Lights. The latency was usually less than 2 seconds, though most of that was introduced by the signal processing on the Piccadilly Lights rather than our servers.

The kid's avatars were seen by 273,972 people.

My first project within publicis•poke, totalling 2 weeks of time.

<a class="pure-button" href="//www.publicispoke.com/work/piccadilly-lights-live-coding/" target="_blank">
	<i class="fa fa-globe fa-lg"></i>
	Read publicis•poke's case study
</a>

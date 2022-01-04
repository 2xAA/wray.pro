---
title: "EE: BAFTA 2020"
date: 2015-01-02
collection: portfolio
excerpt: Real-time AR on the red carpet.
thumbnail: ee-bafta-2020.jpg
video: true
playlist: true
youtube_id: PLn3SwdUYCMgIai0A-bKAWvLlyWULwSZh0
widescreen: true
---

EE challenged publicis•poke to "make it real", to showcase what their network and technology can achieve. When it comes to 5G, just demonstrating speed isn't quite enough.

We merged technology and fashion to create a 5G-backed AR dress, worn by Maya Jama and unveiled on the red carpet.

This activation was handled in two parts, the first being a Unity app I developed, using ARCore's Cloud Anchors.
The second, the main event, an Unreal Engine based app with infra-red tracking cameras and reflectors sewn into our celebrity's dress.
<br><br>
The main AR event in the booth was handled sepearately, I'm going to focus on my involvement here.

EE had held a competition to win a trip to the red carpet and wanted to involve the competition winners in the ceremony introduction. Working with publicis•poke, we came up with a shared AR experience where the previously mentioned AR dress animated around Maya Jama as she passes the compeition winners on the red carpet.

The AR dress itself was Alembic, so converting that to work with Unity was a little challenging. Using ARCore constrained us to only the standard renderer and Alembic, or other formats with mesh-caches only worked with URP.

Eventally I ended up exporting each Alembic frame as a separate FBX and wrote a controller to load and unload each frame of the FBX to achieve the animation. Not ideal, but it worked out.

Once that was done, ARCore's Cloud Anchors were the next think to look into. Since we wanted the competition winners to share an experience we wanted to resolve the same space to share the transform on the dress mesh.

This was rather easy to get going and in the office and rehersal space worked incredibly well. However, once on the red carpet and the flood-lights were turned on, all detail in the scene was lost to the phone's camera and the Cloud Anchors weren't able to resolve well enough for a shared experience.

Luckily I'd anticipated the situation and was able to bypass the Cloud Anchor feature to allow each phone to have its own calibration. You could then pick the spot the dress should animate around manually.

In the first video you can see me on the red carpet. Not only was I managing the devices, my phone controlled when the animation would play and other aspects of the experience.

The EE BAFTA live stream had 700k views and the 45 second edit had over a million views not even after 24 hours.

Featured on:

[Independant](https://www.independent.co.uk/life-style/fashion/maya-jama-dress-baftas-2020-5g-augmented-reality-richard-malone-a9313956.html)  
[Glamour](https://www.glamourmagazine.co.uk/gallery/maya-jama-baftas-2020-dress) "Our minds are officially blown."

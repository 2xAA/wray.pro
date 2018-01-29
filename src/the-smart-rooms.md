---
title: "Dyson: The Smart Rooms"
date: 2016-12-31
collection: portfolio
excerpt: "A Dyson challenge for the connected home."
thumbnail: smartrooms.png
video: true
playlist: false
youtube_id: VinWvNIqDbo
widescreen: true
---

The Smart Rooms was a two-day pop-up challenge held by [Dyson](https://dyson.avature.net/smartrooms) to find the brightest software engineering minds to fuel its technology pipeline.

Akin to other escape-room challenges (i.e. The Crystal Maze), players had 4 rooms to complete within a 45 minute timeframe, those rooms were:
Bedroom, Kitchen, Living Room and Garage, the Garage being a set 10 minute challenge which all teams would participate in regardless of their performance within the other rooms.

Teams of up to 5 members would try to solve cryptic puzzles based around software programming and the connected home, with the help of a viewing audience on [Twitch.tv](https://twitch.tv/) via webcams &amp; microphones situated throughout the room and an interactive polling station (The Twitch Altar).

The Smart Rooms' host would be the Smart Room itself, played by [Samantha Arends](https://twitter.com/SamanthaArends1). Participants could say aloud "Hello Smart Room" to activate the Alexa-esque interface, enabling them to ask for extra information, relay information to Twitch, initiate actions within the room or just have a nice conversation with the Smart Room! [Hear Samantha in action on Instagram](https://www.instagram.com/p/BQIzU0HjMF8/).

<div class="pure-u-1-1 clearer">

	<h3>Building The Smart Rooms</h3>
	<p>
		My role within the Smart Rooms project was technical lead for the game design, working with [Minkette](https://twitter.com/mink_ette) to make sure the challenges made sense from a software engineering aspect and also to build anything technical the Smart Rooms required, either for its puzzles or in general.
	</p>

	<h4>The Challenges</h4>
	<p>
		In total there were 4 challenges, one per room. Some challenges were more complex than others, though all challenges could be solved within the 45 minutes given.
	</p>
	<h5>Bedroom: Night Light</h5>
	<blockquote>Rebuild the lamp so that it changes to Twitch’s favourite colour when it hears a lullaby.</blockquote>
	<p>
		A multipart challenge where the team would have to</p>

	<ol>
		<li>find coloured objects hidden around the bedroom to place on the Twitch Altar for Twitch to vote upon their favourite colour</li>
		<li>program a micro-controller inside the room using the computer's Code Jenga</li>
		<li>transfer the micro-controller to the lamp</li>
	</ol>
	<p>
		Teams could either sing a lullaby to the lamp or ask Smart Room to play a lullaby.
	</p>
	<h5>Kitchen: Home From Work</h5>
	<blockquote>It’s time to make dinner and get the evening chores done. Get all ten If This Then That recipes activated to complete the challenge.</blockquote>
	<p>
		Based on the concept of [IFTTT](https://ifttt.com/) recipes, teams would have to complete a series of recipe cards displayed on the projection screen with a selection of smart objects within the kitchen.<br>
		Teams would have to find the correct smart objects for each recipe card.
	</p>
	<h5>Living Room: Home and Dry</h5>
	<blockquote>You have to change your mainframe password. Clues to your old password are hidden around the room.</blockquote>
	<p>
		A video from the perspective of the Dyson 360eye was displayed to the team. In this video, clues made up from shapes and symbols found on Dyson products were placed next to real-world objects which could also be found in the room in the form of EL wire designs, lit up as part of the room.<br>
		A prominent symbol was the fan icon on Dyson's Supersonic, indicating players had to use the hairdryer in some capacity.<br>
		Next to the EL wire designs were hidden patches of heat paint which would give the players clues to the password.<br>
		A different viable password was selected either by Twitch or the control room each time a team played through the challenge.
	</p>
	<h5>Garage: Off to Work</h5>
	<blockquote>You are late for work and are late on your assignments. You'll need to get 5 assignments into the briefcase from sat in the car.</blockquote>
	<p>
		When the challenge started, the Smart Room would deliver mail through the letterbox. Their assignment was to name the Smart Room voice, either by their own suggestions or by asking Smart Room to ask Twitch for them.<br>
		The briefcase was up high and the team would have to submit their assignments into the briefcase from the car.<br>
		Some teams showed real critical thinking on this challenge, with some choosing to create paper airplanes, use a chain of people or even roll up all of the assignments into a large ball and throw them into the case.
	</p>
	<h4>The room(s)</h4>
	<p>
		The Smart Rooms took place within one room which was able to transform its appearance.<br>
		EL Wire was used to draw out the designs of each of the four rooms on the walls and box-areas of the room. Spark Fun's EL Wire controller was used in conjunction with a custom-built web interface which controlled the whole Smart Room.
	</p>

	<h4>Twitch Alter</h4>
	<p>
		Within the Smart Rooms, there was an alter with 4 spotlights and 4 LED strips on the wall. Players were able to pick four objects, place them in the spotlights and ask Twitch to vote which item they thought was most relevant.
	</p>
	<p>
		This was achieved by using Twitch's chat API hooked into the web-interface built for Smart Rooms and a laptop hidden in the room which controlled both the projection screen and an Arduino with the LEDs hooked up to it.<br>
		Twitch viewers could vote by entering a hashtag from the list of objects presented to them, e.g. ```#purple```, to cast their vote.<br>
		Each object's LED strip would then proportionally light up, top to bottom, based on the number of votes cast for the object, giving the players a clue on which object to use.
	</p>

	<h4>Projection Screen</h4>
	<p>
		Smart Rooms participants would get their current challenge information from this screen.
		All of the UI was a webpage built vertically which was back-projected and bounced off a mirror onto the projection screen, a matt black screen built into the room to give the appearance that the wall was displaying information with no projector or screen.<br>
		<br>
		The UI was updated via a WebSocket connection from the web interface.
	</p>

	<h4>Web Interface</h4>
	<p>
		The heart of The Smart Rooms, controlling polls, teams, timing, challenges, tasks, sounds and lights!<br>
		<br>
		An Express application run on a locked, local network between two laptops and a couple of Arduinos on those laptops to control the Twitch Altar and the EL Wire rooms.
	</p>
</div>
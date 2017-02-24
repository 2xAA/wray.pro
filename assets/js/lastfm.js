/* 
 * I wrote this last.fm thing myself 
 * for my blog (2xaa.tumblr.com).
 * Please keep the credit in here
 * and also don't forget fxb who wrote the JS
 * last.fm API:
 * https://github.com/fxb/javascript-last.fm-api
 * 
 * Peace <3
 */
;(function() {
	var $ 	= document,
		np 	= false,
		lfm = $.querySelectorAll('footer .pure-g div:nth-child(2) aside')[0],
		/* Create a cache object */
		cache = new LastFMCache(),
		/* Create a LastFM object */
		lastfm = new LastFM({
			apiKey    : '7e8faf77ea9f5e451591076fae780680',
			apiSecret : '6450f82a1a034de763684b49149f7f5f',
			cache     : cache
		}),
		lastArtist,
		lastTrack;
	
	function poll() {
		/* Load some artist info. */
		lastfm.user.getRecentTracks({user: 'theonly2xaa'}, {success: function(data) {
			/* Check for any change */
			if(lastArtist == data.recenttracks.track[0].artist['#text'] && lastTrack == data.recenttracks.track[0].name) return;
			else if(lfm.childNodes[3]) {
				lfm.removeChild(lfm.childNodes[3]);
				lfm.removeChild(lfm.childNodes[3]);
			}
			
			/* Check if now playing or not */
			if(typeof data.recenttracks.track[0]['@attr'] !== 'undefined') {
				if(data.recenttracks.track[0]['@attr'].nowplaying == 'true') np = true;
			}
			
			var url 	= data.recenttracks.track[0].url,
				div	 	= $.createElement('div'),
				img 	= $.createElement('img'),
				imgDiv	= $.createElement('div'),
				imgA	= $.createElement('a'),
				a 		= $.createElement('a'),
				width,
				text 	= '',
				textNode= $.createTextNode('');
			
			img.src = data.recenttracks.track[0].image[2]['#text'];
			
			imgA.href = a.href = url;
			imgA.target = a.target = '_blank';
			a.textContent = 'Now playing';
			
			imgA.appendChild(img);
			
			if(np) {
				//div.appendChild(a);
				text = 'Now playing: ';
			}
			
			text += data.recenttracks.track[0].name + ' by ' + data.recenttracks.track[0].artist['#text'];
			textNode.nodeValue = text;
			
			div.appendChild(textNode);
			imgDiv.appendChild(imgA);
			lfm.appendChild(div);
			lfm.appendChild(imgDiv);
			
			function sizeIt(loaded) {
				div = document.querySelectorAll('footer .pure-g div:nth-child(2) aside div')[0];
				div.style.width = 'auto';
				width = div.clientWidth;
				if(!loaded) div.style.width = 0;
				setTimeout(function() {
					div.style.width = width + 'px';
				}, 100);
			}
			
			sizeIt(false);
			window.addEventListener('resize', function() {
				sizeIt(true);
			});
			
			setTimeout(function() {
				lastTrack = data.recenttracks.track[0].name;
				lastArtist = data.recenttracks.track[0].artist['#text'];
			}, 1000);
			
		}, error: function(code, message) {
			//lfm.innerHTML = '<div class="np" style="color:red;font-weight:bold;">There was an error connecting to the last.fm API. Code: ' + code + '. Message: ' + message + '</div>'
		}});
	
	}
	
	var interval = setInterval(poll, 1000*30);
	poll();	
})();
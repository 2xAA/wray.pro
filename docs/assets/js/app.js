;(function($, $$) {

	function App() {
		var captions;
		var path;
		var current;
		var videos;

		function loadFile(url, callback) {
			var request = new XMLHttpRequest();
			request.open('GET', url, true);
			
			request.onload = function() {
				if(request.status >= 200 && request.status < 400) {
					var data = JSON.parse(request.responseText);
					if(typeof callback === 'function') callback(data);
				} else {
					console.error(request);
				}
			};
			
			request.onerror = function() {
				console.error(request);
			};
			
			request.send();
		}

		this.attachCaptionsVideo = function(id, reverse) {
			
			function attach(data) {			
				captions = data.captions;
				
				function loadCaption(id) {
					if(captions[id] !== '') {
						capBox.innerHTML = captions[id];
						capBox.classList.remove('hide');
					} else {
						capBox.innerHTML = '';
						capBox.classList.add('hide');
					}
				}
				
				var aside 		= $.getElementsByTagName('aside')[0];
				var video 		= $.getElementsByTagName('video')[0];
				var capBox 		= $.getElementById('capBox');
				var progress 	= $.getElementById('progress');
				var timeelapsed = $.getElementById('timeelapsed');
				var play 		= $.getElementById('play');
				var sound 		= $.getElementById('sound');
				var mute 		= $.getElementsByClassName('sound')[0];
				var unmute 		= $.getElementsByClassName('sound')[1];
				var listButton 	= $.getElementById('list-icon');
				var listShow 	= $.getElementsByClassName('list')[0];
				var listHide 	= $.getElementsByClassName('list')[1];
				var list 		= $.getElementById('list');
				
				var muted = true;
				
				var allowedPlay = false;

				function playIndexed(idx) {
					return function() {
						current = idx+1;
						loadCaption(idx);
						video.src = path + (idx+1) +'.mp4';
						video.load();
						play.classList.add('show');
						allowedPlay = false;
					};
				}

				if(captions.length > 1) {
					// Generate list
					if(reverse) captions.reverse();
					captions.forEach(function(item, idx){
						var li = $.createElement('li'),
						liText = $.createElement('span'),
						div = $.createElement('div'),
						icon = $.createElement('i');

						if(reverse) li.addEventListener('click', playIndexed((captions.length-1)-idx));
						else li.addEventListener('click', playIndexed(idx));

						icon.classList.add('fa', 'fa-play');

						liText.innerHTML = item;
						div.appendChild(liText);
						li.appendChild(icon);
						li.appendChild(div);
						list.appendChild(li);

					});
					if(reverse) captions.reverse();

					listButton.addEventListener('click', function() {
						listButton.classList.toggle('active');
						listShow.classList.toggle('hide');
						listHide.classList.toggle('hide');
						list.classList.toggle('hide');

					});
				} else {
					aside.removeChild(listButton);
				}
				
				play.addEventListener('click', function() {
					if(!video.paused) {
						video.pause();
						this.classList.add('show');
					} else {
						video.play();
						this.classList.remove('show');
					}
					
					allowedPlay = true;
				});
				
				sound.addEventListener('click', function() {
					if(video.muted) {
						muted = false;
						video.muted = muted;
						mute.classList.add('hide');
						unmute.classList.remove('hide');
					} else {
						muted = true;
						video.muted = muted;
						mute.classList.remove('hide');
						unmute.classList.add('hide');
					}
				});
				
				$$.addEventListener('resize', function() {
					video.height = video.clientWidth;
				});
				
				video.height = video.clientWidth;
				
				video.addEventListener('progress', function() {
					var percent = 0;

					try {
						percent = (video.buffered.end(0) / video.duration);
					} catch(e) {
						return;
					}

					progress.style.width = percent * 100 + '%';

					if(percent === 1) {
						setTimeout(function() {
							progress.classList.add('hide');
						}, 100);
					}
				});
				
				setInterval(function() {
					timeelapsed.style.width = (video.currentTime / video.duration) * 100 + '%';
				}, 1000/60);
				
				videos = data.videos;
				if(reverse) current = videos;
				else current = 1;

				path = '/static/video/' + id + '/';
				
				loadCaption(current-1);
				
				video.src = path + current +'.mp4';
				video.load();
				video.oncanplay = function() {
					video.classList.remove('hide');
					progress.classList.remove('hide');
					if(allowedPlay) video.play();
					if(!muted) video.muted = false;
				};
				
				video.addEventListener('ended', function() {
					video.classList.add('hide');
					if(reverse) {
						if(current !== 1) current--;
						else current = videos;
					} else {
						if(current !== videos) current++;
						else current = 1;
					}
				
					loadCaption(current-1);
				
					video.src = path + current +'.mp4';
					video.load();
				});
			}
			
			loadFile('/assets/json/captions/' + id + '.json', attach);
		};

	}

	$$.app = new App();
})(document, window);
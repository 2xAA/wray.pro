/*
 *
 * Copyright (c) 2008-2009, Felix Bruns <felixbruns@web.de>
 *
 */

/* Set an object on a Storage object. */
Storage.prototype.setObject = function(key, value){
	this.setItem(key, JSON.stringify(value));
}

/* Get an object from a Storage object. */
Storage.prototype.getObject = function(key){
	const item = this.getItem(key);

	return JSON.parse(item);
}

/* Creates a new cache object. */
function LastFMCache(){
	/* Expiration times. */
	const MINUTE =          60;
	const HOUR   = MINUTE * 60;
	const DAY    = HOUR   * 24;
	const WEEK   = DAY    *  7;
	const MONTH  = WEEK   *  4.34812141;
	const YEAR   = MONTH  * 12;

	/* Methods with weekly expiration. */
	const weeklyMethods = [
		'artist.getSimilar',
		'tag.getSimilar',
		'track.getSimilar',
		'artist.getTopAlbums',
		'artist.getTopTracks',
		'geo.getTopArtists',
		'geo.getTopTracks',
		'tag.getTopAlbums',
		'tag.getTopArtists',
		'tag.getTopTags',
		'tag.getTopTracks',
		'user.getTopAlbums',
		'user.getTopArtists',
		'user.getTopTags',
		'user.getTopTracks'
	];

	/* Name for this cache. */
	const name = 'lastfm';

	/* Create cache if it doesn't exist yet. */
	if(localStorage.getObject(name) == null){
		localStorage.setObject(name, []);
	}

	/* Get expiration time for given parameters. */
	this.getExpirationTime = function(params){
		const method = params.method;

		if((/Weekly/).test(method) && !(/List/).test(method)){
			if(typeof(params.to) != 'undefined' && typeof(params.from) != 'undefined'){
				return YEAR;
			}
			else{
				return WEEK;
			}
		}

		for(const key in this.weeklyMethods){
			if(method == this.weeklyMethods[key]){
				return WEEK;
			}
		}

		return -1;
	};

	/* Check if this cache contains specific data. */
	this.contains = function(hash){
		return typeof(localStorage.getObject(name)[hash]) != 'undefined' &&
			typeof(localStorage.getObject(name)[hash].data) != 'undefined';
	};

	/* Load data from this cache. */
	this.load = function(hash){
		return localStorage.getObject(name)[hash].data;
	};

	/* Remove data from this cache. */
	this.remove = function(hash){
		const object = localStorage.getObject(name);

		object[hash] = undefined;

		localStorage.setObject(name, object);
	};

	/* Store data in this cache with a given expiration time. */
	this.store = function(hash, data, expiration){
		const object = localStorage.getObject(name);
		const time   = Math.round(new Date().getTime() / 1000);

		object[hash] = {
			data       : data,
			expiration : time + expiration
		};

		localStorage.setObject(name, object);
	};

	/* Check if some specific data expired. */
	this.isExpired = function(hash){
		const object = localStorage.getObject(name);
		const time   = Math.round(new Date().getTime() / 1000);

		if(time > object[hash].expiration){
			return true;
		}

		return false;
	};

	/* Clear this cache. */
	this.clear = function(){
		localStorage.setObject(name, []);
	};
};

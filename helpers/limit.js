module.exports = function limit(collection, limit, start) {
	return collection.slice( start, limit + 1 );
};
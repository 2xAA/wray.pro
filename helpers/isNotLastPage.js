module.exports = function isNotLastPage(path) {
	var page = path.split('/').pop();
	return (page !== 'index.html');
};
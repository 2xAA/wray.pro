module.exports = function isNotLastPage(path) {
	const page = path.split('/').pop();
	return (page !== 'index.html');
};
module.exports = function getTextFromHtmlString(str) {
	return str.replace(/<[^>]*>/g, '');
};
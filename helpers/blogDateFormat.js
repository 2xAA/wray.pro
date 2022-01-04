const moment = require('moment');

module.exports = function blogDateFormat(datetime) {
	return moment(datetime).format('Do MMMM, YYYY');
};
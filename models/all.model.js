module.exports = function (app, MySQLConnetion) {
	require('./hotels.model.js')(app, MySQLConnetion);
	require('./rooms.model.js')(app, MySQLConnetion);
}
module.exports = function (app) {
	require('./hotels.route.js')(app);
	require('./rooms.route.js')(app);
}
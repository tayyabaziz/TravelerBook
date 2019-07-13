'user strict';
module.exports = function (app) {
	var rooms = require('../controllers/rooms.controller');
	app.get('/rooms', rooms.list_all_rooms);
	app.get('/room/:roomId', rooms.read_room);
	app.get('/room/:roomId/room_images', rooms.read_room_images);
	app.get('/room/:roomId/room_facilities', rooms.read_room_facilities);
}
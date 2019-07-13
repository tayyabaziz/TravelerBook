'user strict';
const MySQLConnetion = require('../config/database.config.js');

var Room = function(room){
	this.room = room.room;
}

var rooms = new MySQLConnetion({tableName: "rooms"});
var room_images = new MySQLConnetion({tableName: "room_images"});
var room_facilities = new MySQLConnetion({tableName: "room_facilities"});

Room.getAllRooms = function (offset, limit, result) {
	rooms.find('all', {limit: [offset, limit]}, function(err, rows) {
		if(err) {
          	console.log("error: ", err);
            result(err, null);
		}
		else {
			result(null, rows);
		}
	});
}

Room.getRoom = function (roomId, result) {
	rooms.find('first', {where: "id = "+roomId}, function(err, rows) {
		if(err) {
          	console.log("error: ", err);
            result(err, null);
		}
		else {
			result(null, rows);
		}
	});
}

Room.getRoomImages = function (roomId, result) {
	room_images.find('all', {where: "roomId = "+roomId}, function(err, rows) {
		if(err) {
          	console.log("error: ", err);
            result(err, null);
		}
		else {
			result(null, rows);
		}
	});
}

Room.getRoomFacilities = function (roomId, result) {
	room_facilities.find('all', {where: "roomId = "+roomId}, function(err, rows) {
		if(err) {
          	console.log("error: ", err);
            result(err, null);
		}
		else {
			result(rowsl, res);
		}
	});
}

module.exports = Room;
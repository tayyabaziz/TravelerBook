'user strict';
const MySQLConnetion = require('../config/database.config.js');
const logger = require('../config/log.config.js');

var Room = function(room){
	this.room = room.room;
}

var rooms = new MySQLConnetion({tableName: "rooms"});
var room_images = new MySQLConnetion({tableName: "room_images"});
var room_facilities = new MySQLConnetion({tableName: "room_facilities"});

Room.getAllRooms = function (offset, limit, result) {
	logger.debug("getAllRooms()");
	rooms.find('all', {limit: [offset, limit]}, function(err, rows) {
		if(err) {
          	console.log("error: ", err);
            result(err, null);
		}
		else {
			result(null, rows);
			logger.debug("Rows Return: "+rows.length);
		}
	});
}

Room.getRoom = function (roomId, result) {
	logger.debug("getHotelFacilities("+roomId+")");
	rooms.read(roomId, function(err, rows) {
		if(err) {
          	console.log("error: ", err);
            result(err, null);
		}
		else {
			result(null, rows);
			logger.debug(rows);
		}
	});
}

Room.getRoomImages = function (roomId, result) {
	logger.debug("getHotelFacilities("+roomId+")");
	room_images.find('all', {where: "roomId = "+roomId}, function(err, rows) {
		if(err) {
          	console.log("error: ", err);
            result(err, null);
		}
		else {
			result(null, rows);
			logger.debug("Rows Return: "+rows.length);
		}
	});
}

Room.getRoomFacilities = function (roomId, result) {
	logger.debug("getHotelFacilities("+roomId+")");
	room_facilities.find('all', {where: "roomId = "+roomId}, function(err, rows) {
		if(err) {
          	console.log("error: ", err);
            result(err, null);
		}
		else {
			result(rowsl, res);
			logger.debug("Rows Return: "+rows.length);
		}
	});
}

module.exports = Room;
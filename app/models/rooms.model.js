const MySQLConnetion = require('../config/database.config.js');
const logger = require('../config/log.config.js');

var rooms = new MySQLConnetion({tableName: "rooms"});
var room_images = new MySQLConnetion({tableName: "room_images"});
var room_facilities = new MySQLConnetion({tableName: "room_facilities"});

class RoomModel {
	constructor(room){
		console.log('Initialize Room Model');
		this.room = room;
	}

	getAllRooms(offset, limit, result) {
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

	getRoom(roomId, result) {
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

	getRoomImages(roomId, result) {
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

	getRoomFacilities(roomId, result) {
		logger.debug("getHotelFacilities("+roomId+")");
		room_facilities.find('all', {where: "roomId = "+roomId}, function(err, rows) {
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
}

module.exports = RoomModel;
'user strict';
const MySQLConnetion = require('../config/database.config.js');
var log4js = require('log4js');

var date = new Date();

var year = date.getFullYear();
var month = date.getMonth() + 1;
month = (month < 10 ? "0" : "") + month;
var day  = date.getDate();
day = (day < 10 ? "0" : "") + day;
var LogDateTime = year+"-"+month+"-"+month;

log4js.configure({
  appenders: { log: { type: 'file', filename: 'logs/log-'+LogDateTime+'.log' } },
  categories: { default: { appenders: ['log'], level: 'debug' } }
});

var logger = log4js.getLogger('log');
logger.debug("Some debug messages");

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
	rooms.read(roomId, function(err, rows) {
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
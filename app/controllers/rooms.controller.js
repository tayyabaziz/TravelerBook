var Room = require('../models/rooms.model');
var common = require('../common/common');

exports.list_all_rooms = function(req, res) {
	let page = 0;
	let limit = 10;
	if(!req.query.page) {
		page = 0;
	}
	else {
		page = req.query.page;
	}

	if(!req.query.limit) {
		limit = 10;
	}
	else {
		limit = req.query.limit;
	}
	let offset = (page - 1) * limit;
  	Room.getAllRooms(offset, limit, function(err, rows) {
	    common(res, err, rows);
  	});
};

exports.read_room = function(req, res) {
  	Room.getRoom(req.params.roomId, function(err, rows) {
	    common(res, err, rows);
  	});
};

exports.read_room_images = function(req, res) {
  	Room.getRoomImages(req.params.roomId, function(err, rows) {
	    common(res, err, rows);
  	});
};

exports.read_room_facilities = function(req, res) {
  	Room.getRoomFacilities(req.params.roomId, function(err, rows) {
	    common(res, err, rows);
  	});
};
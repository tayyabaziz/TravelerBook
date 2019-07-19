var RoomModel = require('../models/rooms.model');
var HelperClass = require('../helper/helper.class');
var Helper = new HelperClass();
var Room = new RoomModel();

exports.list_all_rooms = function(req, res) {
	let page = 1;
	let limit = 10;
	if(!req.query.page) {
		page = 1;
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
	    Helper.formatResult(res, err, rows);
  	});
};

exports.read_room = function(req, res) {
  	Room.getRoom(req.params.roomId, function(err, rows) {
	    Helper.formatResult(res, err, rows);
  	});
};

exports.update_room = function(req, res) {
	var roomData = req.query;
	Room.updateRoom(req.params.roomId, roomData, function(err, rows) {
	    Helper.formatResult(res, err, rows);
  	});
};

exports.update_room_fields = function(req, res) {
	var roomData = req.body;
	Room.updateRoomField(req.params.roomId, roomData, function(err, rows) {
	    Helper.formatResult(res, err, rows);
  	});
};

exports.remove_room = function(req, res) {
	Room.removeRoom(req.params.roomId, function(err, rows) {
	    Helper.formatResult(res, err, rows);
  	});
};

exports.read_room_images = function(req, res) {
  	Room.getRoomImages(req.params.roomId, function(err, rows) {
	    Helper.formatResult(res, err, rows);
  	});
};

exports.read_room_facilities = function(req, res) {
  	Room.getRoomFacilities(req.params.roomId, function(err, rows) {
	    Helper.formatResult(res, err, rows);
  	});
};
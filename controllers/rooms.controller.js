'use strict';

var Room = require('../models/rooms.model');

exports.list_all_rooms = function(req, res) {
	let page = 0;
	let limit = 100;
	if(!req.query.page) {
		page = 0;
	}
	else {
		page = req.query.page;
	}

	if(!req.query.limit) {
		limit = 100;
	}
	else {
		limit = req.query.limit;
	}
	let offset = page*limit;
  	Room.getAllRooms(offset, limit, function(err, rows) {
	    if (!err)
			if (rows === undefined || rows.length == 0)
				res.status(404).json({"message": "No Data Found"});
			else 
				res.json(rows);
		else
			res.status(400).json({"message": "Error Occured"});
  	});
};

exports.read_room = function(req, res) {
  	Room.getRoom(req.params.roomId, function(err, rows) {
	    if (!err)
			if (rows === undefined || rows.length == 0)
				res.status(404).json({"message": "No Data Found"});
			else 
				res.json(rows);
		else
			res.status(400).json({"message": "Error Occured"});
  	});
};

exports.read_room_images = function(req, res) {
  	Room.getRoomImages(req.params.roomId, function(err, rows) {
	    if (!err)
			if (rows === undefined || rows.length == 0)
				res.status(404).json({"message": "No Data Found"});
			else 
				res.json(rows);
		else
			res.status(400).json({"message": "Error Occured"});
  	});
};

exports.read_room_facilities = function(req, res) {
  	Room.getRoomFacilities(req.params.roomId, function(err, rows) {
	    if (!err)
			if (rows === undefined || rows.length == 0)
				res.status(404).json({"message": "No Data Found"});
			else 
				res.json(rows);
		else
			res.status(400).json({"message": "Error Occured"});
  	});
};
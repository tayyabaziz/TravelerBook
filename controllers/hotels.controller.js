'use strict';

var Hotel = require('../models/hotels.model');

exports.list_all_hotels = function(req, res) {
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
  	Hotel.getAllHotels(offset, limit, function(err, rows) {
	    if (!err)
			if (!rows)
				res.status(404).json({"message": "No Data Found"});
			else 
				res.json(rows);
		else
			res.status(400).json({"message": "Error Occured"});
  	});
};

exports.read_hotel = function(req, res) {
  	Hotel.getHotel(req.params.hotelId, function(err, rows) {
	    if (!err)
			if (!rows)
				res.status(404).json({"message": "No Data Found"});
			else 
				res.json(rows);
		else
			res.status(400).json({"message": "Error Occured"});
  	});
};

exports.read_hotel_images = function(req, res) {
  	Hotel.getHotelImages(req.params.hotelId, function(err, rows) {
	    if (!err)
			if (!rows)
				res.status(404).json({"message": "No Data Found"});
			else 
				res.json(rows);
		else
			res.status(400).json({"message": "Error Occured"});
  	});
};

exports.read_hotel_facilities = function(req, res) {
  	Hotel.getHotelFacilities(req.params.hotelId, function(err, rows) {
	    if (!err)
			if (!rows)
				res.status(404).json({"message": "No Data Found"});
			else 
				res.json(rows);
		else
			res.status(400).json({"message": "Error Occured"});
  	});
};
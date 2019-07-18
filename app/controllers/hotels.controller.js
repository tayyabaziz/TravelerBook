var Hotel = require('../models/hotels.model');
var common = require('../common/common');

exports.list_all_hotels = function(req, res) {
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
  	Hotel.getAllHotels(offset, limit, function(err, rows) {
	    common(res, err, rows);
  	});
};

exports.read_hotel = function(req, res) {
  	Hotel.getHotel(req.params.hotelId, function(err, rows) {
	    common(res, err, rows);
  	});
};

exports.update_hotel = function(req, res) {
	var data = req.query;
	var hotelData = {};
	data.forEach(function(key, value) {
		hotelData.key = value;
	});
	Hotel.updateHotel(req.params.hotelId, hotelData, function(err, rows) {
	    common(res, err, rows);
  	});
};

exports.update_hotel_fields = function(req, res) {
	var data = req.query;
	var hotelData = {};
	data.forEach(function(key, value) {
		hotelData.key = value;
	});
	Hotel.updateHotelField(req.params.hotelId, hotelData, function(err, rows) {
	    common(res, err, rows);
  	});
};

exports.remove_hotel = function(req, res) {
	Hotel.removeHotel(req.params.hotelId, function(err, rows) {
	    common(res, err, rows);
  	});
};

exports.read_hotel_images = function(req, res) {
  	Hotel.getHotelImages(req.params.hotelId, function(err, rows) {
	    common(res, err, rows);
  	});
};

exports.read_hotel_facilities = function(req, res) {
  	Hotel.getHotelFacilities(req.params.hotelId, function(err, rows) {
	    common(res, err, rows);
  	});
};
'user strict';
const MySQLConnetion = require('../config/database.config.js');

var Hotel = function(hotel){
	this.hotel = hotel.hotel;
}

var hotels = new MySQLConnetion({tableName: "hotels"});
var hotel_images = new MySQLConnetion({tableName: "images"});
var hotel_facilities = new MySQLConnetion({tableName: "hotel_facilities"});

Hotel.getAllHotels = function (offset, limit, result) {
	hotels.find('all', {limit: [offset, limit]}, function(err, rows) {
		if(err) {
          	console.log("error: ", err);
            result(err, null);
		}
		else {
			result(null, rows);
		}
	});
}

Hotel.getHotel = function (hotelId, result) {
	hotels.find('first', {where: "id = "+hotelId}, function(err, rows) {
		if(err) {
          	console.log("error: ", err);
            result(err, null);
		}
		else {
			result(null, rows);
		}
	});
}

Hotel.getHotelImages = function (hotelId, result) {
	hotel_images.find('all', {where: "hotelId = "+hotelId}, function(err, rows) {
		if(err) {
          	console.log("error: ", err);
            result(err, null);
		}
		else {
			result(null, rows);
		}
	});
}

Hotel.getHotelFacilities = function (hotelId, result) {
	hotel_facilities.find('all', {where: "hotelId = "+hotelId}, function(err, rows) {
		if(err) {
	      	console.log("error: ", err);
	        result(err, null);
		}
		else {
			result(null, rows);
		}
	});
}

module.exports = Hotel;
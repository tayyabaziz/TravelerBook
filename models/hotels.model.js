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

var Hotel = function(hotel){
	this.hotel = hotel.hotel;
}

var hotels = new MySQLConnetion({tableName: "hotels"});
var hotel_images = new MySQLConnetion({tableName: "images"});
var hotel_facilities = new MySQLConnetion({tableName: "hotel_facilities"});

Hotel.getAllHotels = function (offset, limit, result) {
	logger.debug("Some debug messages");
	hotels.find('all', {limit: [offset, limit]}, function(err, rows) {
		if(err) {
          	console.log("error: ", err);
            result(err, null);
		}
		else {
			result(null, rows);
			logger.debug("Some debug messages");
		}
	});
}

Hotel.getHotel = function (hotelId, result) {
	hotels.read(hotelId, function(err, rows) {
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
	hotel_images.find('all', {where: "BINARY hotelId = '"+hotelId+"'"}, function(err, rows) {
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
	hotel_facilities.find('all', {where: "BINARY hotelId = '"+hotelId+"'"}, function(err, rows) {
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
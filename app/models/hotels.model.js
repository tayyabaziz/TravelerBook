const MySQLConnetion = require('../config/database.config.js');
const logger = require('../config/log.config.js');

var Hotel = function(){
	
};

var hotels = new MySQLConnetion({tableName: "hotels"});
var hotel_images = new MySQLConnetion({tableName: "images"});
var hotel_facilities = new MySQLConnetion({tableName: "hotel_facilities"});

Hotel.getAllHotels = function (offset, limit, result) {
	logger.debug("getAllHotels()");
	hotels.find('all', {limit: [offset, limit]}, function(err, rows) {
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

Hotel.addHotel = function (hotelData, result) {
	logger.debug("addHotel()");
	hotels.save(hotelData, function(err, rows) {
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

Hotel.updateHotel = function (hotelId, hotelData, result) {
	logger.debug("updateHotel("+hotelId+")");
	hotels.set('id', hotelId);
	hotels.set('lat', hotelData.lat);
	hotels.set('lng', hotelData.lng);
	hotels.set('name', hotelData.name);
	hotels.set('address', hotelData.address);
	hotels.set('url_key', hotelData.url_key);
	hotels.set('stage_type', hotelData.stage_type);
	hotels.set('commission_percentage', hotelData.commission_percentage);
	hotels.set('tax_percentage', hotelData.tax_percentage);
	hotels.set('disclaimer', hotelData.disclaimer);
	hotels.save(function(err, rows) {
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

Hotel.updateHotelField = function(hotelId, hotelData, result) {
	logger.debug("updateHotel("+hotelId+")");
	hotels.set('id', hotelId);
	hotelData.forEach(function(key, value){
		hotels.set(key, value);
	});
	hotels.save(function(err, rows) {
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

Hotel.removeHotel = function(hotelId, result) {
	logger.debug("removeHotel("+hotelId+")");
	hotels.set('id', hotelId);
	hotels.set('inactive', 1);

	console.log(hotels);
	hotels.save(function(err, rows) {
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

Hotel.getHotel = function (hotelId, result) {
	logger.debug("getHotel("+hotelId+")");
	hotels.read(hotelId, function(err, rows) {
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

Hotel.getHotelImages = function (hotelId, result) {
	logger.debug("getHotelImages("+hotelId+")");
	hotel_images.find('all', {where: "BINARY hotelId = '"+hotelId+"'"}, function(err, rows) {
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

Hotel.getHotelFacilities = function (hotelId, result) {
	logger.debug("getHotelFacilities("+hotelId+")");
	hotel_facilities.find('all', {where: "BINARY hotelId = '"+hotelId+"'"}, function(err, rows) {
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

module.exports = Hotel;
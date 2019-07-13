'user strict';
module.exports = function (app) {
	var hotels = require('../controllers/hotels.controller');
	app.get('/hotels', hotels.list_all_hotels);
	app.get('/hotel/:hotelId', hotels.read_hotel);
	app.get('/hotel/:hotelId/hotel_images', hotels.read_hotel_images);
	app.get('/hotel/:hotelId/hotel_facilities', hotels.read_hotel_facilities);
}
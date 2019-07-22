const HotelServiceClass = require('../services/hotels.service');
const HotelService = new HotelServiceClass();

class HotelController {
	constructor() { }

	list_all_hotels(req, res) {
		let page = req.query.page ? req.query.page : 1;
		let limit = req.query.limit ? req.query.limit : 10;
		let offset = (page - 1) * limit;
		HotelService.getAllHotels({offset: offset, limit: limit}, res);
	}
	
	add_hotel(req, res) {
		HotelService.createHotel({body: req.body}, res);
	}
	
	read_hotel(req, res) {
		HotelService.getHotel({hotelId: req.params.hotelId}, res);
	}
	
	update_hotel(req, res) {
		HotelService.updateHotel({hotelId: req.params.hotelId, body: req.body}, res);
	}
	
	update_hotel_fields(req, res) {
		HotelService.updateHotelField({hotelId: req.params.hotelId, body: req.body}, res);
	}
	
	remove_hotel(req, res) {
		HotelService.removeHotel({hotelId: req.params.hotelId}, res);
	}
	
	read_hotel_images(req, res) {
		HotelService.getHotelImages({hotelId: req.params.hotelId}, res);
	}
	
	read_hotel_facilities(req, res) {
		HotelService.getHotelFacilities({hotelId: req.params.hotelId}, res);
	}
	
	add_hotel_images(req, res) {
		HotelService.createHotelImages({hotelId: req.params.hotelId, body: req.body}, res);
	}
	
	add_hotel_facilities(req, res) {
		HotelService.createHotelFacilities({hotelId: req.params.hotelId, body: req.body}, res);
	}
}

module.exports = HotelController;
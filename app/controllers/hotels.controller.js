const HotelServiceClass = require('../services/hotels.service');
const HotelService = new HotelServiceClass();

class HotelController {
	constructor() { }

	list_all_hotels(req, res) {
		let page = req.query.page ? req.query.page : 1;
		let limit = req.query.limit ? req.query.limit : 10;
		let offset = (page - 1) * limit;
		return HotelService.getAllHotels({offset: offset, limit: limit}, res);
	}
	
	read_hotel(req, res) {
		return HotelService.getHotel({hotelId: req.params.hotelId}, res);
	}
	
	add_hotel(req, res) {
		var hotelData = req.body;
		var hotel = {};
        hotel.name = (hotelData.name != undefined) ? hotelData.name: null;
        hotel.address = (hotelData.address != undefined) ? hotelData.address: null;
        hotel.lat = (hotelData.lat != undefined) ? hotelData.lat: null;
        hotel.lng = (hotelData.lng != undefined) ? hotelData.lng: null;
        hotel.url_key = (hotelData.url_key != undefined) ? hotelData.url_key: null;
        hotel.total_rating = 0;
        hotel.popularfor = (hotelData.popularfor != undefined) ? hotelData.popularfor: null;
        hotel.inactive = 0;
        hotel.createdAt = (hotelData.createdAt != undefined) ? hotelData.createdAt: null;
        hotel.images = (hotelData.images != undefined) ? hotelData.images: [];
        hotel.hotel_facilities = (hotelData.hotel_facilities != undefined) ? hotelData.hotel_facilities: [];

		return HotelService.createHotel({hotelData: hotel}, res);
	}
	
	update_hotel(req, res) {
		var hotelData = req.body;
		var hotel = {};
        hotel.name = (hotelData.name != undefined) ? hotelData.name: null;
		hotel.address = (hotelData.address != undefined) ? hotelData.address: null;
		hotel.lat = (hotelData.lat != undefined) ? hotelData.lat: null;
		hotel.lng = (hotelData.lng != undefined) ? hotelData.lng: null;
		hotel.url_key = (hotelData.url_key != undefined) ? hotelData.url_key: null;
		hotel.popularfor = (hotelData.popularfor != undefined) ? hotelData.popularfor: null;

		return HotelService.updateHotel({hotelId: req.params.hotelId, hotelData: hotel}, res);
	}
	
	update_hotel_fields(req, res) {
		var hotelData = req.body;
		return HotelService.updateHotelField({hotelId: req.params.hotelId, hotelData: hotelData}, res); //Passing Data direct because no modification required
	}
	
	remove_hotel(req, res) {
		return HotelService.removeHotel({hotelId: req.params.hotelId}, res);
	}
	
	read_hotel_images(req, res) {
		return HotelService.getHotelImages({hotelId: req.params.hotelId}, res);
	}
	
	read_hotel_facilities(req, res) {
		return HotelService.getHotelFacilities({hotelId: req.params.hotelId}, res);
	}
	
	add_hotel_images(req, res) {
		var hotelExtendedData = req.body;
		return HotelService.createHotelImages({hotelId: req.params.hotelId, hotelExtendedData: hotelExtendedData}, res); //Passing Data direct because no modification required
	}
	
	add_hotel_facilities(req, res) {
		var hotelExtendedData = req.body;
		return HotelService.createHotelFacilities({hotelId: req.params.hotelId, hotelExtendedData: hotelExtendedData}, res); //Passing Data direct because no modification required
	}
}

module.exports = HotelController;
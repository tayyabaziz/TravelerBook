const HotelServiceClass = require('../services/hotels.service');
const HotelService = new HotelServiceClass();

class HotelController {
	constructor() { }

	list_all_hotels(req, res) {
		let page = req.query.page ? req.query.page : 1;
		let limit = req.query.limit ? req.query.limit : 10;
		let offset = (page - 1) * limit;
		try {
			HotelService.getAllHotels({offset: offset, limit: limit}, res);
		}
		catch(error) {
			return res.status(400).json({message: error.message});
		}
	}
	
	add_hotel(req, res) {
		try {
			HotelService.createHotel({body: req.body}, res);
		}
		catch(error) {
			return res.status(400).json({message: error.message});
		}
	}
	
	read_hotel(req, res) {
		try {
			HotelService.getHotel({hotelId: req.params.hotelId}, res);
		}
		catch(error) {
			return res.status(400).json({message: error.message});
		}
	}
	
	update_hotel(req, res) {
		try {
			HotelService.updateHotel({hotelId: req.params.hotelId, body: req.body}, res);
		}
		catch(error) {
			return res.status(400).json({message: error.message});
		}
	}
	
	update_hotel_fields(req, res) {
		try {
			HotelService.updateHotelField({hotelId: req.params.hotelId, body: req.body}, res);
		}
		catch(error) {
			return res.status(400).json({message: error.message});
		}
	}
	
	remove_hotel(req, res) {
		try {
			HotelService.removeHotel({hotelId: req.params.hotelId}, res);
		}
		catch(error) {
			return res.status(400).json({message: error.message});
		}
	}
	
	read_hotel_images(req, res) {
		try {
			HotelService.getHotelImages({hotelId: req.params.hotelId}, res);
		}
		catch(error) {
			return res.status(400).json({message: error.message});
		}
	}
	
	read_hotel_facilities(req, res) {
		try {
			HotelService.getHotelFacilities({hotelId: req.params.hotelId}, res);
		}
		catch(error) {
			return res.status(400).json({message: error.message});
		}
	}
	
	add_hotel_images(req, res) {
		try {
			HotelService.createHotelImages({hotelId: req.params.hotelId, body: req.body}, res);
		}
		catch(error) {
			return res.status(400).json({message: error.message});
		}
	}
	
	add_hotel_facilities(req, res) {
		try {
			HotelService.createHotelFacilities({hotelId: req.params.hotelId, body: req.body}, res);
		}
		catch(error) {
			return res.status(400).json({message: error.message});
		}
	}
}

module.exports = HotelController;
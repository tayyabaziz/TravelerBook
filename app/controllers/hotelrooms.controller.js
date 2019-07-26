const HotelRoomsServiceClass = require('../services/hotelrooms.service');
const HotelRoomsService = new HotelRoomsServiceClass();

class HotelRoomsController {
	constructor() { }

	read_hotel_rooms(req, res) {
		return HotelRoomsService.getAllHotelRooms({hotelId: req.params.hotelId}, res);
	}
}

module.exports = HotelRoomsController;
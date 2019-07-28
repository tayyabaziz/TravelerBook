const HotelRoomsServiceClass = require('../services/hotelrooms.service');
const ErrorHandler = require('../handlers/error.handler');
const ResponseHandler = require('../handlers/response.handler');
const HotelRoomsService = new HotelRoomsServiceClass();

class HotelRoomsController {
	constructor() { }

	async read_hotel_rooms(req, res) {
		try {
			var data = await HotelRoomsService.getAllHotelRooms({ hotelId: req.params.hotelId });
			new ResponseHandler({ status: 200, message: data }, res);
		} catch (err) {
			new ErrorHandler(err, res);
		}
	}
}

module.exports = HotelRoomsController;
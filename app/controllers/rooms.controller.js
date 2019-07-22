const RoomServiceClass = require('../services/rooms.service');
const RoomService = new RoomServiceClass();

class RoomController {
	constructor() { }

	list_all_rooms(req, res) {
		let page = req.query.page ? req.query.page : 1;
		let limit = req.query.limit ? req.query.limit : 10;
		let offset = (page - 1) * limit;
		RoomService.getAllRooms({offset: offset, limit: limit}, res);
	}
	
	add_room(req, res) {
		RoomService.createRoom({body: req.body}, res);
	}
	
	read_room(req, res) {
		RoomService.getRoom({roomId: req.params.roomId}, res);
	}
	
	update_room(req, res) {
		RoomService.updateRoom({roomId: req.params.roomId, body: req.body}, res);
	}
	
	update_room_fields(req, res) {
		RoomService.updateRoomField({roomId: req.params.roomId, body: req.body}, res);
	}
	
	remove_room(req, res) {
		RoomService.removeRoom({roomId: req.params.roomId}, res);
	}
	
	read_room_images(req, res) {
		RoomService.getRoomImages({roomId: req.params.roomId}, res);
	}
	
	read_room_facilities(req, res) {
		RoomService.getRoomFacilities({roomId: req.params.roomId}, res);
	}
	
	add_room_images(req, res) {
		RoomService.createRoomImages({roomId: req.params.roomId, body: req.body}, res);
	}
	
	add_room_facilities(req, res) {
		RoomService.createRoomFacilities({roomId: req.params.roomId, body: req.body}, res);
	}
}

module.exports = RoomController;
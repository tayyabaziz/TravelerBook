const RoomServiceClass = require('../services/rooms.service');
const RoomService = new RoomServiceClass();

class RoomController {
	constructor() { }

	list_all_rooms(req, res) {
		let page = req.query.page ? req.query.page : 1;
		let limit = req.query.limit ? req.query.limit : 10;
		let offset = (page - 1) * limit;
		try {
			RoomService.getAllRooms({offset: offset, limit: limit}, res);
		}
		catch(error) {
			return res.status(400).json({message: error.message});
		}
	}
	
	add_room(req, res) {
		try {
			RoomService.createRoom({body: req.body}, res);
		}
		catch(error) {
			return res.status(400).json({message: error.message});
		}
	}
	
	read_room(req, res) {
		try {
			RoomService.getRoom({roomId: req.params.roomId}, res);
		}
		catch(error) {
			return res.status(400).json({message: error.message});
		}
	}
	
	update_room(req, res) {
		try {
			RoomService.updateRoom({roomId: req.params.roomId, body: req.body}, res);
		}
		catch(error) {
			return res.status(400).json({message: error.message});
		}
	}
	
	update_room_fields(req, res) {
		try {
			RoomService.updateRoomField({roomId: req.params.roomId, body: req.body}, res);
		}
		catch(error) {
			return res.status(400).json({message: error.message});
		}
	}
	
	remove_room(req, res) {
		try {
			RoomService.removeRoom({roomId: req.params.roomId}, res);
		}
		catch(error) {
			return res.status(400).json({message: error.message});
		}
	}
	
	read_room_images(req, res) {
		try {
			RoomService.getRoomImages({roomId: req.params.roomId}, res);
		}
		catch(error) {
			return res.status(400).json({message: error.message});
		}
	}
	
	read_room_facilities(req, res) {
		try {
			RoomService.getRoomFacilities({roomId: req.params.roomId}, res);
		}
		catch(error) {
			return res.status(400).json({message: error.message});
		}
	}
	
	add_room_images(req, res) {
		try {
			RoomService.createRoomImages({roomId: req.params.roomId, body: req.body}, res);
		}
		catch(error) {
			return res.status(400).json({message: error.message});
		}
	}
	
	add_room_facilities(req, res) {
		try {
			RoomService.createRoomFacilities({roomId: req.params.roomId, body: req.body}, res);
		}
		catch(error) {
			return res.status(400).json({message: error.message});
		}
	}
}

module.exports = RoomController;
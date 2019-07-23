const RoomServiceClass = require('../services/rooms.service');
const RoomService = new RoomServiceClass();

class RoomController {
	constructor() { }

	list_all_rooms(req, res) {
		let page = req.query.page ? req.query.page : 1;
		let limit = req.query.limit ? req.query.limit : 10;
		let offset = (page - 1) * limit;
		return RoomService.getAllRooms({offset: offset, limit: limit}, res);
	}
	
	read_room(req, res) {
		return RoomService.getRoom({roomId: req.params.roomId}, res);
	}
	
	add_room(req, res) {
		var roomData = req.body;
		var room = {};
        room.roomType = (roomData.roomType != undefined) ? roomData.roomType: null;
        room.desc = (roomData.desc != undefined) ? roomData.desc: null;
        room.bed = (roomData.bed != undefined) ? roomData.bed: null;
        room.isBreakfastIncluded = (roomData.isBreakfastIncluded != undefined) ? roomData.isBreakfastIncluded: null;
        room.hotelId = (roomData.hotelId != undefined) ? roomData.hotelId: null;
        room.price = (roomData.price != undefined) ? roomData.price: null;
        room.discountPrice = (roomData.discountPrice != undefined) ? roomData.discountPrice: null;
        room.noOfRooms = (roomData.noOfRooms != undefined) ? roomData.noOfRooms: null;
        room.noOfAdults = (roomData.noOfAdults != undefined) ? roomData.noOfAdults: null;
        room.noOfChilds = (roomData.noOfChilds != undefined) ? roomData.noOfChilds: null;
        room.maxCancelationTime = (roomData.maxCancelationTime != undefined) ? roomData.maxCancelationTime: null;
        room.inactive = 0;
        room.room_images = (roomData.room_images != undefined) ? roomData.room_images: [];
        room.room_facilities = (roomData.room_facilities != undefined) ? roomData.room_facilities: [];
		
		return RoomService.createRoom({roomData: room}, res);
	}
	
	update_room(req, res) {
		var roomData = req.body;
		var room = {};
        room.roomType = (roomData.roomType != undefined) ? roomData.roomType: null;
		room.desc = (roomData.desc != undefined) ? roomData.desc: null;
		room.bed = (roomData.bed != undefined) ? roomData.bed: null;
		room.isBreakfastIncluded = (roomData.isBreakfastIncluded != undefined) ? roomData.isBreakfastIncluded: null;
		room.price = (roomData.price != undefined) ? roomData.price: null;
		room.discountPrice = (roomData.discountPrice != undefined) ? roomData.discountPrice: null;
		room.noOfRooms = (roomData.noOfRooms != undefined) ? roomData.noOfRooms: null;
		room.noOfAdults = (roomData.noOfAdults != undefined) ? roomData.noOfAdults: null;
		room.noOfChilds = (roomData.noOfChilds != undefined) ? roomData.noOfChilds: null;
		room.maxCancelationTime = (roomData.maxCancelationTime != undefined) ? roomData.maxCancelationTime: null;
		
		return RoomService.updateRoom({roomId: req.params.roomId, roomData: room}, res);
	}
	
	update_room_fields(req, res) {
		var roomData = req.body;
		return RoomService.updateRoomField({roomId: req.params.roomId, roomData: roomData}, res); //Passing Data direct because no modification required
	}
	
	remove_room(req, res) {
		return RoomService.removeRoom({roomId: req.params.roomId}, res);
	}
	
	read_room_images(req, res) {
		return RoomService.getRoomImages({roomId: req.params.roomId}, res);
	}
	
	read_room_facilities(req, res) {
		return RoomService.getRoomFacilities({roomId: req.params.roomId}, res);
	}
	
	add_room_images(req, res) {
		var roomExtendedData = req.body;
		return RoomService.createRoomImages({roomId: req.params.roomId, roomExtendedData: roomExtendedData}, res); //Passing Data direct because no modification required
	}
	
	add_room_facilities(req, res) {
		var roomExtendedData = req.body;
		return RoomService.createRoomFacilities({roomId: req.params.roomId, roomExtendedData: roomExtendedData}, res); //Passing Data direct because no modification required
	}
}

module.exports = RoomController;
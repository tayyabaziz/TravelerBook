const RoomModelClass = require('../models/rooms.model');
const HelperClass = require('../helper/helper.class');
const Helper = new HelperClass();
const RoomModel = new RoomModelClass();

class RoomService {
    constructor() { }

    getAllRooms(data, res) {
        RoomModel.getAllRooms(data.offset, data.limit, function(err, rows) {
			Helper.formatResult(res, err, rows);
		});
    }
    createRoom(data, res) {
        RoomModel.createRoom(data.body, function(err, rows) {
            Helper.formatResult(res, err, rows);
        });
    }
    getRoom(data, res) {
    	RoomModel.getRoom(data.roomId, function(err, rows) {
			Helper.formatResult(res, err, rows);
		});
	}
    updateRoom(data, res) {
    	RoomModel.updateRoom(data.roomId, data.body, function(err, rows) {
			Helper.formatResult(res, err, rows);
		});
	}
    updateRoomField(data, res) {
    	RoomModel.updateRoomField(data.roomId, data.body, function(err, rows) {
			Helper.formatResult(res, err, rows);
		});
	}
    removeRoom(data, res) {
    	RoomModel.removeRoom(data.roomId, function(err, rows) {
			Helper.formatResult(res, err, rows);
		});
	}
    getRoomImages(data, res) {
    	RoomModel.getRoomImages(data.roomId, function(err, rows) {
			Helper.formatResult(res, err, rows);
		});
	}
    getRoomFacilities(data, res) {
    	RoomModel.getRoomFacilities(data.roomId, function(err, rows) {
			Helper.formatResult(res, err, rows);
		});
	}
    createRoomImages(data, res) {
    	RoomModel.createRoomImages(data.roomId, data.body, function(err, rows) {
		  	Helper.formatResult(res, err, rows);
		});
	}
    createRoomFacilities(data, res) {
    	RoomModel.createRoomFacilities(data.roomId, data.body, function(err, rows) {
		  	Helper.formatResult(res, err, rows);
		});
	}
}

module.exports = RoomService;
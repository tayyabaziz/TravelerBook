const RoomModelClass = require('../models/rooms.model');
const RoomModel = new RoomModelClass();

class RoomService {
    constructor() { }

    getAllRooms(data, res) {
        try {
            RoomModel.getAllRooms(data.offset, data.limit, res);
        } catch (error) {
            throw Error(error);
        }
    }
    createRoom(data, res) {
        try {
            RoomModel.createRoom(data.body, res);
        } catch (error) {
            throw Error(error);
        }
    }
    getRoom(data, res) {
    	try {
            RoomModel.getRoom(data.roomId, res);
        } catch (error) {
            throw Error(error);
        }
    }
    updateRoom(data, res) {
    	try {
            RoomModel.updateRoom(data.roomId, data.body, res);
        } catch (error) {
            throw Error(error);
        }
    }
    updateRoomField(data, res) {
    	try {
            RoomModel.updateRoomField(data.roomId, data.body, res);
        } catch (error) {
            throw Error(error);
        }
    }
    removeRoom(data, res) {
    	try {
            RoomModel.removeRoom(data.roomId, res);
        } catch (error) {
            throw Error(error);
        }
    }
    getRoomImages(data, res) {
    	try {
            RoomModel.getRoomImages(data.roomId, res);
        } catch (error) {
            throw Error(error);
        }
    }
    getRoomFacilities(data, res) {
    	try {
            RoomModel.getRoomFacilities(data.roomId, res);
        } catch (error) {
            throw Error(error);
        }
    }
    createRoomImages(data, res) {
    	try {
            RoomModel.createRoomImages(data.roomId, data.body, res);
        } catch (error) {
            throw Error(error);
        }
    }
    createRoomFacilities(data, res) {
    	try {
            RoomModel.createRoomFacilities(data.roomId, data.body, res);
        } catch (error) {
            throw Error(error);
        }
    }
}

module.exports = RoomService;
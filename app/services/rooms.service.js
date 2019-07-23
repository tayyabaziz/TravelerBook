const RoomModel = require('../models/room.model');
const RoomImagesModel = require('../models/room_images.model');
const RoomFacilitiesModel = require('../models/room_facilities.model');
const {ResourceNotFoundError, InvalidDataError} = require('../errors/customerrors.errors');
const SequelizeConnection = require('../config/database.config');
const Sequelize = SequelizeConnection.Sequelize;

class RoomService {
    constructor() {
        this.Rooms = new RoomModel();
        this.RoomImages = new RoomImagesModel();
        this.RoomFacilities = new RoomFacilitiesModel();

        this.Rooms.hasMany(this.RoomImages);
        this.RoomImages.belongsTo(this.Rooms, {
			as: 'RoomImages',
            foreignKey: 'roomId'
        });
        
        this.Rooms.hasMany(this.RoomFacilities);
        this.RoomFacilities.belongsTo(this.Rooms, {
			as: 'RoomFacilities',
            foreignKey: 'roomId'
        });
    }

    getAllRooms(data, res) {
        this.Rooms.findAll({
            offset: parseInt(data.offset),
			limit: parseInt(data.limit),
			include : [this.RoomImages, this.RoomFacilities]
        }).then(rooms => {
			if (rooms === undefined || rooms.length == 0)
				return new ErrorHandler(new ResourceNotFoundError("Rooms"), res);
			else 
				return res.json(rooms);
        }).catch(Sequelize.Error, function (err) {
            return new ErrorHandler(new DatabaseError(err.message, err.name), res);
        });
    }
    
    getRoom(data, res) {
    	if(!isNaN(data.roomId)) {
            this.Rooms.findOne({
                where: {id: data.roomId},
				include : [this.RoomImages, this.RoomFacilities]
            }).then(room => {
                if (room === undefined || room == null || room.length == 0)
					return new ErrorHandler(new ResourceNotFoundError("Room"), res);
				else 
					return res.json(room);
            }).catch(Sequelize.Error, function (err) {
                return new ErrorHandler(new DatabaseError(err.message, err.name), res);
            });
        }
        else {
            throw new InvalidDataError("Room Id");
        }
    }

    createRoom(data, res) {
        var room = {};
        room.roomType = (data.roomData.roomType != undefined) ? data.roomData.roomType: null;
        room.desc = (data.roomData.desc != undefined) ? data.roomData.desc: null;
        room.bed = (data.roomData.bed != undefined) ? data.roomData.bed: null;
        room.isBreakfastIncluded = (data.roomData.isBreakfastIncluded != undefined) ? data.roomData.isBreakfastIncluded: null;
        room.hotelId = (data.roomData.hotelId != undefined) ? data.roomData.hotelId: null;
        room.price = (data.roomData.price != undefined) ? data.roomData.price: null;
        room.discountPrice = (data.roomData.discountPrice != undefined) ? data.roomData.discountPrice: null;
        room.noOfRooms = (data.roomData.noOfRooms != undefined) ? data.roomData.noOfRooms: null;
        room.noOfAdults = (data.roomData.noOfAdults != undefined) ? data.roomData.noOfAdults: null;
        room.noOfChilds = (data.roomData.noOfChilds != undefined) ? data.roomData.noOfChilds: null;
        room.maxCancelationTime = (data.roomData.maxCancelationTime != undefined) ? data.roomData.maxCancelationTime: null;
        room.inactive = 0;
        room.room_images = (data.roomData.room_images != undefined) ? data.roomData.room_images: [];
        room.room_facilities = (data.roomData.room_facilities != undefined) ? data.roomData.room_facilities: [];
        
        this.Rooms.create(room, {
            include: [this.RoomImages, this.RoomFacilities]
        }).then((roomResponse) => {
			if (roomResponse === undefined || roomResponse == null || roomResponse.length == 0)
				return new ErrorHandler(new ResourceNotFoundError("Room"), res);
			else 
				return res.json(roomResponse);
        }).catch(Sequelize.Error, function (err) {
            return new ErrorHandler(new DatabaseError(err.message, err.name), res);
        });
    }

    updateRoom(data, res) {
    	if(!isNaN(data.roomId)) {
            this.Rooms.findOne({
				where: {id: data.roomId},
				include : [this.RoomImages, this.RoomFacilities]
            }).then(room => {
				if (room === undefined || room == null || room.length == 0)
					return new ErrorHandler(new ResourceNotFoundError("Room"), res);
				else {
					room.roomType = (data.roomData.roomType != undefined) ? data.roomData.roomType: null;
					room.desc = (data.roomData.desc != undefined) ? data.roomData.desc: null;
					room.bed = (data.roomData.bed != undefined) ? data.roomData.bed: null;
					room.isBreakfastIncluded = (data.roomData.isBreakfastIncluded != undefined) ? data.roomData.isBreakfastIncluded: null;
					room.price = (data.roomData.price != undefined) ? data.roomData.price: null;
					room.discountPrice = (data.roomData.discountPrice != undefined) ? data.roomData.discountPrice: null;
					room.noOfRooms = (data.roomData.noOfRooms != undefined) ? data.roomData.noOfRooms: null;
					room.noOfAdults = (data.roomData.noOfAdults != undefined) ? data.roomData.noOfAdults: null;
					room.noOfChilds = (data.roomData.noOfChilds != undefined) ? data.roomData.noOfChilds: null;
					room.maxCancelationTime = (data.roomData.maxCancelationTime != undefined) ? data.roomData.maxCancelationTime: null;

					room.save().then(function() {
						return res.json(room);
					}).catch(Sequelize.Error, function (err) {
						return new ErrorHandler(new DatabaseError(err.message, err.name), res);
					});
				}
            }).catch(Sequelize.Error, function (err) {
                return new ErrorHandler(new DatabaseError(err.message, err.name), res);
            });
		}
        else {
            throw new InvalidDataError("Room Id");
        }
    }

    updateRoomField(data, res) {
    	if(!isNaN(data.roomId)) {
            this.Rooms.findOne({
				where: {id: hotelId},
				include : [this.RoomImages, this.RoomFacilities]
            }).then(room => {
				if (room === undefined || room == null || room.length == 0)
					return new ErrorHandler(new ResourceNotFoundError("Room"), res);
				else {
					for (const key in data.roomData) {
						if (data.roomData.hasOwnProperty(key)) {
							room[key] = (data.roomData[key] != undefined) ? data.roomData[key]: null;
						}
					}
					room.save().then(function() {
						return res.json(room);
					}).catch(Sequelize.Error, function (err) {
						return new ErrorHandler(new DatabaseError(err.message, err.name), res);
					});
				}
            }).catch(Sequelize.Error, function (err) {
                return new ErrorHandler(new DatabaseError(err.message, err.name), res);
            });
		}
		else {
			throw new InvalidDataError("Room Id");
		}
    }

    removeRoom(data, res) {
    	if(!isNaN(data.roomId)) {
            this.Rooms.findOne({
                where: {id: data.roomId},
				include : [this.roomImages, this.roomFacilities]               
            }).then(room => {
				if (room === undefined || room == null || room.length == 0)
					return new ErrorHandler(new ResourceNotFoundError("Room"), res);
				else {
					room.inactive = 1;
					room.save().then(function() {
						return res.json(room);
					}).catch(Sequelize.Error, function (err) {
						return new ErrorHandler(new DatabaseError(err.message, err.name), res);
					});
				}
            }).catch(Sequelize.Error, function (err) {
                return new ErrorHandler(new DatabaseError(err.message, err.name), res);
            });
		}
		else {
			throw new InvalidDataError("Room Id");
		}
    }

    getRoomImages(data, res) {
    	if(!isNaN(data.roomId)) {
            this.RoomImages.findAll({
                where: {roomId: data.roomId}
            }).then(room_images => {
				if (room_images === undefined || room_images == null || room_images.length == 0)
					return new ErrorHandler(new ResourceNotFoundError("Room images"), res);
				else 
					return res.json(room_images);
            }).catch(Sequelize.Error, function (err) {
                return new ErrorHandler(new DatabaseError(err.message, err.name), res);
            });
        }
        else {
            throw new InvalidDataError("Room Id");
        }
    }

    getRoomFacilities(data, res) {
    	if(!isNaN(data.roomId)) {
            this.RoomFacilities.findAll({
                where: {roomId: data.roomId}
            }).then(room_facilities => {
				if (room_facilities === undefined || room_facilities == null || room_facilities.length == 0)
					return new ErrorHandler(new ResourceNotFoundError("Room facilities"), res);
				else 
					return res.json(room_facilities);
            }).catch(Sequelize.Error, function (err) {
                return new ErrorHandler(new DatabaseError(err.message, err.name), res);
            });
        }
        else {
            throw new InvalidDataError("Room Id");
        }
    }

    createRoomImages(data, res) {
    	if(!isNaN(data.roomId)) {
			this.Rooms.findOne({
                where: {id: data.roomId},
            }).then(room => {
				if (room === undefined || room === null || room.length == 0)
					return new ErrorHandler(new ResourceNotFoundError("Room"), res);
				else {
					for (let index = 0; index < data.roomExtendedData.length; index++) {
						data.roomExtendedData[index].roomId = data.roomId;
					}
					this.RoomImages.bulkCreate(data.roomExtendedData).then((room_image) => {
						return res.json(room_image);
					}).catch(Sequelize.Error, function (err) {
						return new ErrorHandler(new DatabaseError(err.message, err.name), res);
					});
				}
            }).catch(Sequelize.Error, function (err) {
                return new ErrorHandler(new DatabaseError(err.message, err.name), res);
            });
        }
        else {
            throw new InvalidDataError("Room Id");
        }
    }

    createRoomFacilities(data, res) {
    	if(!isNaN(data.roomId)) {
			this.Rooms.findOne({
                where: {id: data.roomId},
            }).then(room => {
				if (room === undefined || room === null || room.length == 0)
					return new ErrorHandler(new ResourceNotFoundError("Room"), res);
				else {
					for (let index = 0; index < data.roomExtendedData.length; index++) {
						data.roomExtendedData[index].roomId = data.roomId;
					}
					this.RoomFacilities.bulkCreate(data.roomExtendedData).then((room_facility) => {
						return res.json(room_facility);
					}).catch(Sequelize.Error, function (err) {
						return new ErrorHandler(new DatabaseError(err.message, err.name), res);
					});
				}
            }).catch(Sequelize.Error, function (err) {
                return new ErrorHandler(new DatabaseError(err.message, err.name), res);
            });
        }
        else {
            throw new InvalidDataError("Room Id");
        }
    }
}

module.exports = RoomService;
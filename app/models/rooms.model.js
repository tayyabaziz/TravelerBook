const HelperClass = require('../helper/helper.class');
const SequelizeConnection = require('../config/database.config');

const Helper = new HelperClass();
const Sequelize = SequelizeConnection.Sequelize;
const sequelize = SequelizeConnection.sequelize;

class RoomModel {
    constructor() {
        var baseTableName = 'rooms';
        var baseTableFields = {
            id: {type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement : true},
            roomType: { type: Sequelize.STRING, allowNull: false },
            desc: { type: Sequelize.STRING },
            bed: { type: Sequelize.INTEGER },
            isBreakfastIncluded: { type: Sequelize.INTEGER },
            hotelId: { type: Sequelize.INTEGER, allowNull: false},
			price: { type: Sequelize.DECIMAL },
			discountPrice: { type: Sequelize.DECIMAL },
            noOfRooms: { type: Sequelize.INTEGER },
			noOfAdults: { type: Sequelize.INTEGER },
			noOfChilds: { type: Sequelize.INTEGER },
            maxCancelationTime: { type: Sequelize.DATE },
            inactive: { type: Sequelize.INTEGER, allowNull: false},
        };
        var baseTableOptions = {
            tableName: baseTableName,
            freezeTableName: true,
            timestamps: false
        };

        this.Rooms = sequelize.define(baseTableName, baseTableFields, baseTableOptions);
        this.Rooms.sync();

        this.RoomImages = sequelize.define('room_images', {
            id: {type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement : true},
            imageUrl: { type: Sequelize.STRING, allowNull: false },
            roomId: { type: Sequelize.BIGINT, allowNull: false },
        }, {
            tableName: 'room_images',
            freezeTableName: true,
            timestamps: false
        });
        this.Rooms.hasMany(this.RoomImages);
        this.RoomImages.belongsTo(this.Rooms, {
			as: 'RoomImages',
            foreignKey: 'roomId'
        });
        this.RoomImages.sync();
        
        this.RoomFacilities = sequelize.define('room_facilities', {
            id: {type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement : true},
            facilityId: { type: Sequelize.BIGINT, allowNull: false },
			roomId: { type: Sequelize.BIGINT, allowNull: false },
			isImportant: { type: Sequelize.BIGINT},
        }, {
            tableName: 'room_facilities',
            freezeTableName: true,
            timestamps: false
        });
        this.Rooms.hasMany(this.RoomFacilities);
        this.RoomFacilities.belongsTo(this.Rooms, {
			as: 'RoomFacilities',
            foreignKey: 'roomId'
        });
        this.RoomFacilities.sync();
    }

    getAllRooms(offset, limit, result) {
        this.Rooms.findAll({
            offset: parseInt(offset),
			limit: parseInt(limit),
			include : [this.RoomImages, this.RoomFacilities]
        }).then(rooms => {
            Helper.handleResult(result, rooms);
        }).catch(Sequelize.Error, function (err) {
            result(err, null);
        });
    }

    getRoom(roomId, result) {
        if(!isNaN(roomId)) {
            this.Rooms.findOne({
                where: {id: roomId},
				include : [this.RoomImages, this.RoomFacilities]
            }).then(room => {
                Helper.handleResult(result, room);
            }).catch(Sequelize.Error, function (err) {
                result(err, null);
            });
        }
        else {
            result("Incorrect Room Id", null);
        }
    }
    
    createRoom(roomData, result) {
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
        
        this.Rooms.create(room, {
            include: [this.RoomImages, this.RoomFacilities]
        }).then((roomResponse) => {
            result(null, roomResponse);
        }).catch(Sequelize.Error, function (err) {
            result(err.message, null);
        });
    }

    updateRoom(roomId, roomData, result) {
		if(!isNaN(roomId)) {
            this.Rooms.findOne({
				where: {id: roomId},
				include : [this.RoomImages, this.RoomFacilities]
            }).then(room => {
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

                room.save().then(function() {
                    result(null, room);
                }).catch(Sequelize.Error, function (err) {
                    result(err.message, null);
                });
            }).catch(Sequelize.Error, function (err) {
                result(err, null);
            });
		}
        else {
            result("Incorrect Room Id", null);
        }
	}
	
	updateRoom(roomId, roomData, result) {
		if(!isNaN(roomId)) {
			this.Rooms.update(
				{
					roomType: roomData.roomType,
					desc: roomData.desc,
					bed: roomData.bed,
					isBreakfastIncluded: roomData.isBreakfastIncluded,
					hotelId: roomData.hotelId,
					price: roomData.price,
					discountPrice: roomData.discountPrice,
					noOfRooms: roomData.noOfRooms,
					noOfAdults: roomData.noOfAdults,
					noOfChilds: roomData.noOfChilds,
					maxCancelationTime: roomData.maxCancelationTime,
					inactive: roomData.inactive,
				}, {
					returning: true,
					plain: true,
					where: {id: roomId}
				}
			).then(([rowsUpdated, room]) => {
                Helper.handleResult(result, room);
            }).catch(Sequelize.Error, function (err) {
                result(err, null);
            });
		}
		else {
			result("Incorrect Room Id", null);
		}
	}

	updateRoomField(roomId, roomData, result) {
		if(!isNaN(roomId)) {
            this.Rooms.findOne({
				where: {id: hotelId},
				include : [this.RoomImages, this.RoomFacilities]
            }).then(room => {
                for (const key in roomData) {
                    if (roomData.hasOwnProperty(key)) {
                        room[key] = (roomData[key] != undefined) ? roomData[key]: null;
                    }
                }
                room.save().then(function() {
                    result(null, room);
                }).catch(Sequelize.Error, function (err) {
                    result(err.message, null);
                });
            }).catch(Sequelize.Error, function (err) {
                result(err, null);
            });
		}
		else {
			result("Incorrect Room Id", null);
		}
	}

	removeRoom(roomId, result) {
		if(!isNaN(roomId)) {
            this.Rooms.findOne({
                where: {id: roomId},
				include : [this.roomImages, this.roomFacilities]               
            }).then(room => {
                room.inactive = 1;
                room.save();
                Helper.handleResult(result, room);
            }).catch(Sequelize.Error, function (err) {
                result(err, null);
            });
		}
		else {
			result("Incorrect Room Id", null);
		}
	}

    getRoomImages(roomId, result) {
        if(!isNaN(roomId)) {
            this.RoomImages.findAll({
                where: {roomId: roomId}
            }).then(room_images => {
                Helper.handleResult(result, room_images);
            }).catch(Sequelize.Error, function (err) {
                result(err, null);
            });
        }
        else {
            result("Incorrect Room Id", null);
        }
	}

	getRoomFacilities(roomId, result) {
        if(!isNaN(roomId)) {
            this.RoomFacilities.findAll({
                where: {roomId: roomId}
            }).then(room_facilities => {
                Helper.handleResult(result, room_facilities);
            }).catch(Sequelize.Error, function (err) {
                result(err, null);
            });
        }
        else {
            result("Incorrect Room Id", null);
        }
    }
    
    createRoomImages(roomId, roomExtendedData, result) {
        if(!isNaN(roomId)) {
            for (let index = 0; index < roomExtendedData.length; index++) {
                roomExtendedData[index].roomId = roomId;
            }
            this.RoomImages.bulkCreate(roomExtendedData).then((room_image) => {
                result(null, room_image);
            }).catch(Sequelize.Error, function (err) {
                result(err.message, null);
            });
        }
        else {
            result("Incorrect room Id", null);
        }
    }
    
    createRoomFacilities(roomId, roomExtendedData, result) {
        if(!isNaN(roomId)) {
            for (let index = 0; index < roomExtendedData.length; index++) {
                roomExtendedData[index].roomId = roomId;
            }
            this.RoomFacilities.bulkCreate(roomExtendedData).then((room_facility) => {
                result(null, room_facility);
            }).catch(Sequelize.Error, function (err) {
                result(err.message, null);
            });
        }
        else {
            result("Incorrect Hotel Id", null);
        }
    }
}
module.exports = RoomModel;
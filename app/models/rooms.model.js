const SequelizeConnection = require('../config/database.config');
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

    getAllRooms(offset, limit, res) {
        this.Rooms.findAll({
            offset: parseInt(offset),
			limit: parseInt(limit),
			include : [this.RoomImages, this.RoomFacilities]
        }).then(rooms => {
			if (rooms === undefined || rooms.length == 0)
				return res.status(404).json({"message": "No Data Found"});
			else 
				return res.json(rooms);
        }).catch(Sequelize.Error, function (err) {
            throw Error(err.message);
        });
    }

    getRoom(roomId, res) {
        if(!isNaN(roomId)) {
            this.Rooms.findOne({
                where: {id: roomId},
				include : [this.RoomImages, this.RoomFacilities]
            }).then(room => {
                if (room === undefined || room == null || room.length == 0)
					return res.status(404).json({"message": "No Data Found"});
				else 
					return res.json(room);
            }).catch(Sequelize.Error, function (err) {
                throw Error(err.message);
            });
        }
        else {
            throw Error("Incorrect Room Id");
        }
    }
    
    createRoom(roomData, res) {
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
			if (roomResponse === undefined || roomResponse == null || roomResponse.length == 0)
				return res.status(404).json({"message": "No Data Found"});
			else 
				return res.json(roomResponse);
        }).catch(Sequelize.Error, function (err) {
            throw Error(err.message);
        });
    }

    updateRoom(roomId, roomData, res) {
		if(!isNaN(roomId)) {
            this.Rooms.findOne({
				where: {id: roomId},
				include : [this.RoomImages, this.RoomFacilities]
            }).then(room => {
				if (room === undefined || room == null || room.length == 0)
					return res.status(404).json({"message": "No Data Found"});
				else {
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
						return res.json(room);
					}).catch(Sequelize.Error, function (err) {
						throw Error(err.message);
					});
				}
            }).catch(Sequelize.Error, function (err) {
                throw Error(err.message);
            });
		}
        else {
            throw Error("Incorrect Room Id");
        }
	}

	updateRoomField(roomId, roomData, res) {
		if(!isNaN(roomId)) {
            this.Rooms.findOne({
				where: {id: hotelId},
				include : [this.RoomImages, this.RoomFacilities]
            }).then(room => {
				if (room === undefined || room == null || room.length == 0)
					return res.status(404).json({"message": "No Data Found"});
				else {
					for (const key in roomData) {
						if (roomData.hasOwnProperty(key)) {
							room[key] = (roomData[key] != undefined) ? roomData[key]: null;
						}
					}
					room.save().then(function() {
						return res.json(room);
					}).catch(Sequelize.Error, function (err) {
						throw Error(err.message);
					});
				}
            }).catch(Sequelize.Error, function (err) {
                throw Error(err.message);
            });
		}
		else {
			throw Error("Incorrect Room Id");
		}
	}

	removeRoom(roomId, res) {
		if(!isNaN(roomId)) {
            this.Rooms.findOne({
                where: {id: roomId},
				include : [this.roomImages, this.roomFacilities]               
            }).then(room => {
				console.log(room);
				if (room === undefined || room == null || room.length == 0)
					return res.status(404).json({"message": "No Data Found"});
				else {
					room.inactive = 1;
					room.save().then(function() {
						return res.json(room);
					}).catch(Sequelize.Error, function (err) {
						throw Error(err.message);
					});
				}
            }).catch(Sequelize.Error, function (err) {
                throw Error(err.message);
            });
		}
		else {
			throw Error("Incorrect Room Id");
		}
	}

    getRoomImages(roomId, res) {
        if(!isNaN(roomId)) {
            this.RoomImages.findAll({
                where: {roomId: roomId}
            }).then(room_images => {
				if (room_images === undefined || room_images == null || room_images.length == 0)
					return res.status(404).json({"message": "No Data Found"});
				else 
					return res.json(room_images);
            }).catch(Sequelize.Error, function (err) {
                throw Error(err.message);
            });
        }
        else {
            throw Error("Incorrect Room Id");
        }
	}

	getRoomFacilities(roomId, res) {
        if(!isNaN(roomId)) {
            this.RoomFacilities.findAll({
                where: {roomId: roomId}
            }).then(room_facilities => {
				if (room_facilities === undefined || room_facilities == null || room_facilities.length == 0)
					return res.status(404).json({"message": "No Data Found"});
				else 
					return res.json(room_facilities);
            }).catch(Sequelize.Error, function (err) {
                throw Error(err.message);
            });
        }
        else {
            throw Error("Incorrect Room Id");
        }
    }
    
    createRoomImages(roomId, roomExtendedData, res) {
        if(!isNaN(roomId)) {
			this.Rooms.findOne({
                where: {id: roomId},
            }).then(room => {
				if (room === undefined || room === null || room.length == 0)
					return res.status(404).json({"message": "No Data Found"});
				else {
					for (let index = 0; index < roomExtendedData.length; index++) {
						roomExtendedData[index].roomId = roomId;
					}
					this.RoomImages.bulkCreate(roomExtendedData).then((room_image) => {
						if (room_image === undefined || room_image == null || room_image.length == 0)
							return res.status(404).json({"message": "No Data Found"});
						else 
							return res.json(room_image);
					}).catch(Sequelize.Error, function (err) {
						throw Error(err.message);
					});
				}
            }).catch(Sequelize.Error, function (err) {
                throw Error(err.message);
            });
        }
        else {
            throw Error("Incorrect Room Id");
        }
    }
    
    createRoomFacilities(roomId, roomExtendedData, res) {
        if(!isNaN(roomId)) {
			this.Rooms.findOne({
                where: {id: roomId},
            }).then(room => {
				if (room === undefined || room === null || room.length == 0)
					return res.status(404).json({"message": "No Data Found"});
				else {
					for (let index = 0; index < roomExtendedData.length; index++) {
						roomExtendedData[index].roomId = roomId;
					}
					this.RoomFacilities.bulkCreate(roomExtendedData).then((room_facility) => {
						if (room_facility === undefined || room_facility == null || room_facility.length == 0)
							return res.status(404).json({"message": "No Data Found"});
						else 
							return res.json(room_facility);
					}).catch(Sequelize.Error, function (err) {
						throw Error(err.message);
					});
				}
            }).catch(Sequelize.Error, function (err) {
                throw Error(err.message);
            });
        }
        else {
            throw Error("Incorrect Room Id");
        }
    }
}
module.exports = RoomModel;
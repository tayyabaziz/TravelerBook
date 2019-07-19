var HelperClass = require('../helper/helper.class');

const SequelizeConnection = require('../config/database.config.js');
const Sequelize = SequelizeConnection.Sequelize;
const sequelize = SequelizeConnection.sequelize;

class RoomModel {
    constructor() {
		this.Helper = new HelperClass();
        this.Rooms = sequelize.define('rooms', {
            id: {type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement : true},
            roomType: { type: Sequelize.STRING, allowNull: false },
            desc: { type: Sequelize.STRING },
            bed: { type: Sequelize.INTEGER },
            isBreakfastIncluded: { type: Sequelize.INTEGER },
            hotelId: { type: Sequelize.INTEGER },
			price: { type: Sequelize.DECIMAL },
			discountPrice: { type: Sequelize.DECIMAL },
            noOfRooms: { type: Sequelize.INTEGER },
			noOfAdults: { type: Sequelize.INTEGER },
			noOfChilds: { type: Sequelize.INTEGER },
            inactive: { type: Sequelize.INTEGER },
            maxCancelationTime: { type: Sequelize.DATE },
        }, {
            tableName: 'rooms',
            freezeTableName: true,
            timestamps: false
        });

        this.RoomImages = sequelize.define('room_images', {
            id: {type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement : true},
            imageUrl: { type: Sequelize.STRING, allowNull: false },
            roomId: { type: Sequelize.BIGINT, allowNull: false },
        }, {
            tableName: 'room_images',
            freezeTableName: true,
            timestamps: false
        });

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

    getAllRooms(offset, limit, result) {
        this.Rooms.findAll({
            offset: parseInt(offset),
			limit: parseInt(limit),
			include : [this.RoomImages, this.RoomFacilities]
        }).then(rooms => {
            this.Helper.handleResult(result, rooms);
        });
    }

    getRoom(roomId, result) {
        if(!isNaN(roomId)) {
            this.Rooms.findOne({
                where: {id: roomId},
				include : [this.RoomImages, this.RoomFacilities]
            }).then(room => {
                this.Helper.handleResult(result, room);
            });
        }
        else {
            result("Error Occured", null);
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
					inactive: roomData.inactive,
					maxCancelationTime: roomData.maxCancelationTime,
				}, {
					returning: true,
					plain: true,
					where: {id: roomId}
				}
			).then(([rowsUpdated, room]) => {
                this.Helper.handleResult(result, room);
            });
		}
		else {
			result("Error Occured", null);
		}
	}

	updateRoomField(roomId, roomData, result) {
		if(!isNaN(roomId)) {
			this.Rooms.update(
				roomData, {
					returning: true,
					plain: true,
					where: {id: roomId}
				}
			).then(([rowsUpdated, room]) => {
                this.Helper.handleResult(result, room);
            });
		}
		else {
			result("Error Occured", null);
		}
	}

	removeRoom(roomId, result) {
		if(!isNaN(roomId)) {
			this.Rooms.update(
				{
					inactive: 1,
				}, {
					returning: true,
					plain: true,
					where: {id: roomId}
				}
			).then(([rowsUpdated, room]) => {
                this.Helper.handleResult(result, room);
            });
		}
		else {
			result("Error Occured", null);
		}
	}

    getRoomImages(roomId, result) {
        if(!isNaN(roomId)) {
            this.RoomImages.findAll({
                where: {roomId: roomId}
            }).then(room_images => {
                this.Helper.handleResult(result, room_images);
            });
        }
        else {
            result("Error Occured", null);
        }
	}

	getRoomFacilities(roomId, result) {
        if(!isNaN(roomId)) {
            this.RoomFacilities.findAll({
                where: {roomId: roomId}
            }).then(room_facilities => {
                this.Helper.handleResult(result, room_facilities);
            });
        }
        else {
            result("Error Occured", null);
        }
	}
}
module.exports = RoomModel;
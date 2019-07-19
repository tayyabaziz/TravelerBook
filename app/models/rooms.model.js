const SequelizeConnection = require('../config/database.config.js');
const Sequelize = SequelizeConnection.Sequelize;
const sequelize = SequelizeConnection.sequelize;

class RoomModel {
    constructor() {
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
            foreignKey: 'roomId'
        });

        this.Rooms.hasMany(this.RoomFacilities);
        this.RoomFacilities.belongsTo(this.Rooms, {
            foreignKey: 'roomId'
        });
    }

    getAllRooms(offset, limit, result) {
        this.Rooms.findAll({
            offset: parseInt(offset),
            limit: parseInt(limit)
        }).then(rooms => {
            try {
                result(null, rooms);
            } catch (error) {
                result(error, null);
            }
        });
    }

    getRoom(roomId, result) {
        if(!isNaN(roomId)) {
            this.Rooms.findOne({
                where: {id: roomId}
            }).then(room => {
                try {
                    result(null, room);
                } catch (error) {
                    result(error, null);
                }
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
                try {
                    result(null, room_images);
                } catch (error) {
                    result(error, null);
                }
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
                try {
                    result(null, room_facilities);
                } catch (error) {
                    result(error, null);
                }
            });
        }
        else {
            result("Error Occured", null);
        }
	}
}
module.exports = RoomModel;
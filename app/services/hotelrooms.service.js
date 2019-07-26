const HotelModel = require('../models/hotel.model');
const RoomsModel = require('../models/room.model');
const {ResourceNotFoundError, InvalidDataError, DatabaseError} = require('../errors/errors');
const ErrorHandler = require('../handlers/error.handler');
const ResponseHandler = require('../handlers/response.handler');
const SequelizeConnection = require('../config/database.config');
const Sequelize = SequelizeConnection.Sequelize;
const sequelize = SequelizeConnection.sequelize;

class HotelRoomsService {
    constructor() {
        this.Hotels = new HotelModel(Sequelize, sequelize);
        this.Rooms = new RoomsModel(Sequelize, sequelize);

        this.Hotels.hasMany(this.Rooms);
        this.Rooms.belongsTo(this.Hotels, {
			as: 'R',
            foreignKey: 'hotelId'
        });
    }

    getAllHotelRooms(data, res) {
        if (!isNaN(data.hotelId)) {
            this.Hotels.findOne({
                where: {
                    id: data.hotelId,
                    inactive: { $or: [0, null] }
                },
                include: [{
                    model: this.Rooms,
                    where: {
                        inactive: { $or: [0, null] }
                    },
                    required: false,
                }]
            }).then(hotels => {
                console.log(hotels.rooms.length);

                if (hotels === undefined || hotels === null || hotels.length == 0)
                    return new ErrorHandler(new ResourceNotFoundError("Hotel"), res);
                else
                    return new ResponseHandler({ status: 200, message: hotels}, res);
            }).catch(Sequelize.Error, function (err) {
                return new ErrorHandler(new DatabaseError(err.message, err.name), res);
            });
        }
        else {
            return new ErrorHandler(new InvalidDataError("Hotel Id"), res);
        }
    }
}

module.exports = HotelRoomsService;
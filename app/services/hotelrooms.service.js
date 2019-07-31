const { HotelModel, RoomModel } = require('../models/all.models')
const { ResourceNotFoundError, InvalidDataError, DatabaseError } = require('../errors/errors')
const SequelizeConnection = require('../config/database.config')
const Sequelize = SequelizeConnection.Sequelize
const sequelize = SequelizeConnection.sequelize

class HotelRoomsService {
  constructor () {
    this.Hotels = new HotelModel(Sequelize, sequelize)
    this.Rooms = new RoomModel(Sequelize, sequelize)

    this.Hotels.hasMany(this.Rooms)
    this.Rooms.belongsTo(this.Hotels, {
      as: 'H',
      foreignKey: 'hotelId'
    })
  }

  getAllHotelRooms (data) {
    return new Promise((resolve, reject) => {
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
            required: false
          }]
        }).then(hotels => {
          if (hotels === undefined || hotels === null || hotels.length === 0) { reject(new ResourceNotFoundError('Hotel')) } else { resolve(hotels) }
        }).catch(Sequelize.Error, function (err) {
          reject(new DatabaseError(err.message, err.name))
        })
      } else {
        reject(new InvalidDataError('Hotel Id'))
      }
    })
  }
}

module.exports = HotelRoomsService

const { RoomModel, RoomFacilitiesModel, RoomImagesModel } = require('../models/all.models')
const { ResourceNotFoundError, InvalidDataError, DatabaseError } = require('../errors/errors')
const SequelizeConnection = require('../config/database.config')
const Sequelize = SequelizeConnection.Sequelize
const sequelize = SequelizeConnection.sequelize

class RoomService {
  constructor () {
    this.Rooms = new RoomModel(Sequelize, sequelize)
    this.RoomImages = new RoomImagesModel(Sequelize, sequelize)
    this.RoomFacilities = new RoomFacilitiesModel(Sequelize, sequelize)

    this.Rooms.hasMany(this.RoomImages)
    this.RoomImages.belongsTo(this.Rooms, {
      as: 'R',
      foreignKey: 'roomId'
    })

    this.Rooms.hasMany(this.RoomFacilities)
    this.RoomFacilities.belongsTo(this.Rooms, {
      as: 'R',
      foreignKey: 'roomId'
    })
  }

  getAllRooms (data) {
    return new Promise((resolve, reject) => {
      this.Rooms.findAll({
        offset: parseInt(data.offset),
        limit: parseInt(data.limit),
        where: {
          inactive: { $or: [0, null] }
        },
        include: [this.RoomImages, this.RoomFacilities]
      }).then(rooms => {
        if (rooms === undefined || rooms.length === 0) { reject(new ResourceNotFoundError('Rooms')) } else { resolve(rooms) }
      }).catch(Sequelize.Error, function (err) {
        reject(new DatabaseError(err.message, err.name))
      })
    })
  }

  getRoom (data) {
    return new Promise((resolve, reject) => {
      if (!isNaN(data.roomId)) {
        this.Rooms.findOne({
          where: {
            id: data.roomId,
            inactive: { $or: [0, null] }
          },
          include: [this.RoomImages, this.RoomFacilities]
        }).then(room => {
          if (room === undefined || room === null || room.length === 0) { reject(new ResourceNotFoundError('Room')) } else { resolve(room) }
        }).catch(Sequelize.Error, function (err) {
          reject(new DatabaseError(err.message, err.name))
        })
      } else {
        reject(new InvalidDataError('Room Id'))
      }
    })
  }

  createRoom (data) {
    return new Promise((resolve, reject) => {
      this.Rooms.create(data.roomData, {
        include: [this.RoomImages, this.RoomFacilities]
      }).then((room) => {
        if (room === undefined || room === null || room.length === 0) { reject(new ResourceNotFoundError('Room')) } else { resolve(room) }
      }).catch(Sequelize.Error, function (err) {
        reject(new DatabaseError(err.message, err.name))
      })
    })
  }

  updateRoom (data) {
    return new Promise((resolve, reject) => {
      if (!isNaN(data.roomId)) {
        this.Rooms.findOne({
          where: {
            id: data.roomId,
            inactive: { $or: [0, null] }
          },
          include: [this.RoomImages, this.RoomFacilities]
        }).then(room => {
          if (room === undefined || room === null || room.length === 0) { reject(new ResourceNotFoundError('Room')) } else {
            for (const key in data.roomData) {
              if (Object.prototype.hasOwnProperty.call(data.roomData, key)) {
                room[key] = data.roomData[key]
              }
            }
            room.save().then(function () {
              resolve(room)
            }).catch(Sequelize.Error, function (err) {
              reject(new DatabaseError(err.message, err.name))
            })
          }
        }).catch(Sequelize.Error, function (err) {
          reject(new DatabaseError(err.message, err.name))
        })
      } else {
        reject(new InvalidDataError('Room Id'))
      }
    })
  }

  updateRoomField (data) {
    return new Promise((resolve, reject) => {
      if (!isNaN(data.roomId)) {
        this.Rooms.findOne({
          where: {
            id: data.roomId,
            inactive: { $or: [0, null] }
          },
          include: [this.RoomImages, this.RoomFacilities]
        }).then(room => {
          if (room === undefined || room === null || room.length === 0) { reject(new ResourceNotFoundError('Room')) } else {
            for (const key in data.roomData) {
              if (Object.prototype.hasOwnProperty.call(data.roomData, key)) {
                room[key] = data.roomData[key]
              }
            }
            room.save().then(function () {
              resolve(room)
            }).catch(Sequelize.Error, function (err) {
              reject(new DatabaseError(err.message, err.name))
            })
          }
        }).catch(Sequelize.Error, function (err) {
          reject(new DatabaseError(err.message, err.name))
        })
      } else {
        reject(new InvalidDataError('Room Id'))
      }
    })
  }

  removeRoom (data) {
    return new Promise((resolve, reject) => {
      if (!isNaN(data.roomId)) {
        this.Rooms.findOne({
          where: {
            id: data.roomId,
            inactive: { $or: [0, null] }
          },
          include: [this.roomImages, this.roomFacilities]
        }).then(room => {
          if (room === undefined || room === null || room.length === 0) { reject(new ResourceNotFoundError('Room')) } else {
            room.inactive = 1
            room.save().then(function () {
              resolve(room)
            }).catch(Sequelize.Error, function (err) {
              reject(new DatabaseError(err.message, err.name))
            })
          }
        }).catch(Sequelize.Error, function (err) {
          reject(new DatabaseError(err.message, err.name))
        })
      } else {
        reject(new InvalidDataError('Room Id'))
      }
    })
  }

  getRoomImages (data) {
    return new Promise((resolve, reject) => {
      if (!isNaN(data.roomId)) {
        this.RoomImages.findAll({
          where: {
            roomId: data.roomId
          }
        }).then(images => {
          if (images === undefined || images === null || images.length === 0) { reject(new ResourceNotFoundError('Room images')) } else { resolve(images) }
        }).catch(Sequelize.Error, function (err) {
          reject(new DatabaseError(err.message, err.name))
        })
      } else {
        reject(new InvalidDataError('Room Id'))
      }
    })
  }

  getRoomFacilities (data) {
    return new Promise((resolve, reject) => {
      if (!isNaN(data.roomId)) {
        this.RoomFacilities.findAll({
          where: {
            roomId: data.roomId
          }
        }).then(facilities => {
          if (facilities === undefined || facilities === null || facilities.length === 0) { reject(new ResourceNotFoundError('Room facilities')) } else { resolve(facilities) }
        }).catch(Sequelize.Error, function (err) {
          reject(new DatabaseError(err.message, err.name))
        })
      } else {
        reject(new InvalidDataError('Room Id'))
      }
    })
  }

  createRoomImages (data) {
    return new Promise((resolve, reject) => {
      if (!isNaN(data.roomId)) {
        this.Rooms.findOne({
          where: {
            id: data.roomId,
            inactive: { $or: [0, null] }
          }
        }).then(room => {
          if (room === undefined || room === null || room.length === 0) { reject(new ResourceNotFoundError('Room')) } else {
            for (let index = 0; index < data.roomExtendedData.length; index++) {
              data.roomExtendedData[index].roomId = data.roomId
            }
            this.RoomImages.bulkCreate(data.roomExtendedData).then((image) => {
              resolve(image)
            }).catch(Sequelize.Error, function (err) {
              reject(new DatabaseError(err.message, err.name))
            })
          }
        }).catch(Sequelize.Error, function (err) {
          reject(new DatabaseError(err.message, err.name))
        })
      } else {
        reject(new InvalidDataError('Room Id'))
      }
    })
  }

  createRoomFacilities (data) {
    return new Promise((resolve, reject) => {
      if (!isNaN(data.roomId)) {
        this.Rooms.findOne({
          where: {
            id: data.roomId,
            inactive: { $or: [0, null] }
          }
        }).then(room => {
          if (room === undefined || room === null || room.length === 0) { reject(new ResourceNotFoundError('Room')) } else {
            for (let index = 0; index < data.roomExtendedData.length; index++) {
              data.roomExtendedData[index].roomId = data.roomId
            }
            this.RoomFacilities.bulkCreate(data.roomExtendedData).then((facility) => {
              resolve(facility)
            }).catch(Sequelize.Error, function (err) {
              reject(new DatabaseError(err.message, err.name))
            })
          }
        }).catch(Sequelize.Error, function (err) {
          reject(new DatabaseError(err.message, err.name))
        })
      } else {
        reject(new InvalidDataError('Room Id'))
      }
    })
  }
}

module.exports = RoomService

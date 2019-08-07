const RoomServiceClass = require('../services/rooms.service')
const ErrorHandler = require('../handlers/error.handler')
const ResponseHandler = require('../handlers/response.handler')
const RoomService = new RoomServiceClass()

class RoomController {
  async listAllRooms (req, res) {
    try {
      let page = req.query.page ? req.query.page : 1
      let limit = req.query.limit ? req.query.limit : 10
      page = parseInt(page, 10)
      limit = parseInt(limit, 10)
      const offset = (page - 1) * limit
      var data = await RoomService.getAllRooms({ offset: offset, limit: limit })
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

  async readRoom (req, res) {
    try {
      var data = await RoomService.getRoom({ roomId: req.params.roomId })
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

  async addRoom (req, res) {
    try {
      var roomData = req.body
      var room = {}
      room.roomType = (roomData.roomType !== undefined) ? roomData.roomType : null
      room.desc = (roomData.desc !== undefined) ? roomData.desc : null
      room.bed = (roomData.bed !== undefined) ? roomData.bed : null
      room.isBreakfastIncluded = (roomData.isBreakfastIncluded !== undefined) ? roomData.isBreakfastIncluded : null
      room.hotelId = (roomData.hotelId !== undefined) ? roomData.hotelId : null
      room.price = (roomData.price !== undefined) ? roomData.price : null
      room.discountPrice = (roomData.discountPrice !== undefined) ? roomData.discountPrice : null
      room.noOfRooms = (roomData.noOfRooms !== undefined) ? roomData.noOfRooms : null
      room.noOfAdults = (roomData.noOfAdults !== undefined) ? roomData.noOfAdults : null
      room.noOfChilds = (roomData.noOfChilds !== undefined) ? roomData.noOfChilds : null
      room.maxCancelationTime = (roomData.maxCancelationTime !== undefined) ? roomData.maxCancelationTime : null
      room.inactive = 0
      room.room_images = (roomData.room_images !== undefined) ? roomData.room_images : []
      room.room_facilities = (roomData.room_facilities !== undefined) ? roomData.room_facilities : []

      var data = await RoomService.createRoom({ roomData: room })
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

  async updateRoom (req, res) {
    try {
      var roomData = req.body
      var room = {}
      room.roomType = (roomData.roomType !== undefined) ? roomData.roomType : null
      room.desc = (roomData.desc !== undefined) ? roomData.desc : null
      room.bed = (roomData.bed !== undefined) ? roomData.bed : null
      room.isBreakfastIncluded = (roomData.isBreakfastIncluded !== undefined) ? roomData.isBreakfastIncluded : null
      room.price = (roomData.price !== undefined) ? roomData.price : null
      room.discountPrice = (roomData.discountPrice !== undefined) ? roomData.discountPrice : null
      room.noOfRooms = (roomData.noOfRooms !== undefined) ? roomData.noOfRooms : null
      room.noOfAdults = (roomData.noOfAdults !== undefined) ? roomData.noOfAdults : null
      room.noOfChilds = (roomData.noOfChilds !== undefined) ? roomData.noOfChilds : null
      room.maxCancelationTime = (roomData.maxCancelationTime !== undefined) ? roomData.maxCancelationTime : null

      var data = await RoomService.updateRoom({ roomId: req.params.roomId, roomData: room })
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

  async updateRoomFields (req, res) {
    try {
      var roomData = req.body
      var data = await RoomService.updateRoomField({ roomId: req.params.roomId, roomData: roomData })// Passing Data direct because no modification required
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

  async removeRoom (req, res) {
    try {
      var data = await RoomService.removeRoom({ roomId: req.params.roomId })
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

  async readRoomImages (req, res) {
    try {
      var data = await RoomService.getRoomImages({ roomId: req.params.roomId })
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

  async readRoomFacilities (req, res) {
    try {
      var data = await RoomService.getRoomFacilities({ roomId: req.params.roomId })
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

  async addRoomImages (req, res) {
    try {
      var roomExtendedData = req.body
      var data = await RoomService.createRoomImages({ roomId: req.params.roomId, roomExtendedData: roomExtendedData })// Passing Data direct because no modification required
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

  async addRoomFacilities (req, res) {
    try {
      var roomExtendedData = req.body
      var data = await RoomService.createRoomFacilities({ roomId: req.params.roomId, roomExtendedData: roomExtendedData })// Passing Data direct because no modification required
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }
}

module.exports = RoomController

const HotelRoomsServiceClass = require('../services/hotelrooms.service')
const ErrorHandler = require('../handlers/error.handler')
const ResponseHandler = require('../handlers/response.handler')
const HotelRoomsService = new HotelRoomsServiceClass()

class HotelRoomsController {
  async readHotelRooms (req, res) {
    try {
      var data = await HotelRoomsService.getAllHotelRooms({ hotelId: req.params.hotelId })
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }
}

module.exports = HotelRoomsController

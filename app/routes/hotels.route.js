const express = require('express')
const router = express.Router()

const AuthMiddlewareClass = require('../middlewares/auth.middleware')
const AuthMiddleware = new AuthMiddlewareClass()

const HotelControllerClass = require('../controllers/hotels.controller')
const HotelController = new HotelControllerClass()

router.get('/hotels', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelController.listAllHotels)
router.post('/hotel', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelController.addHotel)
router.get('/hotel/:hotelId', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelController.readHotel)
router.put('/hotel/:hotelId', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelController.updateHotel)
router.patch('/hotel/:hotelId', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelController.updateHotelFields)
router.delete('/hotel/:hotelId', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelController.removeHotel)
router.get('/hotel/:hotelId/images', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelController.readHotelImages)
router.get('/hotel/:hotelId/facilities', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelController.readHotelFacilities)
router.post('/hotel/:hotelId/images', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelController.addHotelImages)
router.post('/hotel/:hotelId/facilities', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelController.addHotelFacilities)

const HotelRoomsControllerClass = require('../controllers/hotelrooms.controller')
const HotelRoomsController = new HotelRoomsControllerClass()

router.get('/hotel/:hotelId/rooms', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelRoomsController.readHotelRooms)

module.exports = router

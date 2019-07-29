const express = require('express');
const router = express.Router();

const AuthMiddlewareClass = require('../middlewares/auth.middleware');
const AuthMiddleware = new AuthMiddlewareClass();

const HotelControllerClass = require('../controllers/hotels.controller');
const HotelController = new HotelControllerClass();

router.get('/hotels', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelController.list_all_hotels);
router.post('/hotel', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelController.add_hotel);
router.get('/hotel/:hotelId', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelController.read_hotel);
router.put('/hotel/:hotelId', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelController.update_hotel);
router.patch('/hotel/:hotelId', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelController.update_hotel_fields);
router.delete('/hotel/:hotelId', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelController.remove_hotel);
router.get('/hotel/:hotelId/images', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelController.read_hotel_images);
router.get('/hotel/:hotelId/facilities', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelController.read_hotel_facilities);
router.post('/hotel/:hotelId/images', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelController.add_hotel_images);
router.post('/hotel/:hotelId/facilities', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelController.add_hotel_facilities);

const HotelRoomsControllerClass = require('../controllers/hotelrooms.controller');
const HotelRoomsController = new HotelRoomsControllerClass();

router.get('/hotel/:hotelId/rooms', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, HotelRoomsController.read_hotel_rooms);

module.exports = router;
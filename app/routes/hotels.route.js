const express = require('express');
const router = express.Router();

const HotelControllerClass = require('../controllers/hotels.controller');
const HotelController = new HotelControllerClass();

router.get('/hotels', HotelController.list_all_hotels);
router.post('/hotel', HotelController.add_hotel);
router.get('/hotel/:hotelId', HotelController.read_hotel);
router.put('/hotel/:hotelId', HotelController.update_hotel);
router.patch('/hotel/:hotelId', HotelController.update_hotel_fields);
router.delete('/hotel/:hotelId', HotelController.remove_hotel);
router.get('/hotel/:hotelId/images', HotelController.read_hotel_images);
router.get('/hotel/:hotelId/facilities', HotelController.read_hotel_facilities);
router.post('/hotel/:hotelId/images', HotelController.add_hotel_images);
router.post('/hotel/:hotelId/facilities', HotelController.add_hotel_facilities);

const HotelRoomsControllerClass = require('../controllers/hotelrooms.controller');
const HotelRoomsController = new HotelRoomsControllerClass();

router.get('/hotel/:hotelId/rooms', HotelRoomsController.read_hotel_rooms);

module.exports = router;
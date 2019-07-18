const express = require('express');
const router = express.Router();

var hotels = require('../controllers/hotels.controller');

router.get('/hotels', hotels.list_all_hotels);
router.get('/hotel/:hotelId', hotels.read_hotel);
router.put('/hotel/:hotelId', hotels.update_hotel);
router.delete('/hotel/:hotelId', hotels.remove_hotel);
router.get('/hotel/:hotelId/hotel_images', hotels.read_hotel_images);
router.get('/hotel/:hotelId/hotel_facilities', hotels.read_hotel_facilities);

module.exports = router;
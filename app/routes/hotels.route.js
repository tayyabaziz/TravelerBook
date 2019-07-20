const express = require('express');
const router = express.Router();

var hotels = require('../controllers/hotels.controller');

router.get('/hotels', hotels.list_all_hotels);
router.post('/hotel', hotels.add_hotel);
router.get('/hotel/:hotelId', hotels.read_hotel);
router.put('/hotel/:hotelId', hotels.update_hotel);
router.patch('/hotel/:hotelId', hotels.update_hotel_fields);
router.delete('/hotel/:hotelId', hotels.remove_hotel);
router.get('/hotel/:hotelId/images', hotels.read_hotel_images);
router.get('/hotel/:hotelId/facilities', hotels.read_hotel_facilities);
router.post('/hotel/:hotelId/images', hotels.add_hotel_images);
router.post('/hotel/:hotelId/facilities', hotels.add_hotel_facilities);
module.exports = router;
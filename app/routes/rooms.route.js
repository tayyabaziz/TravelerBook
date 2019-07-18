const express = require('express');
const router = express.Router();

var rooms = require('../controllers/rooms.controller');

router.get('/rooms', rooms.list_all_rooms);
router.get('/room/:roomId', rooms.read_room);
router.get('/room/:roomId/room_images', rooms.read_room_images);
router.get('/room/:roomId/room_facilities', rooms.read_room_facilities);

module.exports = router;
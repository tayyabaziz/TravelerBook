const express = require('express');
const router = express.Router();

var rooms = require('../controllers/rooms.controller');

router.get('/rooms', rooms.list_all_rooms);
router.get('/room/:roomId', rooms.read_room);
router.put('/room/:roomId', rooms.update_room);
router.patch('/room/:roomId', rooms.update_room_fields);
router.delete('/room/:roomId', rooms.remove_room);
router.get('/room/:roomId/images', rooms.read_room_images);
router.get('/room/:roomId/facilities', rooms.read_room_facilities);

module.exports = router;
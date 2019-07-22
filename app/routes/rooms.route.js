const express = require('express');
const router = express.Router();

const RoomControllerClass = require('../controllers/rooms.controller');
const RoomController = new RoomControllerClass();

router.get('/rooms', RoomController.list_all_rooms);
router.post('/room', RoomController.add_room);
router.get('/room/:roomId', RoomController.read_room);
router.put('/room/:roomId', RoomController.update_room);
router.patch('/room/:roomId', RoomController.update_room_fields);
router.delete('/room/:roomId', RoomController.remove_room);
router.get('/room/:roomId/images', RoomController.read_room_images);
router.post('/room/:roomId/images', RoomController.add_room_images);
router.get('/room/:roomId/facilities', RoomController.read_room_facilities);
router.post('/room/:roomId/facilities', RoomController.add_room_facilities);

module.exports = router;
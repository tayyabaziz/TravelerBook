const express = require('express');
const router = express.Router();

const AuthMiddlewareClass = require('../middlewares/auth.middleware');
const AuthMiddleware = new AuthMiddlewareClass();

const RoomControllerClass = require('../controllers/rooms.controller');
const RoomController = new RoomControllerClass();

router.get('/rooms', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, RoomController.list_all_rooms);
router.post('/room', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, RoomController.add_room);
router.get('/room/:roomId', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, RoomController.read_room);
router.put('/room/:roomId', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, RoomController.update_room);
router.patch('/room/:roomId', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, RoomController.update_room_fields);
router.delete('/room/:roomId', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, RoomController.remove_room);
router.get('/room/:roomId/images', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, RoomController.read_room_images);
router.post('/room/:roomId/images', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, RoomController.add_room_images);
router.get('/room/:roomId/facilities', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, RoomController.read_room_facilities);
router.post('/room/:roomId/facilities', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, RoomController.add_room_facilities);

module.exports = router;
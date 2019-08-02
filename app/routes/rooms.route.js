const express = require('express')
const router = express.Router()

const AuthMiddlewareClass = require('../middlewares/auth.middleware')
const AuthMiddleware = new AuthMiddlewareClass()

const { RoomControllerClass } = require('../controllers/all.controllers')
const RoomController = new RoomControllerClass()

router.get('/rooms', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, RoomController.listAllRooms)
router.post('/room', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, RoomController.addRoom)
router.get('/room/:roomId', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, RoomController.readRoom)
router.put('/room/:roomId', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, RoomController.updateRoom)
router.patch('/room/:roomId', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, RoomController.updateRoomFields)
router.delete('/room/:roomId', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, RoomController.removeRoom)
router.get('/room/:roomId/images', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, RoomController.readRoomImages)
router.post('/room/:roomId/images', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, RoomController.addRoomImages)
router.get('/room/:roomId/facilities', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, RoomController.readRoomFacilities)
router.post('/room/:roomId/facilities', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, RoomController.addRoomFacilities)

module.exports = router

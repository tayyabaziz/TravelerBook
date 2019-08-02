const express = require('express')
const router = express.Router()

const AuthMiddlewareClass = require('../middlewares/auth.middleware')
const AuthMiddleware = new AuthMiddlewareClass()

const { FacilitiesControllerClass } = require('../controllers/all.controllers')
const FacilitiesController = new FacilitiesControllerClass()

router.get('/facilities', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, FacilitiesController.listAllFacilities)
router.post('/facility', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, FacilitiesController.addFacility)
router.get('/facility/:facilityId', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, FacilitiesController.readFacility)
router.put('/facility/:facilityId', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, FacilitiesController.updateFacility)

module.exports = router

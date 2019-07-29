const express = require('express');
const router = express.Router();

const AuthMiddlewareClass = require('../middlewares/auth.middleware');
const AuthMiddleware = new AuthMiddlewareClass();

const FacilitiesControllerClass = require('../controllers/facilities.controller');
const FacilitiesController = new FacilitiesControllerClass();

router.get('/facilities', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, FacilitiesController.list_all_facilities);
router.post('/facility', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, FacilitiesController.add_facility);
router.get('/facility/:facilityId', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, FacilitiesController.read_facility);
router.put('/facility/:facilityId', AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized, FacilitiesController.update_facility);

module.exports = router;
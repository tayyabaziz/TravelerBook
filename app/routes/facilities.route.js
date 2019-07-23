const express = require('express');
const router = express.Router();

const FacilitiesControllerClass = require('../controllers/facilities.controller');
const FacilitiesController = new FacilitiesControllerClass();

router.get('/facilities', FacilitiesController.list_all_facilities);
router.post('/facility', FacilitiesController.add_facility);
router.get('/facility/:facilityId', FacilitiesController.read_facility);
router.put('/facility/:facilityId', FacilitiesController.update_facility);

module.exports = router;
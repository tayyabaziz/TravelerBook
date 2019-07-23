const FacilitiesServiceClass = require('../services/facilities.service');
const FacilitiesService = new FacilitiesServiceClass();

class FacilitiesController {
	constructor() { }

	list_all_facilities(req, res) {
		return FacilitiesService.getAllFacilities(res);
	}
	
	read_facility(req, res) {
		return FacilitiesService.getFacility({facilityId: req.params.facilityId}, res);
	}
	
	add_facility(req, res) {
		var facilityData = req.body;
		var facility = {};
        facility.facility = (facilityData.facility != undefined) ? facilityData.facility: null;
		return FacilitiesService.createFacility({facilityData: facility}, res);
	}
	
	update_facility(req, res) {
		var facilityData = req.body;
		var facility = {};
        facility.facility = (facilityData.facility != undefined) ? facilityData.facility: null;
		return FacilitiesService.updateFacility({facilityId: req.params.facilityId, facilityData: facility}, res);
	}
}

module.exports = FacilitiesController;
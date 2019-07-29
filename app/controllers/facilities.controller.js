const FacilitiesServiceClass = require('../services/facilities.service');
const ErrorHandler = require('../handlers/error.handler');
const ResponseHandler = require('../handlers/response.handler');
const FacilitiesService = new FacilitiesServiceClass();

class FacilitiesController {
	constructor() { }

	async list_all_facilities(req, res) {
		try {
			var data = await FacilitiesService.getAllFacilities();
			new ResponseHandler(data, req.method, res);
		} catch (err) {
			new ErrorHandler(err, res);
		}
	}

	async read_facility(req, res) {
		try {
			var data = await FacilitiesService.getFacility({ facilityId: req.params.facilityId });
			new ResponseHandler(data, req.method, res);
		} catch (err) {
			new ErrorHandler(err, res);
		}
	}

	async add_facility(req, res) {
		try {
			var facilityData = req.body;
			var facility = {};
			facility.facility = (facilityData.facility != undefined) ? facilityData.facility : null;
			var data = await FacilitiesService.createFacility({ facilityData: facility });
			new ResponseHandler(data, req.method, res);
		} catch (err) {
			new ErrorHandler(err, res);
		}
	}

	async update_facility(req, res) {
		try {
			var facilityData = req.body;
			var facility = {};
			facility.facility = (facilityData.facility != undefined) ? facilityData.facility : null;
			var data = await FacilitiesService.updateFacility({ facilityId: req.params.facilityId, facilityData: facility });
			new ResponseHandler(data, req.method, res);
		} catch (err) {
			new ErrorHandler(err, res);
		}
	}
}

module.exports = FacilitiesController;
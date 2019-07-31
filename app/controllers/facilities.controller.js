const FacilitiesServiceClass = require('../services/facilities.service')
const ErrorHandler = require('../handlers/error.handler')
const ResponseHandler = require('../handlers/response.handler')
const FacilitiesService = new FacilitiesServiceClass()

class FacilitiesController {
  async listAllFacilities (req, res) {
    try {
      var data = await FacilitiesService.getAllFacilities()
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

  async readFacility (req, res) {
    try {
      var data = await FacilitiesService.getFacility({ facilityId: req.params.facilityId })
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

  async addFacility (req, res) {
    try {
      var facilityData = req.body
      var facility = {}
      facility.facility = (facilityData.facility !== undefined) ? facilityData.facility : null
      var data = await FacilitiesService.createFacility({ facilityData: facility })
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

  async updateFacility (req, res) {
    try {
      var facilityData = req.body
      var facility = {}
      facility.facility = (facilityData.facility !== undefined) ? facilityData.facility : null
      var data = await FacilitiesService.updateFacility({ facilityId: req.params.facilityId, facilityData: facility })
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }
}

module.exports = FacilitiesController

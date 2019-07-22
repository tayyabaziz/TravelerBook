const HotelModelClass = require('../models/hotels.model');
const HelperClass = require('../helper/helper.class');
const Helper = new HelperClass();
const HotelModel = new HotelModelClass();

class HotelService {
    constructor() { }

    getAllHotels(data, res) {
        HotelModel.getAllHotels(data.offset, data.limit, function(err, rows) {
			Helper.formatResult(res, err, rows);
		});
    }
    createHotel(data, res) {
        HotelModel.createHotel(data.body, function(err, rows) {
            Helper.formatResult(res, err, rows);
        });
    }
    getHotel(data, res) {
    	HotelModel.getHotel(data.hotelId, function(err, rows) {
			Helper.formatResult(res, err, rows);
		});
	}
    updateHotel(data, res) {
    	HotelModel.updateHotel(data.hotelId, data.body, function(err, rows) {
			Helper.formatResult(res, err, rows);
		});
	}
    updateHotelField(data, res) {
    	HotelModel.updateHotelField(data.hotelId, data.body, function(err, rows) {
			Helper.formatResult(res, err, rows);
		});
	}
    removeHotel(data, res) {
    	HotelModel.removeHotel(data.hotelId, function(err, rows) {
			Helper.formatResult(res, err, rows);
		});
	}
    getHotelImages(data, res) {
    	HotelModel.getHotelImages(data.hotelId, function(err, rows) {
			Helper.formatResult(res, err, rows);
		});
	}
    getHotelFacilities(data, res) {
    	HotelModel.getHotelFacilities(data.hotelId, function(err, rows) {
			Helper.formatResult(res, err, rows);
		});
	}
    createHotelImages(data, res) {
    	HotelModel.createHotelImages(data.hotelId, data.body, function(err, rows) {
		  	Helper.formatResult(res, err, rows);
		});
	}
    createHotelFacilities(data, res) {
    	HotelModel.createHotelFacilities(data.hotelId, data.body, function(err, rows) {
		  	Helper.formatResult(res, err, rows);
		});
	}
}

module.exports = HotelService;
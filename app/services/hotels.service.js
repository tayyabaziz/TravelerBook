const HotelModelClass = require('../models/hotels.model');
const HotelModel = new HotelModelClass();

class HotelService {
    constructor() { }

    getAllHotels(data, res) {
        try {
            HotelModel.getAllHotels(data.offset, data.limit, res);
        } catch (error) {
            throw Error(error);
        }
    }
    createHotel(data, res) {
        try {
            HotelModel.createHotel(data.body, res);
        } catch (error) {
            throw Error(error);
        }
    }
    getHotel(data, res) {
        try {
            HotelModel.getHotel(data.hotelId, res);
        } catch (error) {
            throw Error(error);
        }
    }
    updateHotel(data, res) {
        try {
            HotelModel.updateHotel(data.hotelId, data.body, res);
        } catch (error) {
            throw Error(error);
        }
    }
    updateHotelField(data, res) {
        try {
            HotelModel.updateHotelField(data.hotelId, data.body, res);
        } catch (error) {
            throw Error(error);
        }
    }
    removeHotel(data, res) {
        try {
            HotelModel.removeHotel(data.hotelId, res);
        } catch (error) {
            throw Error(error);
        }
    }
    getHotelImages(data, res) {
        try {
            HotelModel.getHotelImages(data.hotelId, res);
        } catch (error) {
            throw Error(error);
        }
    }
    getHotelFacilities(data, res) {
        try {
            HotelModel.getHotelFacilities(data.hotelId, res);
        } catch (error) {
            throw Error(error);
        }
    }
    createHotelImages(data, res) {
        try {
            HotelModel.createHotelImages(data.hotelId, data.body, res);
        } catch (error) {
            throw Error(error);
        }
    }
    createHotelFacilities(data, res) {
        try {
            HotelModel.createHotelFacilities(data.hotelId, data.body, res);
        } catch (error) {
            throw Error(error);
        }
    }
}

module.exports = HotelService;
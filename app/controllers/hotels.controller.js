const HotelServiceClass = require('../services/hotels.service');
const ErrorHandler = require('../handlers/error.handler');
const ResponseHandler = require('../handlers/response.handler');
const HotelService = new HotelServiceClass();

class HotelController {
    constructor() { }

    async list_all_hotels(req, res) {
        try {
            let page = req.query.page ? req.query.page : 1;
            let limit = req.query.limit ? req.query.limit : 10;
            let offset = (page - 1) * limit;
            var data = await HotelService.getAllHotels({ offset: offset, limit: limit });
            new ResponseHandler({ status: 200, message: data }, res);
        } catch (err) {
            new ErrorHandler(err, res);
        }
    }

    async read_hotel(req, res) {
        try {
            var data = await HotelService.getHotel({ hotelId: req.params.hotelId });
            new ResponseHandler({ status: 200, message: data }, res);
        } catch (err) {
            new ErrorHandler(err, res);
        }
    }

    async add_hotel(req, res) {
        try {
            var hotelData = req.body;
            var hotel = {};
            hotel.name = (hotelData.name != undefined) ? hotelData.name : null;
            hotel.address = (hotelData.address != undefined) ? hotelData.address : null;
            hotel.lat = (hotelData.lat != undefined) ? hotelData.lat : null;
            hotel.lng = (hotelData.lng != undefined) ? hotelData.lng : null;
            hotel.url_key = (hotelData.url_key != undefined) ? hotelData.url_key : null;
            hotel.total_rating = 0;
            hotel.popularfor = (hotelData.popularfor != undefined) ? hotelData.popularfor : null;
            hotel.inactive = 0;
            hotel.createdAt = (hotelData.createdAt != undefined) ? hotelData.createdAt : null;
            hotel.images = (hotelData.images != undefined) ? hotelData.images : [];
            hotel.hotel_facilities = (hotelData.hotel_facilities != undefined) ? hotelData.hotel_facilities : [];

            var data = await HotelService.createHotel({ hotelData: hotel });
            new ResponseHandler({ status: 201, message: data }, res);
        } catch (err) {
            new ErrorHandler(err, res);
        }
    }

    async update_hotel(req, res) {
        try {
            var hotelData = req.body;
            var hotel = {};
            hotel.name = (hotelData.name != undefined) ? hotelData.name : null;
            hotel.address = (hotelData.address != undefined) ? hotelData.address : null;
            hotel.lat = (hotelData.lat != undefined) ? hotelData.lat : null;
            hotel.lng = (hotelData.lng != undefined) ? hotelData.lng : null;
            hotel.url_key = (hotelData.url_key != undefined) ? hotelData.url_key : null;
            hotel.popularfor = (hotelData.popularfor != undefined) ? hotelData.popularfor : null;

            var data = await HotelService.updateHotel({ hotelId: req.params.hotelId, hotelData: hotel });
            new ResponseHandler({ status: 200, message: data }, res);
        } catch (err) {
            new ErrorHandler(err, res);
        }
    }

    async update_hotel_fields(req, res) {
        try {
            var hotelData = req.body;
            var data = await HotelService.updateHotelField({ hotelId: req.params.hotelId, hotelData: hotelData }); //Passing Data direct because no modification required
            new ResponseHandler({ status: 200, message: data }, res);
        } catch (err) {
            new ErrorHandler(err, res);
        }
    }

    async remove_hotel(req, res) {
        try {
            var data = await HotelService.removeHotel({ hotelId: req.params.hotelId });
            new ResponseHandler({ status: 200, message: data }, res);
        } catch (err) {
            new ErrorHandler(err, res);
        }
    }

    async read_hotel_images(req, res) {
        try {
            var data = await HotelService.getHotelImages({ hotelId: req.params.hotelId });
            new ResponseHandler({ status: 200, message: data }, res);
        } catch (err) {
            new ErrorHandler(err, res);
        }
    }

    async read_hotel_facilities(req, res) {
        try {
            var data = await HotelService.getHotelFacilities({ hotelId: req.params.hotelId });
            new ResponseHandler({ status: 200, message: data }, res);
        } catch (err) {
            new ErrorHandler(err, res);
        }
    }

    async add_hotel_images(req, res) {
        try {
            var hotelExtendedData = req.body;
            var data = await HotelService.createHotelImages({ hotelId: req.params.hotelId, hotelExtendedData: hotelExtendedData }); //Passing Data direct because no modification required
            new ResponseHandler({ status: 201, message: data }, res);
        } catch (err) {
            new ErrorHandler(err, res);
        }
    }

    async add_hotel_facilities(req, res) {
        try {
            var hotelExtendedData = req.body;
            var data = await HotelService.createHotelFacilities({ hotelId: req.params.hotelId, hotelExtendedData: hotelExtendedData }); //Passing Data direct because no modification required
            new ResponseHandler({ status: 201, message: data }, res);
        } catch (err) {
            new ErrorHandler(err, res);
        }
    }
}

module.exports = HotelController;
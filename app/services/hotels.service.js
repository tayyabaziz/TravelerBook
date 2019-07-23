const HotelModel = require('../models/hotel.model');
const HotelImagesModel = require('../models/hotel_images.model');
const HotelFacilitiesModel = require('../models/hotel_facilities.model');
const {ResourceNotFoundError, InvalidDataError, DatabaseError, ErrorHandler} = require('../errors/customerrors.errors');
const SequelizeConnection = require('../config/database.config');
const Sequelize = SequelizeConnection.Sequelize;

class HotelService {
    constructor() {
        this.Hotels = new HotelModel();
        this.HotelImages = new HotelImagesModel();
        this.HotelFacilities = new HotelFacilitiesModel();

        this.Hotels.hasMany(this.HotelImages);
        this.HotelImages.belongsTo(this.Hotels, {
			as: 'HotelImages',
            foreignKey: 'hotelId'
        });
        
        this.Hotels.hasMany(this.HotelFacilities);
        this.HotelFacilities.belongsTo(this.Hotels, {
			as: 'HotelFacilities',
            foreignKey: 'hotelId'
        });
    }

    getAllHotels(data, res) {
        this.Hotels.findAll({
            offset: parseInt(data.offset),
			limit: parseInt(data.limit),
			include : [this.HotelImages, this.HotelFacilities]
        }).then(hotels => {
            if (hotels === undefined || hotels === null || hotels.length == 0)
                return new ErrorHandler(new ResourceNotFoundError("Hotels"), res);
            else 
                return res.json(hotels);
        }).catch(Sequelize.Error, function (err) {
            return new ErrorHandler(new DatabaseError(err.message, err.name), res);
        });
    }

    getHotel(data, res) {
        if(!isNaN(data.hotelId)) {
            this.Hotels.findOne({
				where: {id: data.hotelId},
				include : [this.HotelImages, this.HotelFacilities]
            }).then(hotel => {
                if (hotel === undefined || hotel === null || hotel.length == 0)
					return new ErrorHandler(new ResourceNotFoundError("Hotel"), res);
				else 
					return res.json(hotel);
            }).catch(Sequelize.Error, function (err) {
                return new ErrorHandler(new DatabaseError(err.message, err.name), res);
            });
        }
        else {
            throw new InvalidDataError("Hotel Id");
        }
    }
    
    createHotel(data, res) {
        var hotel = {};
        hotel.name = (data.hotelData.name != undefined) ? data.hotelData.name: null;
        hotel.address = (data.hotelData.address != undefined) ? data.hotelData.address: null;
        hotel.lat = (data.hotelData.lat != undefined) ? data.hotelData.lat: null;
        hotel.lng = (data.hotelData.lng != undefined) ? data.hotelData.lng: null;
        hotel.url_key = (data.hotelData.url_key != undefined) ? data.hotelData.url_key: null;
        hotel.total_rating = 0;
        hotel.popularfor = (data.hotelData.popularfor != undefined) ? data.hotelData.popularfor: null;
        hotel.inactive = 0;
        hotel.createdAt = (data.hotelData.createdAt != undefined) ? data.hotelData.createdAt: null;
        hotel.images = (data.hotelData.images != undefined) ? data.hotelData.images: [];
        hotel.hotel_facilities = (data.hotelData.hotel_facilities != undefined) ? data.hotelData.hotel_facilities: [];
        
        this.Hotels.create(hotel, {
            include: [this.HotelImages, this.HotelFacilities]
        }).then((hotelResponse) => {
			if (hotelResponse === undefined || hotelResponse === null || hotelResponse.length == 0)
				return new ErrorHandler(new ResourceNotFoundError("Hotel"), res);
			else 
				return res.json(hotelResponse);
        }).catch(Sequelize.Error, function (err) {
            return new ErrorHandler(new DatabaseError(err.message, err.name), res);
        });
    }

    updateHotel(data, res) {
        if(!isNaN(data.hotelId)) {
            this.Hotels.findOne({
				where: {id: data.hotelId},
				include : [this.HotelImages, this.HotelFacilities]
            }).then(hotel => {
				if (hotel === undefined || hotel === null || hotel.length == 0)
					return new ErrorHandler(new ResourceNotFoundError("Hotel"), res);
				else {
					hotel.name = (data.hotelData.name != undefined) ? data.hotelData.name: null;
					hotel.address = (data.hotelData.address != undefined) ? data.hotelData.address: null;
					hotel.lat = (data.hotelData.lat != undefined) ? data.hotelData.lat: null;
					hotel.lng = (data.hotelData.lng != undefined) ? data.hotelData.lng: null;
					hotel.url_key = (data.hotelData.url_key != undefined) ? data.hotelData.url_key: null;
					hotel.popularfor = (data.hotelData.popularfor != undefined) ? data.hotelData.popularfor: null;
					hotel.save().then(function() {
						return res.json(hotel);
					}).catch(Sequelize.Error, function (err) {
						return new ErrorHandler(new DatabaseError(err.message, err.name), res);
					});
				}
            }).catch(Sequelize.Error, function (err) {
                return new ErrorHandler(new DatabaseError(err.message, err.name), res);
            });
		}
        else {
            throw new InvalidDataError("Hotel Id");
        }
    }

    updateHotelField(data, res) {
        if(!isNaN(data.hotelId)) {
			this.Hotels.findOne({
				where: {id: data.hotelId},
				include : [this.HotelImages, this.HotelFacilities]
            }).then(hotel => {
				if (hotel === undefined || hotel === null || hotel.length == 0)
					return new ErrorHandler(new ResourceNotFoundError("Hotel"), res);
				else {
					for (const key in data.hotelData) {
						if (data.hotelData.hasOwnProperty(key)) {
							hotel[key] = (data.hotelData[key] != undefined) ? data.hotelData[key]: null;
						}
					}
					hotel.save().then(function() {
						return res.json(hotel);
					}).catch(Sequelize.Error, function (err) {
						return new ErrorHandler(new DatabaseError(err.message, err.name), res);
					});
				}
            }).catch(Sequelize.Error, function (err) {
                return new ErrorHandler(new DatabaseError(err.message, err.name), res);
            });
		}
        else {
            throw new InvalidDataError("Hotel Id");
        }
    }

    removeHotel(data, res) {
        if(!isNaN(data.hotelId)) {
            this.Hotels.findOne({
                where: {id: data.hotelId},
				include : [this.HotelImages, this.HotelFacilities]               
            }).then(hotel => {
				if (hotel === undefined || hotel === null || hotel.length == 0)
					return new ErrorHandler(new ResourceNotFoundError("Hotel"), res);
				else {
					hotel.inactive = 1;
					hotel.save().then(function() {
						return res.json(hotel);
					}).catch(Sequelize.Error, function (err) {
						return new ErrorHandler(new DatabaseError(err.message, err.name), res);
					});
				}
            }).catch(Sequelize.Error, function (err) {
                return new ErrorHandler(new DatabaseError(err.message, err.name), res);
            });
		}
        else {
            throw new InvalidDataError("Hotel Id");
        }
    }

    getHotelImages(data, res) {
        if(!isNaN(data.hotelId)) {
            this.HotelImages.findAll({
                where: {hotelId: data.hotelId}
            }).then(hotel_images => {
				if (hotel_images === undefined || hotel_images === null || hotel_images.length == 0)
					return new ErrorHandler(new ResourceNotFoundError("Hotel images"), res);
				else 
					return res.json(hotel_images);
            }).catch(Sequelize.Error, function (err) {
                return new ErrorHandler(new DatabaseError(err.message, err.name), res);
            });
        }
        else {
            throw new InvalidDataError("Hotel Id");
        }
    }

    getHotelFacilities(data, res) {
        if(!isNaN(data.hotelId)) {
            this.HotelFacilities.findAll({
                where: {hotelId: data.hotelId}
            }).then(hotel_facilities => {
				if (hotel_facilities === undefined || hotel_facilities === null || hotel_facilities.length == 0)
					return new ErrorHandler(new ResourceNotFoundError("Hotel facilities"), res);
				else 
					return res.json(hotel_facilities);
            }).catch(Sequelize.Error, function (err) {
                return new ErrorHandler(new DatabaseError(err.message, err.name), res);
            });
        }
        else {
            throw new InvalidDataError("Hotel Id");
        }
    }

    createHotelImages(data, res) {
        if(!isNaN(data.hotelId)) {
			this.Hotels.findOne({
                where: {id: data.hotelId},
            }).then(hotel => {
				if (hotel === undefined || hotel === null || hotel.length == 0)
					return new ErrorHandler(new ResourceNotFoundError("Hotel"), res);
				else {
					for (let index = 0; index < data.hotelExtendedData.length; index++) {
						data.hotelExtendedData[index].hotelId = data.hotelId;
					}
					this.HotelImages.bulkCreate(data.hotelExtendedData).then((hotel_image) => {
						return res.json(hotel_image);
					}).catch(Sequelize.Error, function (err) {
						return new ErrorHandler(new DatabaseError(err.message, err.name), res);
					});
				}
            }).catch(Sequelize.Error, function (err) {
                return new ErrorHandler(new DatabaseError(err.message, err.name), res);
            });
        }
        else {
            throw new InvalidDataError("Hotel Id");
        }
    }

    createHotelFacilities(data, res) {
        if(!isNaN(data.hotelId)) {
			this.Hotels.findOne({
                where: {id: data.hotelId},
            }).then(hotel => {
				if (hotel === undefined || hotel === null || hotel.length == 0)
					return new ErrorHandler(new ResourceNotFoundError("Hotel"), res);
				else {
					for (let index = 0; index < data.hotelExtendedData.length; index++) {
						data.hotelExtendedData[index].hotelId = data.hotelId;
					}
					this.HotelFacilities.bulkCreate(data.hotelExtendedData).then((hotel_facility) => {
						return res.json(hotel_facility);
					}).catch(Sequelize.Error, function (err) {
						return new ErrorHandler(new DatabaseError(err.message, err.name), res);
					});
				}
            }).catch(Sequelize.Error, function (err) {
                return new ErrorHandler(new DatabaseError(err.message, err.name), res);
            });
        }
        else {
            throw new InvalidDataError("Hotel Id");
        }
    }
}

module.exports = HotelService;
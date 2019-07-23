const HotelModel = require('../models/hotel.model');
const HotelImagesModel = require('../models/hotel_images.model');
const HotelFacilitiesModel = require('../models/hotel_facilities.model');
const {ResourceNotFoundError, InvalidDataError, DatabaseError, ErrorHandler} = require('../errors/errors');
const SequelizeConnection = require('../config/database.config');
const Sequelize = SequelizeConnection.Sequelize;
const sequelize = SequelizeConnection.sequelize;

class HotelService {
    constructor() {
        this.Hotels = new HotelModel(Sequelize, sequelize);
        this.HotelImages = new HotelImagesModel(Sequelize, sequelize);
        this.HotelFacilities = new HotelFacilitiesModel(Sequelize, sequelize);

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
            return new ErrorHandler(new InvalidDataError("Hotel Id"), res);
        }
    }
    
    createHotel(data, res) {
        this.Hotels.create(data.hotelData, {
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
					for (const key in data.hotelData) {
						if (data.hotelData.hasOwnProperty(key)) {
							hotel[key] = data.hotelData[key];
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
            return new ErrorHandler(new InvalidDataError("Hotel Id"), res);
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
							hotel[key] = data.hotelData[key];
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
            return new ErrorHandler(new InvalidDataError("Hotel Id"), res);
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
            return new ErrorHandler(new InvalidDataError("Hotel Id"), res);
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
            return new ErrorHandler(new InvalidDataError("Hotel Id"), res);
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
            return new ErrorHandler(new InvalidDataError("Hotel Id"), res);
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
            return new ErrorHandler(new InvalidDataError("Hotel Id"), res);
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
            return new ErrorHandler(new InvalidDataError("Hotel Id"), res);
        }
    }
}

module.exports = HotelService;
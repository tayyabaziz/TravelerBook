const FacilitiesModel = require('../models/facilities.model');
const RoomModel = require('../models/room.model');
const {ResourceNotFoundError, InvalidDataError, DatabaseError, ErrorHandler} = require('../errors/errors');
const SequelizeConnection = require('../config/database.config');
const Sequelize = SequelizeConnection.Sequelize;
const sequelize = SequelizeConnection.sequelize;

class FacilitiesService {
    constructor() {
        this.Rooms = new RoomModel(Sequelize, sequelize);
        this.Facilities = new FacilitiesModel(Sequelize, sequelize);
    }

    getAllFacilities(res) {
        this.Facilities.findAll().then(facilities => {
			if (facilities === undefined || facilities.length == 0)
				return new ErrorHandler(new ResourceNotFoundError("Facilities"), res);
			else 
				return res.json(facilities);
        }).catch(Sequelize.Error, function (err) {
            return new ErrorHandler(new DatabaseError(err.message, err.name), res);
        });
    }
    
    getFacility(data, res) {
    	if(!isNaN(data.facilityId)) {
            this.Facilities.findOne({
                where: {id: data.facilityId}
            }).then(facility => {
                if (facility === undefined || facility == null || facility.length == 0)
					return new ErrorHandler(new ResourceNotFoundError("Facility"), res);
				else 
					return res.json(facility);
            }).catch(Sequelize.Error, function (err) {
                return new ErrorHandler(new DatabaseError(err.message, err.name), res);
            });
        }
        else {
            return new ErrorHandler(new InvalidDataError("Facility Id"), res);
        }
    }

    createFacility(data, res) {
        this.Facilities.create(data.facilityData).then((facilityResponse) => {
			if (facilityResponse === undefined || facilityResponse == null || facilityResponse.length == 0)
				return new ErrorHandler(new ResourceNotFoundError("Facility"), res);
			else 
				return res.json(facilityResponse);
        }).catch(Sequelize.Error, function (err) {
            return new ErrorHandler(new DatabaseError(err.message, err.name), res);
        });
    }

    updateFacility(data, res) {
    	if(!isNaN(data.facilityId)) {
            this.Facilities.findOne({
				where: {id: data.facilityId}
            }).then(facility => {
				if (facility === undefined || facility == null || facility.length == 0)
					return new ErrorHandler(new ResourceNotFoundError("Facility"), res);
				else {
                    for (const key in data.facilityData) {
						if (data.facilityData.hasOwnProperty(key)) {
							facility[key] = data.facilityData[key];
						}
					}
					facility.save().then(function() {
						return res.json(facility);
					}).catch(Sequelize.Error, function (err) {
						return new ErrorHandler(new DatabaseError(err.message, err.name), res);
					});
				}
            }).catch(Sequelize.Error, function (err) {
                return new ErrorHandler(new DatabaseError(err.message, err.name), res);
            });
		}
        else {
            return new ErrorHandler(new InvalidDataError("Facility Id"), res);
        }
    }
}

module.exports = FacilitiesService;
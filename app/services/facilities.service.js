const FacilitiesModel = require('../models/facilities.model');
const { ResourceNotFoundError, InvalidDataError, DatabaseError } = require('../errors/errors');
const SequelizeConnection = require('../config/database.config');
const Sequelize = SequelizeConnection.Sequelize;
const sequelize = SequelizeConnection.sequelize;

class FacilitiesService {
    constructor() {
        this.Facilities = new FacilitiesModel(Sequelize, sequelize);
    }

    getAllFacilities() {
        return new Promise((resolve, reject) => {
            this.Facilities.findAll().then(facilities => {
                if (facilities === undefined || facilities.length == 0)
                    reject(new ResourceNotFoundError("Facilities"));
                else
                    resolve(facilities);
            }).catch(Sequelize.Error, function (err) {
                reject(new DatabaseError(err.message, err.name));
            });
        });
    }

    getFacility(data) {
        return new Promise((resolve, reject) => {
            if (!isNaN(data.facilityId)) {
                this.Facilities.findOne({
                    where: { id: data.facilityId }
                }).then(facility => {
                    if (facility === undefined || facility == null || facility.length == 0)
                        reject(new ResourceNotFoundError("Facility"));
                    else
                        resolve(facility);
                }).catch(Sequelize.Error, function (err) {
                    reject(new DatabaseError(err.message, err.name));
                });
            }
            else {
                reject(new InvalidDataError("Facility Id"));
            }
        });
    }

    createFacility(data) {
        this.Facilities.create(data.facilityData).then((facility) => {
            if (facility === undefined || facility == null || facility.length == 0)
                reject(new ResourceNotFoundError("Facility"));
            else
                resolve(facility);
        }).catch(Sequelize.Error, function (err) {
            reject(new DatabaseError(err.message, err.name));
        });
    }

    updateFacility(data) {
        if (!isNaN(data.facilityId)) {
            this.Facilities.findOne({
                where: { id: data.facilityId }
            }).then(facility => {
                if (facility === undefined || facility == null || facility.length == 0)
                    reject(new ResourceNotFoundError("Facility"));
                else {
                    for (const key in data.facilityData) {
                        if (data.facilityData.hasOwnProperty(key)) {
                            facility[key] = data.facilityData[key];
                        }
                    }
                    facility.save().then(function () {
                        resolve(facility);
                    }).catch(Sequelize.Error, function (err) {
                        reject(new DatabaseError(err.message, err.name));
                    });
                }
            }).catch(Sequelize.Error, function (err) {
                reject(new DatabaseError(err.message, err.name));
            });
        }
        else {
            reject(new InvalidDataError("Facility Id"));
        }
    }
}

module.exports = FacilitiesService;
const { FacilitiesModel } = require('../models/all.models')
const { ResourceNotFoundError, InvalidDataError, DatabaseError } = require('../errors/errors')
const SequelizeConnection = require('../config/database.config')
const Sequelize = SequelizeConnection.Sequelize
const sequelize = SequelizeConnection.sequelize

class FacilitiesService {
  constructor () {
    this.Facilities = new FacilitiesModel(Sequelize, sequelize)
  }

  getAllFacilities () {
    return new Promise((resolve, reject) => {
      this.Facilities.findAll().then(facilities => {
        if (facilities === undefined || facilities.length === 0) { reject(new ResourceNotFoundError('Facilities')) } else { resolve(facilities) }
      }).catch(Sequelize.Error, function (err) {
        reject(new DatabaseError(err.message, err.name))
      })
    })
  }

  getFacility (data) {
    return new Promise((resolve, reject) => {
      if (!isNaN(data.facilityId)) {
        this.Facilities.findOne({
          where: { id: data.facilityId }
        }).then(facility => {
          if (facility === undefined || facility === null || facility.length === 0) { reject(new ResourceNotFoundError('Facility')) } else { resolve(facility) }
        }).catch(Sequelize.Error, function (err) {
          reject(new DatabaseError(err.message, err.name))
        })
      } else {
        reject(new InvalidDataError('Facility Id'))
      }
    })
  }

  createFacility (data) {
    return new Promise((resolve, reject) => {
      this.Facilities.create(data.facilityData).then((facility) => {
        if (facility === undefined || facility === null || facility.length === 0) { reject(new ResourceNotFoundError('Facility')) } else { resolve(facility) }
      }).catch(Sequelize.Error, function (err) {
        reject(new DatabaseError(err.message, err.name))
      })
    })
  }

  updateFacility (data) {
    return new Promise((resolve, reject) => {
      if (!isNaN(data.facilityId)) {
        this.Facilities.findOne({
          where: { id: data.facilityId }
        }).then(facility => {
          if (facility === undefined || facility === null || facility.length === 0) { reject(new ResourceNotFoundError('Facility')) } else {
            for (const key in data.facilityData) {
              if (Object.prototype.hasOwnProperty.call(data.facilityData, key)) {
                facility[key] = data.facilityData[key]
              }
            }
            facility.save().then(function () {
              resolve(facility)
            }).catch(Sequelize.Error, function (err) {
              reject(new DatabaseError(err.message, err.name))
            })
          }
        }).catch(Sequelize.Error, function (err) {
          reject(new DatabaseError(err.message, err.name))
        })
      } else {
        reject(new InvalidDataError('Facility Id'))
      }
    })
  }
}

module.exports = FacilitiesService

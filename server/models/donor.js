"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Donor extends Model {
    static associate(models) {
      Donor.hasMany(models.Donation, {
        as: "donations",
        foreignKey: "donorId",
      });

      Donor.hasMany(models.ActionRegistration, {
        as: "actionRegistrations",
        foreignKey: "donorId",
      });

      Donor.hasMany(models.Certificate, {
        as: "certificates",
        foreignKey: "donorId",
      });

      Donor.belongsTo(models.BloodBank, {
        as: "bloodBank",
        foreignKey: "transfusionInstitute",
        targetKey: "name",
      });
    }
  }
  Donor.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      bloodType: DataTypes.STRING,
      transfusionInstitute: DataTypes.STRING,
      numberOfDonations: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Donor",
    }
  );
  return Donor;
};

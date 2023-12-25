"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BloodBank extends Model {
    static associate(models) {
      BloodBank.hasMany(models.Action, {
        as: "actions",
        foreignKey: "bloodBankId",
      });
    }
  }
  BloodBank.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      numberOfDonors: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "BloodBank",
    }
  );
  return BloodBank;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BloodBank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BloodBank.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      city: DataTypes.STRING,
      address: DataTypes.STRING,
      numberOfDonors: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "BloodBank",
    }
  );
  return BloodBank;
};

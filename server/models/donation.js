"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Donation.belongsTo(models.Donor, {
        as: "donor",
        foreignKey: "donorId",
        targetKey: "id",
      });

      Donation.belongsTo(models.BloodBank, {
        as: "bloodBank",
        foreignKey: "bloodBankId",
        targetKey: "id",
      });
    }
  }
  Donation.init(
    {
      date: DataTypes.DATE,
      address: DataTypes.STRING,
      warning: DataTypes.STRING,
      donorId: DataTypes.INTEGER,
      bloodBankId: DataTypes.INTEGER,
      used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Početna vrijednost je false, kad se krv iskoristi postaje true
      },
    },
    {
      sequelize,
      modelName: "Donation",
    }
  );
  return Donation;
};

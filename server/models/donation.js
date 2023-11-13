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
    }
  }
  Donation.init(
    {
      date: DataTypes.DATE,
      address: DataTypes.STRING,
      warning: DataTypes.STRING,
      donorId: DataTypes.STRING,
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

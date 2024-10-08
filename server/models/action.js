"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Action extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Action.hasMany(models.ActionRegistration, { foreignKey: "actionId" });
    }
  }
  Action.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      bloodBankId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      date: DataTypes.DATE,
      minNumberOfDonors: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Action",
    }
  );
  return Action;
};

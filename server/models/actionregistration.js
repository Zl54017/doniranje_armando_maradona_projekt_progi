"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ActionRegistration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ActionRegistration.belongsTo(models.Action, { foreignKey: "actionId" });
    }
  }
  ActionRegistration.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      actionId: DataTypes.INTEGER,
      donorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ActionRegistration",
    }
  );
  return ActionRegistration;
};

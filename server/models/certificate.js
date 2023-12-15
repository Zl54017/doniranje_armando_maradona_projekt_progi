"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Certificate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Certificate.belongsTo(models.Donor, {
        as: "donor",
        foreignKey: "donorId",
        targetKey: "id",
      });
    }
  }
  Certificate.init(
    {
      name: DataTypes.STRING,
      benefits: DataTypes.STRING,
      numberOfDonations: DataTypes.INTEGER,
      donorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Certificate",
    }
  );
  return Certificate;
};

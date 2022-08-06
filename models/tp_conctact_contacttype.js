'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TP_Conctact_ContactType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TP_Conctact_ContactType.init(
    {
      ContactUuid: DataTypes.STRING,
      ContactTypeId: DataTypes.INTEGER,
      Name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'TP_Conctact_ContactType',
    }
  );
  return TP_Conctact_ContactType;
};

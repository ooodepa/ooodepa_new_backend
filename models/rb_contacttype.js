'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RB_ContactType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RB_ContactType.init({
    Name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RB_ContactType',
  });
  return RB_ContactType;
};
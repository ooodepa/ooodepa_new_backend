'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RB_Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RB_Contact.init(
    {
      ContactUuid: DataTypes.STRING,
      Name: DataTypes.STRING,
      Description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'RB_Contact',
    }
  );
  return RB_Contact;
};

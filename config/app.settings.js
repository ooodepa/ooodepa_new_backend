require('dotenv').config();

const appSettings = {
  APP__HOST: process.env.APP__HOST,
  APP__PORT: process.env.APP__PORT,

  SEQUELIZE__DIALECT: process.env.SEQUELIZE__DIALECT,
  SEQUELIZE__LOGGING: process.env.SEQUELIZE__LOGGING === 'true' ? true : false,
  SEQUELIZE__HOST: process.env.SEQUELIZE__HOST,
  SEQUELIZE__USERNAME: process.env.SEQUELIZE__USERNAME,
  SEQUELIZE__PASSWORD: `${process.env.SEQUELIZE__PASSWORD}`,
  SEQUELIZE__PORT: process.env.SEQUELIZE__PORT,
  SEQUELIZE__DATABASE: process.env.SEQUELIZE__DATABASE,
  SEQUELIZE__TIMEZONE: process.env.SEQUELIZE__TIMEZONE,
  SEQUELIZE__TIMESTAMPS:
    process.env.SEQUELIZE__TIMESTAMPS === 'true' ? true : false,
};

module.exports = appSettings;

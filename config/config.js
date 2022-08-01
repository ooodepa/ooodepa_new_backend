const appSettings = require('./app.settings');

module.exports = {
  development: {
    username: appSettings.SEQUELIZE__USERNAME,
    password: appSettings.SEQUELIZE__PASSWORD,
    database: 'database_development',
    host: appSettings.SEQUELIZE__HOST,
    dialect: appSettings.SEQUELIZE__DIALECT,
  },
  test: {
    username: appSettings.SEQUELIZE__USERNAME,
    password: appSettings.SEQUELIZE__PASSWORD,
    database: 'database_test',
    host: appSettings.SEQUELIZE__HOST,
    dialect: appSettings.SEQUELIZE__DIALECT,
  },
  production: {
    username: appSettings.SEQUELIZE__USERNAME,
    password: appSettings.SEQUELIZE__PASSWORD,
    database: 'database_production',
    host: appSettings.SEQUELIZE__HOST,
    dialect: appSettings.SEQUELIZE__DIALECT,
  },
};

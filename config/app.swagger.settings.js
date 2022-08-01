const appSettings = require('./app.settings');

const host = `${appSettings.APP__HOST}:${appSettings.APP__PORT}/api`
  .replace('http://', '')
  .replace('https://', '');

const swaggerSettings = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      version: '0.1.0',
      title: 'Документация API',
      host,
      description: 'Расписал возможные эндпоинты.',
      contact: {
        name: 'Павел Иннокентьевич Галанин',
        email: 'Pavel.Innokentevich.Galanin@gmail.com',
      },
    },
    tags: [
      {
        name: '/api/',
        description: 'Документация API.',
      },
    ],
    schemes: ['http'],
  },
  apis: [
    'routes/swagger/index.js',
    'routes/swagger.json/index.js',
    'routes/redoc/index.js',
  ],
};

module.exports = swaggerSettings;

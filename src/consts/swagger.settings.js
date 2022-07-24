const appSettings = require('./app.settings');

const host = `${appSettings.host}:${appSettings.port}/api`
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
        name: 'hello',
        description: 'Эндпоинт для проверки работы сервера.',
      },
    ],
    schemes: ['http'],
  },
  apis: [
    'src/routes/hello/GET/helloGet.js',
    'src/routes/redoc/GET/redocGet.js',
    'src/routes/swagger/GET/swaggerGet.js',
    'src/routes/swagger.json/GET/swaggerJsonGet.js',
  ],
};

module.exports = swaggerSettings;

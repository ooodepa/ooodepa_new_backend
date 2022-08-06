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
        description: 'Документация API',
      },
      {
        name: '/api/auth/',
        description: 'Авторизация',
      },
      {
        name: '/api/contact-types',
        description: 'CRUD операции со справочным документом "Типы контакта"',
      },
      {
        name: '/api/contacts',
        description: 'CRUD операции со справочным документом "Контакты"',
      },
    ],
    schemes: ['http'],
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
  apis: [
    'config/app.swagger.settings.js',
    'routes/swagger.js',
    'routes/swagger.json.js',
    'routes/redoc.js',

    'scripts/MiddlewareTypeCheck.js',

    'routes/auth.js',
    'routes/contact-types.js',
    'routes/contacts.js',
  ],
};

module.exports = swaggerSettings;

/**
 *  @openapi
 *  definitions:
 *    Message:
 *      properties:
 *        message:
 *          type: string
 */

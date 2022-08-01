const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');

const swaggerSettings = require('./../../config/app.swagger.settings');

const router = express.Router();

/**
 *  @openapi
 *  /api/swagger:
 *    get:
 *      tags:
 *        - /api/
 *      description: Документация Swagger
 *      responses:
 *        '200':
 *          description: Успешный запрос
 */

router.use(
  '/swagger',
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerJsDoc(swaggerSettings))
);

module.exports = router;

const express = require('express');
const router = express.Router();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');
const swaggerSettings = require('../../../consts/swagger.settings');

router.use(
  '/swagger',
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerJsDoc(swaggerSettings))
);

module.exports = router;

/**
 *  @openapi
 *  /api/swagger:
 *    get:
 *      tags:
 *        - documentation
 *      description: Документация Swagger
 *      responses:
 *        '200':
 *          description: Успешный запрос
 */

const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerSettings = require('../config/app.swagger.settings');

const router = express.Router();

/**
 *  @openapi
 *  /api/swagger.json:
 *    get:
 *      tags:
 *        - /api/
 *      description: Swagger в JSON
 *      responses:
 *        '200':
 *          description: Успешный запрос
 *        '500':
 *          description: Ошибка на сервере
 *          schema:
 *            $ref: '#/definitions/Message'
 */
router.get('/swagger.json', (request, response) => {
  try {
    response.status(200).json(swaggerJsDoc(swaggerSettings));
  } catch (error) {
    response.status(500).json({
      message: '' + error,
    });
  }
});

module.exports = router;

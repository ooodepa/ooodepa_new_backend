const express = require('express');
const router = express.Router();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSettings = require('../../../consts/swagger.settings');

router.get('/swagger.json', (request, response) => {
  try {
    response.status(200).send(swaggerJsDoc(swaggerSettings));
  } catch (error) {
    response.status(500).send({
      json: JSON.stringify(error),
      message: '' + error,
    });
  }
});

module.exports = router;

/**
 *  @openapi
 *  /api/swagger.json:
 *    get:
 *      tags:
 *        - documentation
 *      description: Swagger в JSON
 *      responses:
 *        '200':
 *          description: Успешный запрос
 *        '500':
 *          description: Ошибка на сервере
 *          schema:
 *            type: object
 *            properties:
 *              json:
 *                type: string
 *              message:
 *                type: string
 *          examples:
 *            application/json:
 *              json: "{}"
 *              message: "ReferenceError: notExistVariable is not defined"
 */

const express = require('express');
const router = express.Router();

router.get('/hello', async function (request, response) {
  try {
    response.status(200).send({
      hello: `Hello, ${request.query.name || 'Anonnim'}!`,
      args: request.query,
    });
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
 *  /api/hello:
 *    get:
 *      tags:
 *        - hello
 *      description: Проверка авторизации
 *      parameters:
 *        - in: query
 *          description: Имя, которое отправим серверу
 *          name: name
 *          type: string
 *      responses:
 *        '200':
 *          description: Успешный запрос
 *          schema:
 *            type: object
 *            properties:
 *              hello:
 *                type: string
 *          examples:
 *            application/json:
 *              hello: "Hello, Pavel!"
 *              args:
 *                name: "Pavel"
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

const express = require('express');
const redoc = require('redoc-express');

const router = express.Router();

/**
 *  @openapi
 *  /api/redoc:
 *    get:
 *      tags:
 *        - /api/
 *      description: Документация Redoc
 *      responses:
 *        '200':
 *          description: Успешный запрос
 */
router.get(
  '/redoc',
  redoc({
    title: 'Redoc',
    specUrl: '/api/swagger.json',
  })
);

module.exports = router;

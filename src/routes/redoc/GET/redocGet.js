const express = require('express');
const router = express.Router();
const redoc = require('redoc-express');

router.get(
  '/redoc',
  redoc({
    title: 'Redoc',
    specUrl: '/api/swagger.json',
  })
);

module.exports = router;

/**
 *  @openapi
 *  /api/redoc:
 *    get:
 *      tags:
 *        - documentation
 *      description: Документация Redoc
 *      responses:
 *        '200':
 *          description: Успешный запрос
 */

const express = require('express');
const { check } = require('express-validator');

const MiddlewareTypeCheck = require('../scripts/MiddlewareTypeCheck');
const MiddlewareTokenCheck = require('../scripts/MiddlewareTokenCheck');
const { RB_ContactType } = require('../models');

const router = express.Router();

/**
 *  @openapi
 *  definitions:
 *    RB_ContactType:
 *      properties:
 *        id:
 *          type: integer
 *        Name:
 *          type: string
 *        updatedAt:
 *          type: string
 *        createdAt:
 *          type: string
 */

/**
 *  @openapi
 *  /api/contact-types:
 *    post:
 *      tags:
 *        - /api/contact-types
 *      description: Swagger в JSON
 *      parameters:
 *        - in: body
 *          description: Тело запроса
 *          required: true
 *          schema:
 *            type: object
 *            properties:
 *              Name:
 *                type: string
 *      responses:
 *        '201':
 *          description: Создали запись
 *          schema:
 *           $ref: '#/definitions/RB_ContactType'
 *        '400':
 *          description: Не верный формат
 *          schema:
 *            $ref: '#/definitions/MiddlewareTypeCheck'
 *        '401':
 *          description: Не авторизован
 *          schema:
 *            $ref: '#/definitions/Message'
 *        '500':
 *          description: Ошибка на сервере
 *          schema:
 *            $ref: '#/definitions/Message'
 */
router.post(
  '/contact-types',
  [
    check('Name', 'Field "Name" not string').isString(),
    check('Name', 'Field "Name" is empty').notEmpty(),
  ],
  MiddlewareTypeCheck,
  MiddlewareTokenCheck,
  async (req, res) => {
    try {
      const { Name } = req.body;
      const result = await RB_ContactType.create({ Name });
      return res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: '' + error });
    }
  }
);

/**
 *  @openapi
 *  /api/contact-types:
 *    get:
 *      tags:
 *        - /api/contact-types
 *      description: Swagger в JSON
 *      responses:
 *        '200':
 *          description: Получили массив данных
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/definitions/RB_ContactType'
 *        '500':
 *          description: Ошибка на сервере
 *          schema:
 *            $ref: '#/definitions/Message'
 */
router.get('/contact-types', async (req, res) => {
  try {
    const array = await RB_ContactType.findAll();
    return res.status(200).json(array);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '' + error });
  }
});

/**
 *  @openapi
 *  /api/contact-types/{id}:
 *    get:
 *      parameters:
 *        - in: path
 *          name: id   # Note the name is the same as in the path
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: The contact type ID
 *      tags:
 *        - /api/contact-types
 *      description: Swagger в JSON
 *      responses:
 *        '200':
 *          description: Получили данные по id
 *          schema:
 *            type: object
 *            $ref: '#/definitions/RB_ContactType'
 *        '404':
 *          description: Не существует
 *          schema:
 *            $ref: '#/definitions/Message'
 *        '500':
 *          description: Ошибка на сервере
 *          schema:
 *            $ref: '#/definitions/Message'
 */
router.get('/contact-types/:id/', async (req, res) => {
  try {
    const { id } = req.params;
    const object = await RB_ContactType.findOne({ where: { id } });
    if (!object) {
      return res.status(404).json({ message: '404' });
    }
    return res.status(200).json(object);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '' + error });
  }
});

/**
 *  @openapi
 *  /api/contact-types/{id}:
 *    put:
 *      parameters:
 *        - in: path
 *          name: id   # Note the name is the same as in the path
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: The contact type ID
 *      tags:
 *        - /api/contact-types
 *      description: Swagger в JSON
 *      responses:
 *        '200':
 *          description: Обновили данные
 *          schema:
 *            $ref: '#/definitions/Message'
 *        '400':
 *          description: Не верный формат
 *          schema:
 *            $ref: '#/definitions/MiddlewareTypeCheck'
 *        '401':
 *          description: Не авторизован
 *          schema:
 *            $ref: '#/definitions/Message'
 *        '404':
 *          description: Не найден
 *          schema:
 *            $ref: '#/definitions/Message'
 *        '500':
 *          description: Ошибка на сервере
 *          schema:
 *            $ref: '#/definitions/Message'
 */
router.put('/contact-types/:id/', MiddlewareTokenCheck, async (req, res) => {
  try {
    const { id } = req.params;

    const object = await RB_ContactType.findOne({ where: { id } });
    if (!object) {
      return res.status(404).json({ message: '404' });
    }

    await RB_ContactType.update({ ...req.body }, { where: { id } });
    return res.status(200).json({ message: 'Updated' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '' + error });
  }
});

/**
 *  @openapi
 *  /api/contact-types/{id}:
 *    delete:
 *      parameters:
 *        - in: path
 *          name: id   # Note the name is the same as in the path
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: The contact type ID
 *      tags:
 *        - /api/contact-types
 *      description: Swagger в JSON
 *      responses:
 *        '200':
 *          description: Удалено с успехом
 *          schema:
 *            $ref: '#/definitions/Message'
 *        '404':
 *          description: Не существует
 *          schema:
 *            $ref: '#/definitions/Message'
 *        '401':
 *          description: Не авторизован
 *          schema:
 *            $ref: '#/definitions/Message'
 *        '500':
 *          description: Ошибка на сервере
 *          schema:
 *            $ref: '#/definitions/Message'
 */
router.delete('/contact-types/:id/', MiddlewareTokenCheck, async (req, res) => {
  try {
    const { id } = req.params;

    const object = await RB_ContactType.findOne({ where: { id } });
    if (!object) {
      return res.status(404).json({ message: '404' });
    }

    await RB_ContactType.destroy({ where: { id } });
    return res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '' + error });
  }
});

module.exports = router;

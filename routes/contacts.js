const express = require('express');
const { check } = require('express-validator');
const { sequelize } = require('../models');
const { v4: uuidv4 } = require('uuid');

const MiddlewareTypeCheck = require('../scripts/MiddlewareTypeCheck');
const MiddlewareTokenCheck = require('../scripts/MiddlewareTokenCheck');
const { RB_Contact, TP_Conctact_ContactType } = require('../models');

const router = express.Router();

/**
 *  @openapi
 *  definitions:
 *    RB_Contact:
 *      properties:
 *        id:
 *          type: integer
 *        ContactUuid:
 *          type: string
 *        Name:
 *          type: string
 *        Description:
 *          type: string
 *        updatedAt:
 *          type: string
 *        createdAt:
 *          type: string
 */

/**
 *  @openapi
 *  definitions:
 *    TP_Contact_ContactType:
 *      properties:
 *        id:
 *          type: integer
 *        ContactUuid:
 *          type: string
 *        ContactTypeId:
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
 *  definitions:
 *    RB_Contact_with_table:
 *      properties:
 *        id:
 *          type: integer
 *        ContactUuid:
 *          type: string
 *        Name:
 *          type: string
 *        Description:
 *          type: string
 *        updatedAt:
 *          type: string
 *        createdAt:
 *          type: string
 *        TablePartContactTypes:
 *          type: array
 *          items:
 *            $ref: '#/definitions/TP_Contact_ContactType'
 */

/**
 *  @openapi
 *  /api/contacts:
 *    post:
 *      tags:
 *        - /api/contacts
 *      description: Создаем контакт
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
 *           $ref: '#/definitions/RB_Contact_with_table'
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
  '/contacts',
  [
    check('Name', 'Field "Name" not string').isString(),
    check('Name', 'Field "Name" is empty').notEmpty(),
    check('Description', 'Field "Description" not string').isString(),
    check('Description', 'Field "Description" is empty').notEmpty(),
    check(
      'TablePartContactTypes',
      'Field "TablePartContactTypes" not array'
    ).isArray(),
  ],
  MiddlewareTypeCheck,
  MiddlewareTokenCheck,
  async (req, res) => {
    try {
      let json_contact = {};
      let json_TablePartContactTypes = [];
      const t = await sequelize.transaction();
      try {
        const { Name, Description } = req.body;
        const ContactUuid = uuidv4();
        json_contact = await RB_Contact.create(
          {
            Name,
            Description,
            ContactUuid,
          },
          { transaction: t }
        );

        const { TablePartContactTypes } = req.body;
        for (let i = 0; i < TablePartContactTypes.length; ++i) {
          const { Name, ContactTypeId } = TablePartContactTypes[i] || {};
          const result = await TP_Conctact_ContactType.create(
            {
              ContactUuid,
              Name,
              ContactTypeId,
            },
            { transaction: t }
          );
          json_TablePartContactTypes.push(result);
        }
        await t.commit();
      } catch (error) {
        console.log(error);
        await t.rollback();
        return res.status(500).json({ message: 'rollback', more: '' + error });
      }

      return res.status(201).json({
        ...json_contact.dataValues,
        TablePartContactTypes: json_TablePartContactTypes,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: '' + error });
    }
  }
);

/**
 *  @openapi
 *  /api/contacts:
 *    get:
 *      tags:
 *        - /api/contacts
 *      description: Получаем массив контактов
 *      responses:
 *        '200':
 *          description: Получили массив данных
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/definitions/RB_Contact'
 *        '500':
 *          description: Ошибка на сервере
 *          schema:
 *            $ref: '#/definitions/Message'
 */
router.get('/contacts', async (req, res) => {
  try {
    const array = await RB_Contact.findAll();
    return res.status(200).json(array);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '' + error });
  }
});

/**
 *  @openapi
 *  /api/contacts/{id}:
 *    get:
 *      parameters:
 *        - in: path
 *          name: id   # Note the name is the same as in the path
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: The contact ID
 *      tags:
 *        - /api/contacts
 *      description: Получаем контакт по id
 *      responses:
 *        '200':
 *          description: Получили данные по id
 *          schema:
 *            type: object
 *            $ref: '#/definitions/RB_Contact_with_table'
 *        '404':
 *          description: Не существует
 *          schema:
 *            $ref: '#/definitions/Message'
 *        '500':
 *          description: Ошибка на сервере
 *          schema:
 *            $ref: '#/definitions/Message'
 */
router.get('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const object = await RB_Contact.findOne({ where: { id } });
    if (!object) {
      return res.status(404).json({ message: '404' });
    }

    const { ContactUuid } = object || {};
    const table = await TP_Conctact_ContactType.findAll({
      where: { ContactUuid },
    });

    return res.status(200).json({
      ...object.dataValues,
      TablePartContactTypes: table,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '' + error });
  }
});

/**
 *  @openapi
 *  /api/contacts/{id}:
 *    put:
 *      parameters:
 *        - in: path
 *          name: id   # Note the name is the same as in the path
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: The contact ID
 *      tags:
 *        - /api/contacts
 *      description: Обновляем контакт по id
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
router.put('/contacts/:id', MiddlewareTokenCheck, async (req, res) => {
  try {
    const { id } = req.params;
    const object = await RB_Contact.findOne({ where: { id } });
    if (!object) {
      return res.status(404).json({ message: '404' });
    }

    const t = await sequelize.transaction();
    try {
      const oldContactUuid = object.ContactUuid;
      const { Name, Description } = req.body;

      await TP_Conctact_ContactType.destroy(
        {
          where: {
            ContactUuid: oldContactUuid,
          },
        },
        { transaction: t }
      );

      const ContactUuid = uuidv4();

      await RB_Contact.update(
        { Name, Description, ContactUuid },
        { where: { id } },
        { transaction: t }
      );

      const { TablePartContactTypes } = req.body;
      for (let i = 0; i < TablePartContactTypes.length; ++i) {
        const { Name, ContactTypeId } = TablePartContactTypes[i] || {};
        await TP_Conctact_ContactType.create(
          {
            ContactUuid,
            Name,
            ContactTypeId,
          },
          { transaction: t }
        );
      }

      await t.commit();
    } catch (error) {
      console.log(error);
      await t.rollback();
      return res.status(500).json({ message: 'rollback', more: '' + error });
    }

    return res.status(200).json({ message: 'Updated' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '' + error });
  }
});

/**
 *  @openapi
 *  /api/contacts/{id}:
 *    delete:
 *      parameters:
 *        - in: path
 *          name: id   # Note the name is the same as in the path
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: The contact ID
 *      tags:
 *        - /api/contacts
 *      description: Удаляем контакт по id
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
router.delete('/contacts/:id', MiddlewareTokenCheck, async (req, res) => {
  try {
    const { id } = req.params;
    const object = await RB_Contact.findOne({ where: { id } });
    if (!object) {
      return res.status(404).json({ message: '404' });
    }

    const t = await sequelize.transaction();
    try {
      const ContactUuid = object.ContactUuid;
      await RB_Contact.destroy({ where: { id } }, { transaction: t });
      await TP_Conctact_ContactType.destroy(
        { where: { ContactUuid } },
        { transaction: t }
      );
      await t.commit();
    } catch (error) {
      console.log(error);
      await t.rollback();
      return res.status(500).json({ message: 'rollback', more: '' + error });
    }
    return res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '' + error });
  }
});

module.exports = router;

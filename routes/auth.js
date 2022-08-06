const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { check } = require('express-validator');

const appSettings = require('../config/app.settings');
const MiddlewareTypeCheck = require('../scripts/MiddlewareTypeCheck');
const MiddlewareTokenCheck = require('../scripts/MiddlewareTokenCheck');
const { RB_User } = require('../models');

const router = express.Router();

/**
 *  @openapi
 *  definitions:
 *    Token:
 *      properties:
 *        token:
 *          type: string
 */

/**
 *  @openapi
 *  /api/auth/sign-up/:
 *    post:
 *      tags:
 *        - /api/auth/
 *      description: Регистрация
 *      parameters:
 *        - in: body
 *          description: Тело запроса
 *          required: true
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *      responses:
 *        '200':
 *          description: Зарегистрировались
 *          schema:
 *           $ref: '#/definitions/Token'
 *        '400':
 *          description: Не верный формат
 *          schema:
 *            $ref: '#/definitions/MiddlewareTypeCheck'
 *        '500':
 *          description: Ошибка на сервере
 *          schema:
 *            $ref: '#/definitions/Message'
 */
router.post(
  '/auth/sign-up',
  [
    check('username', 'Field username not string').isString(),
    check('username', 'Field username is empty').notEmpty(),
    check('password', 'Field password not string').isString(),
    check('password', 'Password length c [4;64]').isLength({
      min: 4,
      max: 64,
    }),
  ],
  async (req, res) => {
    try {
      const { username, password } = req.body;

      let candidate = await RB_User.findOne({ where: { Name: username } });
      if (candidate) {
        return res.status(400).json({ message: 'User exist!' });
      }

      candidate = await RB_User.create({
        Name: username,
        HashPassword: bcrypt.hashSync(password, 7),
        isAdmin: false,
      });

      const payload = { UserId: candidate.id };
      const secret = appSettings.APP__JWT_SECRET;
      const options = { expiresIn: appSettings.APP__JWT_TOKEN_EXPIRES_IN };

      const token = jwt.sign(payload, secret, options);

      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: '' + error });
    }
  }
);

/**
 *  @openapi
 *  /api/auth/sign-in/:
 *    post:
 *      tags:
 *        - /api/auth/
 *      description: Вход
 *      parameters:
 *        - in: body
 *          description: Тело запроса
 *          required: true
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *      responses:
 *        '200':
 *          description: Ввошли
 *          schema:
 *           $ref: '#/definitions/Token'
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
  '/auth/sign-in',
  [
    check('username', 'Field username not string').isString(),
    check('password', 'Field password not string').isString(),
  ],
  MiddlewareTypeCheck,
  async (req, res) => {
    try {
      const { username, password } = req.body;

      let candidate = await RB_User.findOne({ where: { Name: username } });
      if (!candidate) {
        return res.status(400).json({ message: 'User not exist!' });
      }

      const isRightPassword = bcrypt.compareSync(
        password,
        candidate.HashPassword
      );

      if (!isRightPassword) {
        return res.status(400).json({ message: 'Password not correct!' });
      }

      const payload = { UserId: candidate.id };
      const secret = appSettings.APP__JWT_SECRET;
      const options = { expiresIn: appSettings.APP__JWT_TOKEN_EXPIRES_IN };

      const token = jwt.sign(payload, secret, options);

      return res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: '' + error });
    }
  }
);

/**
 *  @openapi
 *  /api/auth/is-admin-token/:
 *    post:
 *      tags:
 *        - /api/auth/
 *      description: Проверка является ли пользователь администратором
 *      responses:
 *        '200':
 *          description: Вы админ
 *          schema:
 *           $ref: '#/definitions/Message'
 *        '401':
 *          description: Не авторизован
 *          schema:
 *            $ref: '#/definitions/Message'
 *        '500':
 *          description: Ошибка на сервере
 *          schema:
 *            $ref: '#/definitions/Message'
 */
router.post('/auth/is-admin-token', MiddlewareTokenCheck, async (req, res) => {
  try {
    return res.status(200).json({ message: 'You are admin' });
  } catch (error) {
    res.status(500).json({ message: '' + error });
  }
});

module.exports = router;

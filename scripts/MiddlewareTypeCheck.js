const { validationResult } = require('express-validator');

/**
 *  @openapi
 *  definitions:
 *    ExpressValidator:
 *      properties:
 *        msg:
 *          type: string
 *        param:
 *          type: string
 *        location:
 *          type: string
 */

/**
 *  @openapi
 *  definitions:
 *    MiddlewareTypeCheck:
 *      properties:
 *        message:
 *          type: string
 *        more:
 *          type: object
 *          properties:
 *            errors:
 *              type: array
 *              items:
 *                $ref: '#/definitions/ExpressValidator'
 */
module.exports = function MiddlewareTypeCheck(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Format not right',
        more: errors,
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: '' + error });
  }
};

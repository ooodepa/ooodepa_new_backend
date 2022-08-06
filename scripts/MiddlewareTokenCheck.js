const jwt = require('jsonwebtoken');

const appSettings = require('./../config/app.settings');
const { RB_User } = require('./../models');

module.exports = async function MiddlewareTokenCheck(req, res, next) {
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    const secret = appSettings.APP__JWT_SECRET;
    const payload = jwt.verify(token, secret);

    const candidat = await RB_User.findOne({ where: { id: payload.UserId } });
    if (!candidat.isAdmin) {
      return res.status(401).json({ message: 'Not admin' });
    }

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: `Token expired ${error}` });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: `${error}` });
    }

    console.log(error);
    return res.status(500).json({ message: '' + error });
  }
};

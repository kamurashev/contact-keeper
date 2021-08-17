const jwt = require('jsonwebtoken');
const jwtSecret = require('config').get('jwtSecret');

module.exports = (req, res, next) => {
  /*#swagger.responses[401] = {
    description: 'Unauthorizad. Object with msg field representing detailed reason',
    schema: { $ref: '#/definitions/Message' }
  }*/
  try {
    const authHeader = req.header('authorization');
    const authParts = authHeader && req.header('authorization').split(' ');
    const isBearer = authParts && authParts[0] === 'Bearer';
    const token = authParts && authParts[1];

    !isBearer &&
      (() => {
        throw new Error('Bearer schema violated');
      })();
    !token &&
      (() => {
        throw new Error('Token not found');
      })();

    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log('401 - Unauthirized access try', err);
    res.status(401).json({ msg: err.message });
  }
};

const router = require('express-promise-router')();
const { logInUserValidator, validate } = require('../middleware/validators');
const auth = require('../middleware/auth');

const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

router.get(
  '/', auth,

  /* #swagger.description = 'Fetching logged in user',
  #swagger.security = [{
               "bearerJwtAuth": []
  }],
  #swagger.responses[200] = {
        description: 'OK. Object representing logged in user',
        schema: { $ref: '#/definitions/UserResp' }
  }*/
  async (req, res) => {
    res.json(await User.findById(req.user.id).select('-password'));
  }
);

router.post(
  '/', [...logInUserValidator, validate],

  /*#swagger.description = 'Logging in user',
  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Object representing user credentials',
                schema: { $ref: '#/definitions/LogIn' }
  },
  #swagger.responses[200] = {
        description: 'OK. Object with auth "token" field for the user',
        schema: { $ref: '#/definitions/TokenResp' }
  }*/
  async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  }
);

module.exports = router;

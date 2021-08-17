const router = require('express-promise-router')();
const { createUserValidator, validate } = require('../middleware/validators');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

router.post(
  '/', [...createUserValidator, validate],

  /* #swagger.description = 'Adding new user',
  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Representing new user',
                schema: { $ref: '#/definitions/User' }
  } 
  #swagger.responses[200] = {
        description: 'OK. Object with auth "token" field for the added user',
        schema: { $ref: '#/definitions/TokenResp' }
  }*/
  async (req, res) => {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const pwdHash = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: pwdHash });
    await user.save();

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

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Contact = require('../models/Contact');

const validate = (req, res, next) => {
  /*#swagger.responses[400] = {
    description: 'Bad request. Validation errors object',
    schema: { $ref: '#/definitions/ValidationErrors' }
  }*/
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const logInUserValidator = [
  check('email', 'Email is required').isEmail(),
  check(
    'password',
    'Password is required and should consist of at least 6 characters'
  )
    .isLength({ min: 6 })
    .bail()
    .custom(async (value, { req }) => {
      if (validationResult(req).isEmpty()) {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
          const isMatch = await bcrypt.compare(value, user.password);
          if (isMatch) {
            return;
          }
        }
        return Promise.reject('Invalid credentials');
      }
    }),
];

const createUserValidator = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Valid email is required').isEmail(),
  check(
    'password',
    'Password is required and should consist of at least 6 characters'
  ).isLength({ min: 6 }),
  check('name').custom(async (value) => {
    if (await User.findOne({ name: value })) {
      return Promise.reject('Username already in use');
    }
  }),
  check('email').custom(async (value) => {
    if (await User.findOne({ email: value })) {
      return Promise.reject('Email already in use');
    }
  }),
];

const addContactValidator = [check('name', 'Name is required').not().isEmpty()];

const updateRemoveContactValidator = async (req, res, next) => {
  /*#swagger.responses[404] = {
      description: 'Not exist. Object with msg field representing detailed reason',
      schema: { $ref: '#/definitions/ValidationErrors' }
    }*/
  /*#swagger.responses[403] = {
      description: 'Forbidden. Object with msg field representing detailed reason',
      schema: { $ref: '#/definitions/ValidationErrors' }
    }*/
  const existed = await Contact.findById(req.params.id);
  !existed && sendNotFound(res, 'Contact not found');
  existed.userId.toString() !== req.user.id &&
    sendForbidden(res, 'Contact is owned by another user');
  next();
};

const sendNotFound = (res, msg) => res.status(404).json({errors: [{ msg }]});
const sendForbidden = (res, msg) => res.status(403).json({errors: [{ msg }]});

module.exports = {
  validate,
  logInUserValidator,
  createUserValidator,
  addContactValidator,
  updateRemoveContactValidator,
};

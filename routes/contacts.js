const router = require('express-promise-router')();
const auth = require('../middleware/auth');
const {
  addContactValidator,
  updateRemoveContactValidator,
  validate,
} = require('../middleware/validators');
const User = require('../models/User');
const Contact = require('../models/Contact');

router.get(
  '/',
  auth,

  /* #swagger.description = 'Getting all the user contacts',  
#swagger.security = [{
               "bearerJwtAuth": []
}],
#swagger.responses[200] = {
      description: 'OK. Objects array representing user contacts',
      schema: { $ref: '#/definitions/ContactsResp' }
} */
  async (req, res) => {
    const contacts = await Contact.find({ userId: req.user.id }).sort({
      date: -1,
    });

    res.json(contacts);
  }
);

router.post(
  '/',
  [auth, ...addContactValidator, validate],

  /* #swagger.description = 'Adding new contact for the user',  
  #swagger.security = [{
               "bearerJwtAuth": []
  }],
  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Representing new contact',
                schema: { $ref: '#/definitions/Contact' }
  }
  #swagger.responses[200] = {
      description: 'OK. Object representing added contact',
      schema: { $ref: '#/definitions/ContactResp' }
  } */
  async (req, res) => {
    const { name, email, phone, type } = req.body;
    const newContact = new Contact({
      userId: req.user.id,
      name,
      email,
      phone,
      type,
    });

    res.json(await newContact.save());
  }
);

router.put(
  '/:id',
  [auth, updateRemoveContactValidator, validate],

  /* #swagger.description = 'Updating existed contact for the user',  
  #swagger.security = [{
               "bearerJwtAuth": []
  }],
  #swagger.parameters['id'] = {                
                description: 'Existed contact id',
                schema: { $ref: '#/definitions/ContactId' }
  }
  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Existed contact fields to be updated',
                schema: { $ref: '#/definitions/Contact' }
  }
  #swagger.responses[200] = {
      description: 'OK. Object representing updated contact',
      schema: { $ref: '#/definitions/ContactResp' }
  } */
  async (req, res) => {
    res.json(
      await Contact.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, omitUndefined: true }
      )
    );
  }
);

router.delete(
  '/:id',
  [auth, updateRemoveContactValidator, validate],

  /* #swagger.description = 'Deleting existed contact for the user',  
  #swagger.security = [{
               "bearerJwtAuth": []
  }],
  #swagger.parameters['id'] = {                
                description: 'Existed contact id',
                schema: { $ref: '#/definitions/ContactId' }
  }
  #swagger.responses[200] = {
      description: 'OK. Object with success message field',
      schema: { $ref: '#/definitions/Message' }
  } */
  async (req, res) => {
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact removed' });
  }
);

module.exports = router;

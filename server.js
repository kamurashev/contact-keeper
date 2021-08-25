const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const config = require('config');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { port = 5000, apiRootPrefix, apiVerPrefix } = config.get('apiConfig');

const app = express();
app.use(express.json({ extended: false }));
connectDB();
app.listen(port, () => console.log(`Server started on port ${port}`));

const apiFullPrefix = `${apiRootPrefix}${apiVerPrefix}`;
app.get(apiFullPrefix, (req, res) => res.json({ msg: 'Welcome to the ContactKeeper API' }));
app.use(`${apiFullPrefix}/users`, require('./routes/users'));
app.use(`${apiFullPrefix}/auth`, require('./routes/auth'));
app.use(`${apiFullPrefix}/contacts`, require('./routes/contacts'));
app.use(`${apiFullPrefix}/api-docs`, swaggerUi.serve);
app.get(`${apiFullPrefix}/api-docs`, swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

app.use((err, req, res, next) => {
  /*#swagger.responses[500] = {
      description: 'Server error. Object with msg field representing detailed reason',
      schema: { $ref: '#/definitions/ValidationErrors' }
  }*/
  const errResp = {errors: [{ msg: err.message }]};
  console.error('500 - Internal server error has occured', errResp);
  res.status(500).json(errResp);
});

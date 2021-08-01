const express = require('express');
const config = require('config');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

const PORT = process.env.PORT | 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.get('/', (req, res) => res.json({ msg: 'Welcome to the ContactKeeper API' }));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/contacts', require('./routes/contacts'));
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));


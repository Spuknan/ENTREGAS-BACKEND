require('dotenv').config();
require('colors')

const express = require('express');
const app = express();

const logger = require('morgan');
app.use(logger(':method :url :status - :response-time ms'));

const routes = require('./routes');
app.use('/', routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('Server running on ' + `http://localhost:${PORT}/`.cyan);
});
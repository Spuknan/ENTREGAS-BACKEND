//require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();

app.engine('handlebars', engine());
const viewsPath = path.join(__dirname, '/views');
app.set('views', viewsPath);
app.set('view engine', 'handlebars');

app.use(express.json())

const routes = require('./routes');
app.use('/', routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Server running on ' + `http://localhost:${PORT}/`);
});
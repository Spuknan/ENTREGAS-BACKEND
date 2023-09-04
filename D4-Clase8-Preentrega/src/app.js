//require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json())

const routes = require('./routes');
app.use('/api/', routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Server running on ' + `http://localhost:${PORT}/`);
});
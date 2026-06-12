<<<<<<< HEAD
const express = require('express');

const mysql = require('mysql2/promise');

const path = require('path');

const PORT = 3000;
const app = express();

const PORT = process.env.PORT || 3000;

const conexion = mysql.createPool({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'database'
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function () {
  console.log('servidor corriendo' + PORT);
=======
const express = require('express');

const mysql = require('mysql2/promise');

const path = require('path');

const PORT = 3000;
const app = express();

const PORT = process.env.PORT || 3000;

const conexion = mysql.createPool({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'database'
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function () {
  console.log('servidor corriendo' + PORT);
>>>>>>> 6da914a114d4a1ec848df25cc7def213e1c36337
});
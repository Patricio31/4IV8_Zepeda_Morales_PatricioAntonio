<<<<<<< HEAD
const mysql = require('mysql2');

//creamos la conexion

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'n0m3l0',
    database : 'practicacrud',
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0
});

//la exportamos para poder usuarla
=======
const mysql = require('mysql2');

//creamos la conexion

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'n0m3l0',
    database : 'practicacrud',
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0
});

//la exportamos para poder usuarla
>>>>>>> 6da914a114d4a1ec848df25cc7def213e1c36337
module.exports = pool.promise();    
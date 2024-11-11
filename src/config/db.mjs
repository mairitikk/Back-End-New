const mysql = require('mysql2');
const pool = mysql.createPool({
    host: '127.0,0.1',
    user: 'root',
    password: '6790',
    port: 3306,
    database: 'to_to_db'
});

global.db = pool.promise();
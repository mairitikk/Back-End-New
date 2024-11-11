import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    port: "3306",
    database: "to_do_db"

});


export default pool;
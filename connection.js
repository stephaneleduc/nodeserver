//database connection | set connection
const mysql = require("mysql");


    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'nodejs'
    });

module.exports = connection;
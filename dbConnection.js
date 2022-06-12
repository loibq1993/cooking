var mysql=require('mysql2/promise');
require('dotenv').config();
var connection=mysql.createPool({
    "host": process.env.DB_HOST,
    "user": process.env.DB_USERNAME,
    "password":  process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "port": process.env.DB_PORT,
});

module.exports=connection;
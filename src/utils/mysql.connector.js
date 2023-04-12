const mysql = require("mysql")
const dotenv = require("dotenv");

dotenv.config()

const config = {
    host: 'localhost',
    database:process.env.DATABSE_NAME,
    user:process.env.DATABSE_USER,
    password:process.env.DATABSE_PASSWORD,
    connectionLimit: 100,
};

const connection = mysql.createConnection(config);

module.exports = connection
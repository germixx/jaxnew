//MySQL
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env.DB_JAX_HOST,
    user: process.env.DB_JAX_USER,
    password: process.env.DB_JAX_PASSWORD,
    database: process.env.DB_JAX_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

connection.connect((err) => {
    if (!err) { console.log('Successful connection to MYSQL database.') }
    else console.log('Main Database connection fail')
})

module.exports = connection
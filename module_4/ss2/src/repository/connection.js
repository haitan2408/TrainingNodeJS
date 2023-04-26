const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '28101998',
    database: 'training_nodejs',
    charset: 'utf8_general_ci'
});

connection.connect(function (err) {
    if (err) {
        throw err.stack;
    }else {
        console.log('connect database successfully')
    }
});

module.exports = connection;

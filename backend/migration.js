var mysql = require('mysql');
var migration = require('mysql-migrations');
var path = require('path');
require('dotenv').config();


var connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

function executeQuery(sql, callback) {
    connection.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting MySQL connection:', err);
            return callback(err, null);
        } else {
            if (connection) {
                connection.query(sql, function (error, results, fields) {
                    connection.release();
                    if (error) {
                        console.error('Error executing query:', error);
                        return callback(error, null);
                    }
                    return callback(null, results);
                });
            }
        }
    });
}

function query(sql, callback) {
    executeQuery(sql, function (err, data) {
        if (err) {
            console.error('Error in query:', err);
            return callback(err);
        }
        callback(null, data);
    });
}

// Resolve the path to the migrations directory
var migrationsDir = path.resolve(__dirname, 'database/migrations');

console.log('Migrations directory:', migrationsDir);

console.log('Starting migration initialization...');
migration.init(connection, migrationsDir, function (err) {
    if (err) {
        console.error('Migration initialization failed:', err);
    } else {
        console.log('Migration initialization completed.');
    }
});

module.exports = {
    query: query,
    connection: connection
};

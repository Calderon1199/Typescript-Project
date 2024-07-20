const mysql = require('mysql2');
const migration = require('mysql-migrations');
const path = require('path');
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise();

async function executeQuery(sql, values = []) {
    try {
        const [results] = await pool.query(sql, values);
        return results;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

// Resolve the path to the migrations directory
const migrationsDir = path.resolve(__dirname, 'database/migrations');

console.log('Migrations directory:', migrationsDir);

console.log('Starting migration initialization...');
migration.init(pool.pool, migrationsDir, function (err) {
    if (err) {
        console.error('Migration initialization failed:', err);
    } else {
        console.log('Migration initialization completed.');
    }
});

module.exports = {
    query: executeQuery,
    pool: pool
};


const pg = require('pg');

const client = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    ssl: true
});

client.connect().then(() => {
    console.log('Connected to database');
}).catch(err => {
    console.error(err.message);
});

module.exports = client;
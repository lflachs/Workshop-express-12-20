require('dotenv').config();

const mysql = require('mysql2');

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
});

db.connect((err) => {
	if (err) {
		console.error('error with db');
	} else {
		console.log('db connected!');
	}
});
module.exports = db;

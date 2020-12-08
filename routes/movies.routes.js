const express = require('express');
const router = express.Router();
const movies = require('../movies');
const db = require('../db');

router.get('/', (req, res) => {
	db.query('SELECT * FROM `movies`', function (err, results, fields) {
		if (err) {
			throw new Error(err);
		} else {
			res.status(200).json(results);
		}
	});
});

router.post('/', (req, res) => {
	// console.log('Post');
	// res.send(200).send('ok');
	const { title, genre, year, rate } = req.body;
	db.query(
		'INSERT INTO movies(title, genre, year, rate) VALUES(?, ?, ?, ?)',
		[title, genre, year, rate],
		function (err, results, fields) {
			if (err) {
				throw new Error(err);
			} else {
				res.status(200).json(results);
			}
		}
	);
});

router.get('/:id', (req, res) => {
	const id = Number(req.params.id);
	db.query(
		'SELECT * FROM `movies` WHERE id = ?',
		[id],
		function (err, results, fields) {
			if (err) {
				throw new Error(err);
			} else {
				res.status(200).json(results);
			}
		}
	);
});

module.exports = router;

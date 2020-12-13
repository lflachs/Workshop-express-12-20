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

router.get('/:id', (req, res) => {
	const id = Number(req.params.id);
	db.query(
		'SELECT * FROM `movies` WHERE id = ?',
		[id],
		function (err, results, fields) {
			if (err) {
				console.log(err);

				throw new Error(err);
			} else {
				res.status(200).json(results);
			}
		}
	);
});

router.post('/', (req, res) => {
	console.log(req.body);
	const { title, genre, year, rate } = req.body;
	const query = db.query(
		'INSERT INTO movies(title, genre, year, rate) VALUES(?, ?, ?, ?)',
		[title, genre, year, rate]
	);
	query.on('result', (results) => {
		db.query('SELECT * FROM movies', (err, results) => {
			res.status(200).json(results);
		});
	});
});

router.put('/:id', (req, res) => {
	const { title, genre, year, rate } = req.body;
	db.query(
		'UPDATE movies SET title = ?, genre = ?, year = ?, rate = ? WHERE id = ?',
		[title, genre, year, rate, req.params.id],
		(err, result) => {
			if (err) {
				throw new Error(err);
			} else {
				res.json(result);
			}
		}
	);
});

router.delete('/:id', (req, res) => {
	const query = db.query('DELETE FROM movies WHERE id = ?', [req.params.id]);
	query.on('result', (results) => {
		db.query('SELECT * FROM `movies`', (err, results) => {
			res.send(results);
		});
	});
	// (err, result) => {
	// 	if (err) {
	// 		throw new Error(err);
	// 	} else {
	// 		res.json(result);
	// 	}
	// }
	// );
});

module.exports = router;

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
	const oneMovie = movies.filter((movie) => movie.id === id);
	res.status(200).json(oneMovie);
});

module.exports = router;

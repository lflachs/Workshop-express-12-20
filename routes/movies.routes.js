const express = require('express');
const router = express.Router();
const movies = require('../movies');

router.get('/', (req, res) => {
	res.status(200).json(movies);
});

router.get('/:id', (req, res) => {
	const id = Number(req.params.id);
	const oneMovie = movies.filter((movie) => movie.id === id);
	res.status(200).json(oneMovie);
});

module.exports = router;

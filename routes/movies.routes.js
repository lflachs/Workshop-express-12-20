const express = require('express');
const router = express.Router();
const movies = require('../movies');
const db = require('../db');
const {
	getMovies,
	createMovie,
	getOneMovie,
	deleteMovie,
	updateMovie,
} = require('../controllers/movie.controller');

router.get('/', getMovies);

router.get('/:id', (req, res) => {
	const id = Number(req.params.id);
	db.query('SELECT * FROM `movies` WHERE id = ?', [id])
		.then(([movie]) => res.json(movie))
		.catch((err) => {
			throw new Error(err);
		});
});

router.post('/', createMovie);

router.put('/:id', updateMovie);

router.delete('/:id', deleteMovie);

// fetch and add one element to the state
// fetch('blabl', {method:'POST'})
// .then(resp => setTodos([...todos, resp]));

module.exports = router;

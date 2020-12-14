const express = require('express');
const router = express.Router();
const movies = require('../movies');
const db = require('../db');

router.get('/', async (req, res) => {
	try {
		const [movies] = await db.query('SELECT * FROM `movies`');
		res.status(200).json(movies);
	} catch (err) {
		throw new Error(err);
	}
});

router.get('/:id', (req, res) => {
	const id = Number(req.params.id);
	db.query('SELECT * FROM `movies` WHERE id = ?', [id])
		.then(([movie]) => res.json(movie))
		.catch((err) => {
			throw new Error(err);
		});
});

router.post('/', (req, res) => {
	const { title, genre, year, rate } = req.body;
	db.query('INSERT INTO movies(title, genre, year, rate) VALUES(?, ?, ?, ?)', [
		title,
		genre,
		year,
		rate,
	])
		.then(([result]) => {
			return db.query('SELECT * FROM `movies` WHERE id = ?', [result.insertId]);
		})
		.then(([insertedMovie]) => {
			return res.status(200).json(insertedMovie);
		});
});

router.put('/:id', (req, res) => {
	const id = req.params.id;
	const { title, genre, year, rate } = req.body;
	db.query(
		'UPDATE movies SET title = ?, genre = ?, year = ?, rate = ? WHERE id = ?',
		[title, genre, year, rate, id]
	)
		.then(([result]) => db.query('SELECT * FROM movies WHERE id = ?', [id]))
		.then(([insertedMovie]) => res.json(insertedMovie))
		.catch((err) => {
			throw new Error(err);
		});
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;
	db.query('DELETE FROM movies WHERE id = ?', [id])
		.then(([results]) => db.query('SELECT * FROM movies'))
		.then(([movies]) => res.status(200).json(movies));
});

// fetch and add one element to the state
// fetch('blabl', {method:'POST'})
// .then(resp => setTodos([...todos, resp]));

module.exports = router;

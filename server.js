const express = require('express');
const app = express();
const movies = require('./movies');
const users = require('./users');

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
	res.status(200).send('Hello, world!');
});

app.get('/movies', (req, res) => {
	res.status(200).json(movies);
});
app.get('/movies/:id', (req, res) => {
	const id = Number(req.params.id);
	const oneMovie = movies.filter((movie) => movie.id === id);
	res.status(200).json(oneMovie);
});

app.get('/users', (req, res) => {
	res.status(200).json(users);
});

app.get('/users/:id', (req, res) => {
	const id = Number(req.params.id);
	const oneUser = users.filter((user) => user.id === id);
	res.status(200).json(oneUser);
});

app.get('/fruits', (req, res) => {
	const fruits = ['apple', 'kiwi', 'mango'];
	res.status(200).json(fruits);
});

app.listen(PORT, () => {
	console.log(`App is running on ${PORT}`);
});

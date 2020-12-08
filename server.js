const express = require('express');
const app = express();

const moviesRoutes = require('./routes/movies.routes');
const usersRoutes = require('./routes/users.routes');
const fruitsRoutes = require('./routes/fruits.routes');

const PORT = process.env.PORT || 8000;

app.use('/movies', moviesRoutes);
app.use('/users', usersRoutes);
app.use('/fruits', fruitsRoutes);

app.get('/', (req, res) => {
	res.status(200).send('Hello, world!');
});

app.listen(PORT, () => {
	console.log(`App is running on ${PORT}`);
});

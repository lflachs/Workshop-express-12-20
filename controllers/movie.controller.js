const Movies = require('../models/movies.model');

exports.getMovies = (req, res, next) => {
	Movies.findMany()
		.then(([movies]) => res.status(200).json(movies))
		.catch((err) => {
			throw new Error(err);
		});
};

exports.createMovie = (req, res, next) => {
	const { title, genre, year, rate } = req.body;
	const newMovie = new Movies(title, genre, year, rate);
	newMovie
		.save()
		.then(([movie]) => res.status(200).json(movie))
		.catch((err) => {
			throw new Error(err);
		});
};

exports.getOneMovie = (req, res, next) => {
	const id = req.params.id;
	Movies.findOne(id)
		.then(([movie]) => res.status(200).json(movie))
		.catch((err) => {
			throw new Error(err);
		});
};

// [] === [] => false
exports.deleteMovie = (req, res, next) => {
	const id = req.params.id;
	Movies.findOne(id)
		.then(([result]) => {
			if (result.length === 0) {
				res.status(404).json({ message: 'Movie not found' });
			} else {
				Movies.deleteOne(id).then(() =>
					res.status(200).json({ result: 'Movie has been deleted' })
				);
			}
		})
		.catch((err) => {
			throw new Error(err);
		});
};

exports.updateMovie = (req, res, next) => {
	const id = req.params.id;
	const { title, genre, year, rate } = req.body;
	Movies.findOne(id).then(([result]) => {
		if (result.length === 0) {
			res.status(404).json({ message: 'Movie not found' });
		} else {
			Movies.updateOne(id, { title, genre, year, rate })
				.then(([insertedMovie]) => res.json(insertedMovie))
				.catch((err) => {
					throw new Error(err);
				});
		}
	});
};

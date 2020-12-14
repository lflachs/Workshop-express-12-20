const Movies = require('../models/movies.model');

exports.getMovies = (req, res, next) => {
	Movies.findMany()
		.then(([movies]) => res.status(200).json(movies))
		.catch((err) => {
			throw new Error(err);
		});
};

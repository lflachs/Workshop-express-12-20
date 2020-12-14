const db = require('../db');

module.exports = class Movies {
	constructor(id, title, genre, year, rate) {
		this.id = id;
		this.title = title;
		this.genre = genre;
		this.year = year;
		this.rate = rate;
	}
	static findMany() {
		return db.query('SELECT * FROM movies');
	}
	save() {
		return db
			.query(
				'INSERT INTO `movies`(title, genre, year, rate) VALUES(?, ?, ?, ?)',
				[this.title, this.genre, this.year, this.rate]
			)
			.then(([result]) =>
				db.query('SELECT * FROM `movies` WHERE id = ?', [result.insertId])
			);
	}
	static findOne(id) {
		return db.query('SELECT * FROM movies WHERE id = ?', [id]);
	}
	static updateOne(id, newInfos) {
		const { title, genre, year, rate } = newInfos;
		return db.query(
			'UPDATE movies SET title = ?, genre = ?, year = ?, rate = ? WHERE id = ?',
			[title, genre, year, rate, id]
		);
	}
	static deleteOne(id) {
		return db.query('DELETE FROM movies WHERE id = ?', [id]);
	}
};

// const shrek = new Movie("Shrek", "Animation", 2000, 3.5);
// Movies.findMany()

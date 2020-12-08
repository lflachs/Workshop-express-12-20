const express = require('express');
const router = express.Router();
const users = require('../users');

router.get('/', (req, res) => {
	res.status(200).json(users);
});

router.get('/:id', (req, res) => {
	const id = Number(req.params.id);
	const oneUser = users.filter((user) => user.id === id);
	res.status(200).json(oneUser);
});

module.exports = router;

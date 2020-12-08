const express = require('express');
const router = express.Router();

router.get('/fruits', (req, res) => {
	const fruits = ['apple', 'kiwi', 'mango'];
	res.status(200).json(fruits);
});

module.exports = router;

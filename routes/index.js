const express = require('express');
const router = express.Router();
const fruitsRoutes = require('./fruits.routes');
const moviesRoutes = require('./movies.routes');
const usersRoutes = require('./users.routes');

router.use('/movies', moviesRoutes);
router.use('/users', usersRoutes);
router.use('/fruits', fruitsRoutes);

module.exports = router;

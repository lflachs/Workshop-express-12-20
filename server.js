const express = require('express');
const app = express();

const routes = require('./routes');

const PORT = process.env.PORT || 8000;

// body parser
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
	res.status(200).send('API version 0.1 Welcome');
});

app.listen(PORT, () => {
	console.log(`App is running on ${PORT}`);
});

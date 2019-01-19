const express = require('express');
const bodyParser = require('body-parser');
// const db = require('../database');
const app = express();
const PORT = 3004;
const { Sequelize, sequelize } = require('../database/postgresDB/config.js');
const { Comment, getComment, getAllComments, postComment } = require('../database/postgresDB/models/comments.js');
// require('../database/mongoDB/config.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/public'));


app.get('/api/comment/:id', (req, res) => {
	getComment((error, results) => {
		if (error) {
			console.log(error, 'Error with Server GET!');
			res.status(500).send(error);
		} else {
			console.log(results, 'Results from server GET!');
			res.json(results);
		}
	});
});

app.get('/api/comments', (req, res) => {
	getAllComments((error, results) => {
		if (error) {
			console.log(error, 'Error with Get All Comments Server!');
			res.status(500).send(error);
		} else {
			console.log(results, 'Results from get All Comments Server!');
			res.json(results);
		}
	});
});


app.post('/api/comment', (req, res) => {
	console.log(req.body, 'Body on the post????');
	console.log(req.params, 'Params!! on the post????');

	postComment((error, results) => {
		if (error) {
			console.log(error, 'Error with posting from SERVER!');
			res.status(500).send(error);
		} else {
			console.log(results, 'Successful post from Server...Results!');
			res.json(results);
		}
	});
});

// app.put('/api/comment', (req, res) => {

// })

// app.delete('/api/comment', (req, res) => {

// })

sequelize
	.authenticate()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running on Localhost:${PORT}`);
		});
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});
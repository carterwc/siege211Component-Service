const express = require('express');
const bodyParser = require('body-parser');
// const db = require('../database');
const app = express();
const PORT = 3004;
const { Sequelize, sequelize } = require('../database/postgresDB/config.js');
const { Comment } = require('../database/postgresDB/models/comments.js');
require('../database/mongoDB/config.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/public'));



// app.get('/api/comments', (req, res) => {
// 	db.GetAllComments(
// 		(err, comments) => {
// 			if (err) { throw err }
// 			else { res.send(comments); }
// 		}
// 	);

// });

// app.get('/api/singlecomment', (req, res) => {
// 	console.log("comment id: ", req.query);
// 	db.GetOneComment(req.query.commentId,
// 		(err, comment) => {
// 			if (err) { throw err }
// 			else { res.send(comment) }
// 		}
// 	);
// })

// app.post('/api/comments', (req, res) => {
// 	db.AddOne(req.body,
// 		(err, comment) => {
// 			if (err) { console.log('error in express'); throw err; }
// 			else {
// 				console.log(comment);
// 				res.send(200, comment.insertId)
// 			}
// 			// ^ Send insertId to client
// 			// so that client can automatically add the correct comment
// 		}
// 	)
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
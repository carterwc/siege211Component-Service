const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');
const app = express();
const PORT = 3004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/public'));


app.get('/api/comments', (req, res) => {
	db.getAllComments( 
		(err,comments) => {
			if (err) {throw err}
			else {
				res.send(comments);
				
			}
		}
	);
 
});

app.post('/api/comments', (req,res) => {
	console.log(req.body);
	db.AddOne(req.body,
		(err,comment) => {
			if (err) {console.log('error in express');throw err;}
			else {
				console.log(comment);
				res.send(200,comment.insertId)}
				// ^ Send insertId to client
				// so that client can automatically add the correct comment
		}
	)
})

app.post('/api/test', (req,res) => {
	console.log(req.body);
	res.send('posted');
	})



app.listen(PORT, () => {
  console.log(`Server running on Localhost:${PORT}`);
});
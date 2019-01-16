var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SDC');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('we connected!!!!')
});

var commentSchema = new mongoose.Schema({
  textContent: String,
  id: { type: Number, autoIncrement: true },
  dateCreated: { type: Date, default: Date.now },
  user: String,
  songID: Number
});

var MongoComment = mongoose.model('Comment', commentSchema);

module.exports = {
  MongoComment
}
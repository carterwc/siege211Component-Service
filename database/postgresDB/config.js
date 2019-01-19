const Sequelize = require('sequelize');
const sequelize = new Sequelize('SDC', 'Brometheus58', '', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

const getComment = function (id, callback) {
  connection.query('SELECT * from comments where songID=(?)', [id], (error, results) => {
    if (error) {
      console.log(error, 'Error with DB getComment query!')
      callback(error, null)
    } else {
      console.log(results, 'what are results from get comment query?');
      callback(null, results);
    }
  })
}

const getAllComments = function (callback) {
  connection.query('SELECT * from comments', (error, results) => {
    if (error) {
      console.log(error, 'Error getting AllComments from the DB');
      callback(error, null);
    } else {
      console.log(results, 'Results from get AllComments DB Query!');
      callback(null, results);
    }
  })
}

const postComment = function (params, callback) {
  connection.query(
    `INSERT INTO comments(textContent, commentDate, user, songID) values(?, ?, ?, ?)`,
    [params.textContent, params.commentDate, params.user, params.songID],
    (error, results) => {
      if (error) {
        console.log(erro, 'Error with postComment DB query')
        callback(error, null);
      } else {
        console.log(results, 'Results from postComment DB query')
        callback(null, results)
      }
    })
}

module.exports = {
  Sequelize,
  sequelize,
  getComment,
  getAllComments,
  postComment
}

// const Comment = require('./models/comments.js');

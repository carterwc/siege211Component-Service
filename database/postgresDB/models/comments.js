const { Sequelize, sequelize } = require('../config.js');

const Comment = sequelize.define(
  'comment',
  {
    textContent: {
      type: Sequelize.STRING
    },

    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    commentDate: {
      type: Sequelize.STRING,
      allowNull: false
    },

    user: {
      type: Sequelize.STRING,
      allowNull: false
    },

    songID: {
      type: Sequelize.BIGINT,
      foreignKey: true,
      allowNull: true
    },
  }, {
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['id']
      }
    ]
  }
);

// force: true will drop the table if it already exists
Comment.sync({ force: false }).then(() => {
});


const getComment = function (id, callback) {
  Comment.find({
    where: {
      id: id
    }
  }).then((results) => {
    console.log(results, 'what are results from get comment query?');
    callback(null, results);
  }).catch((error) => {
    console.log(error, 'Error with DB getComment query!')
    callback(error, null)
  })
}

const getAllComments = function (callback) {
  Comment.findAll({}).then((results) => {
    console.log(results, 'Results from get AllComments DB Query!');
    callback(null, results);
  }).catch((error) => {
    console.log(error, 'Error getting AllComments from the DB');
    callback(error, null);
  })
}

const postComment = function (params, callback) {
  Comment.create({
    textContent: params.textContent,
    commentDate: params.dateCreated,
    user: params.user,
    songID: params.songID
  }).then((results) => {
    console.log(results, 'Results from postComment DB query')
    callback(null, results)
  }).catch((error) => {
    console.log(error, 'Error with postComment DB query')
    callback(error, null);
  })
}

module.exports = {
  Comment,
  getComment,
  getAllComments,
  postComment
}

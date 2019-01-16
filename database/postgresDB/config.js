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


module.exports = {
  Sequelize,
  sequelize
}

// const Comment = require('./models/comments.js');

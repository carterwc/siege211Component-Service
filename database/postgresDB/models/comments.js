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

    dateCreated: {
      type: Sequelize.DATE,
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

  });

// force: true will drop the table if it already exists
Comment.sync({ force: false }).then(() => {
});

module.exports = {
  Comment
}

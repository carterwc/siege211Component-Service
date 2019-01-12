const { Sequelize, sequelize } = require('../postgresDB/config.js');

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


    idParentComment: {
      type: Sequelize.BIGINT,
      allowNull: true
    },

  });

// force: true will drop the table if it already exists
Comment.sync({ force: false }).then(() => {
  // Table created
  // return Comment.create({
  //   content: 'yo its dat boiii!'
  // });
});

module.exports = {
  Comment
}

  // for (let i = 0; i <= 99; i++) {
  //   var fakeObj = {};
  //   fakeObj.textContent = faker.lorem.sentence();
  //   fakeObj.dateCreated = new Date().toISOString().slice(0, 19).replace('T', ' ');
  //   fakeObj.user = faker.random.word() + faker.random.number({ min: 1, max: 999 });
  //   fakeObj.idParentComment = 0;
  //   fakeArr.push(fakeObj);
  // }
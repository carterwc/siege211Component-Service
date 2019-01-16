var fs = require('fs');
var async = require('async');
var csv = require('fast-csv');
const path = require('path');
const { Comment } = require('./models/comments.js');
// const { MongoComment } = require('../mongoDB/config.js');

var inserter = async.cargo(function (comments, inserterCallback) {
  // console.log('inserter comments', comments);
  Comment.bulkCreate(comments).then(function () {
    // console.log('testing here');
    inserterCallback();
  });
}, 1000);

var mongoInserter = async.cargo(function (comments, inserterCallback) {
  // console.log('inserter comments mongo', comments);
  MongoComment.insertMany(comments).then(function () {
    // console.log('testing here mongo');
    inserterCallback();
  });
}, 1000);

console.time('seedTimer');
for (var fileNumber = 0; fileNumber < 10; fileNumber++) {
  // console.log('got here')
  const filename = path.join(__dirname, 'data', `outputTest${fileNumber}.csv`);
  var stream = fs.createReadStream(filename);
  // var parse = csv.fromStream(stream, { headers: true });
  csv.fromStream(stream, { headers: true })
    .on("data", function (data) {
      // Comment.create(data);
      // MongoComment.create(data);
      // console.log('data check', data);
      inserter.push(data);
      // mongoInserter.push(data);
    })
    .on("end", function (data) {
      inserter.drain = function () {
        console.log("postgres done");
        if (fileNumber === 9) {
          console.timeEnd('seedTimer');
        }
      }
      // mongoInserter.drain = function () {
      //   console.log("mongo done");
      //   if (fileNumber === 9) {
      //     console.timeEnd('seedTimer');
      //   }
      // }
    });
}


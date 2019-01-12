// var fs = require('fs');
// var pg = require('pg');
// var copyFrom = require('pg-copy-streams').from;

// pg.connect(function (err, client, done) {
//   var stream = client.query(copyFrom('COPY my_table FROM STDIN'));
//   var fileStream = fs.createReadStream('some_file.tsv')
//   fileStream.on('error', done);
//   stream.on('error', done);
//   stream.on('end', done);
//   fileStream.pipe(stream);
// });



// var fs = require('fs');
// var pg = require('pg');
// var copyFrom = require('pg-copy-streams').from;

// pg.connect(CONNECT_STR, function (err, client, done) {
//   var stream = client.query(copyFrom('COPY my_table FROM STDIN'));
//   var fileStream = fs.createReadStream('some_file.tsv')
//   fileStream.on('error', done);
//   fileStream.pipe(stream).on('finish', done).on('error', done);
// });



var fs = require('fs');
var async = require('async');
var csv = require('fast-csv');
const path = require('path');
// output file in the same folder
const { Comment } = require('./models/comments.js');
// const bigData = require('./output.csv');

// var input = fs.createReadStream(bigData);
// var parser = csv.parse({
//   columns: true,
//   relax: true
// });
// var inserter = async.cargo(function (comments, inserterCallback) {
//   Comment.bulkCreate(comments).then(function () {
//     inserterCallback();
//   }
//   );
// },
//   1000
// );
// parser.on('readable', function () {
//   while (line = parser.read()) {
//     inserter.push(line);
//   }
// });
// parser.on('end', function (count) {
//   inserter.drain = function () {
//     doneLoadingCallback();
//   }
// });
// input.pipe(parser);

// .fromPath(path[, options])

// This method parses a file from the specified path.

// var csv = require("fast-csv");

// var stream = fs.createReadStream("my.csv");

// csv
//   .fromStream(stream, { headers: ["textContent", "dateCreated", "user", "idParentComment"] })
//   .on("data", function (data) {
//     console.log(data, 'Whats DATA???');
//   })
//   .on("end", function () {
//     console.log("done");
//   });

// csv
//   .fromPath("./output.csv")
//   .on("data", function (data) {
//     console.log(data, 'CSV Stuff from path??');
//   })
//   .on("end", function () {
//     console.log("done");
//   });


var inserter = async.cargo(function (comments, inserterCallback) {
  console.log('inserter comments', comments, inserterCallback);
  Comment.bulkCreate(comments).then(function () {
    console.log('testing here');
    inserterCallback();
  });
}, 10);


for (var fileNumber = 0; fileNumber < 10; fileNumber++) {
  const filename = path.join(__dirname, 'data', `outputTest${fileNumber}.csv`);
  var stream = fs.createReadStream(filename);
  csv
    .fromStream(stream, { headers: true })
    .on("data", function (data) {
      Comment.create(data)
    })
    //   .on('readable', function () {
    //     console.log('readable')
    //     var data;
    //     while ((data = stream.read()) !== null) {
    //       // parser.write(data);
    //       console.log('line check', data);
    //       inserter.push(data);
    //     }
    //     // while (line = stream.read()) {
    //     // }
    //   })
    //   .on('end', function (count) {
    //     console.log("done", count);
    //     inserter.drain = function (idk) {
    //       console.log('idk', idk);
    //       doneLoadingCallback();
    //     }
    //   })
    .on("end", function (data) {
      console.log("done");
    });

  // while () {

  // }
  for (var fileNumber = 0; fileNumber < 10; fileNumber++) {
    const filename = path.join(__dirname, 'data', `outputTest${fileNumber}.csv`);
    var stream = fs.createReadStream(filename);
    csv
      .fromStream(stream, { headers: true })
      .on("data", function (data) {
        Comment.create(data)
      })

      .on("end", function (data) {
        console.log("done");
      });
  }

  // var fileStream = fs.createReadStream(filename);
  // var parser = csv();

  // fileStream
  //   .on("readable", function () {
  //     var data;
  //     while ((data = fileStream.read()) !== null) {
  //       // console.log('data check readbale', data);
  //       parser.write(data);
  //       // inserter.push(data);
  //     }
  //   })
  //   .on("end", function (count) {
  //     // console.log('end yo', count);
  //     parser.end();
  //   });

  // parser
  //   .on("readable", function () {
  //     var data;
  //     while ((data = parser.read()) !== null) {
  //       // console.log('data check', data);
  //       inserter.push(data);
  //     }
  //   })
  //   .on("end", function () {
  //     console.log("done we finished!");
  //   });

}

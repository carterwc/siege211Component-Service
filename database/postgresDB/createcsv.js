const faker = require('faker');
const fs = require('fs');
const path = require('path');
const os = require('os');
const csv = require('fast-csv');

// output file in the same folder
// const output = []; // holds all rows of data

// let data;
// let count = 0;

// while (count < 100) {
//   data = [
//     {
//       textContent: faker.lorem.sentence(),
//       dateCreated: new Date().toISOString().slice(0, 19).replace('T', ' '),
//       user: faker.random.word() + faker.random.number({ min: 1, max: 999 }),
//       idParentComment: 0
//     }
//   ];

//   data.forEach((comment) => {
//     const commentInfo = [];

//     commentInfo.push(`${comment.textContent}`)
//     commentInfo.push(`${comment.dateCreated}`)
//     commentInfo.push(`${comment.user}`)
//     commentInfo.push(`${comment.idParentComment}`)

//     output.push(`${commentInfo.join()} \n`);
//   });
//   count++;
// }

// fs.writeFileSync(filename, output.join(os.EOL));

// var storeManyFakeData = function (commentArr) {
// 	db.AddMany(commentArr,
// 		(err, comment) => {
// 			if (err) { console.log(err); throw err; }
// 			else { console.log('they got added'); }
// 		}
// 	)
// }

// storeManyFakeData(fakeArr);

// for (let i = 0; i <= 99; i++) {
//   var fakeObj = {};
//   fakeObj.textContent = faker.lorem.sentence();
//   fakeObj.dateCreated = new Date().toISOString().slice(0, 19).replace('T', ' ');
//   fakeObj.user = faker.random.word() + faker.random.number({ min: 1, max: 999 });
//   fakeObj.idParentComment = 0;
//   fakeArr.push(fakeObj);
// }

for (var fileNumber = 0; fileNumber < 10; fileNumber++) {

  const filename = path.join(__dirname, 'data', `outputTest${fileNumber}.csv`);

  var csvStream = csv.createWriteStream({ headers: true });
  var writableStream = fs.createWriteStream(filename);

  writableStream.on("finish", function () {
    console.log("DONE!");
  });

  csvStream.pipe(writableStream);

  for (var i = 0; i < 10000; i++) {
    var fakeObj = {
      textContent: faker.lorem.sentence(),
      dateCreated: new Date().toISOString().slice(0, 19).replace('T', ' '),
      user: faker.random.word() + faker.random.number({ min: 1, max: 999 }),
      idParentComment: 0,
    };
    csvStream.write(fakeObj);
  }

  csvStream.end();

}

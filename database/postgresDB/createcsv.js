const faker = require('faker');
const fs = require('fs');
const path = require('path');
const os = require('os');
const csv = require('fast-csv');


for (var fileNumber = 0; fileNumber < 10; fileNumber++) {

  const filename = path.join(__dirname, 'data', `outputTest${fileNumber}.csv`);

  var csvStream = csv.createWriteStream({ headers: true });
  var writableStream = fs.createWriteStream(filename);

  writableStream.on("finish", function () {
    console.log("DONE!");
  });

  csvStream.pipe(writableStream);

  for (var i = 0; i < 1000000; i++) {
    var fakeObj = {
      textContent: faker.lorem.sentence(),
      dateCreated: new Date().toISOString().slice(0, 19).replace('T', ' '),
      user: faker.random.word() + faker.random.number({ min: 1, max: 999 }),
      idParentComment: 0,
      songID: faker.random.number({ min: 0, max: 10000000 })
    };
    csvStream.write(fakeObj);
  }
  console.log('done part', filename);
  csvStream.end();
}

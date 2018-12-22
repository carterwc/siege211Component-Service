const mysql = require('mysql');
const mysqlConfig = require('./config.js');


const connection = mysql.createConnection(mysqlConfig);


const AddComment = function(valuesObj,callback) {
  console.log("AddComment values Obj: ", valuesObj);

  return connection.query(
    "INSERT INTO comments (textContent, dateCreated,user,idParentComment) VALUES ('"+valuesObj.textContent+"', '"+valuesObj.dateCreated.toString()+"', '"+valuesObj.user+"', '"+valuesObj.idParentComment+"')",
    function (err, result, fields) {
      if (err) {
        callback(err)
      }
      else {
        callback(null,result)
      }

    })
};


module.exports = {
	AddComment
};